/**
 * Evidence extractor for livekit/livekit CI (buildtest.yaml "Test", docker.yaml "Release to Docker",
 * test-server-docker.yaml "Release Test Server to Docker").
 *
 * Units (ids never contain a job name, a BuildKit step number, a stage-platform arrow or a timing, so they are the
 * same before and after the Dockerfile cross-compile lever):
 *   go-test:<package>                 one Go package (gotestfmt `📦` section); failed if any test in it failed
 *   go-test:<package>:<Test[/sub]>    one test or subtest as gotestfmt prints it (✅ passed, ❌ failed, 🚧 skipped)
 *   lint:golangci-lint                `0 issues.` from golangci-lint-action
 *   build:mage                        the Mage Build step
 *   docker:<image>:go-binary:<platform>   the `go build` vertex for that TARGET platform (image = server | test-server)
 *   docker:<image>:image:<platform>       the final stage's COPY of the binary, per target platform
 *
 * The platform is the target: `[linux/amd64->arm64 builder ...]` (native cross-compile after lever 01) and
 * `[linux/arm64 builder ...]` (QEMU before it) both count as linux/arm64; the GOARCH in the expanded command wins.
 * A unit that cannot be found in the log is `failed`; a package with `no test files` is `skipped` (outside coverage).
 */
import type { EvidenceExtractor, EvidenceJob, ExtractedTest } from '../src/evidence-collect.ts'
import type { TestCaseVerdictRecord } from '../src/parity.ts'

export const MODULE = 'github.com/livekit/livekit-server'
export const PLATFORMS = ['linux/amd64', 'linux/arm64'] as const
export const IMAGES = [
  { image: 'server', workflow: /docker\.yaml$/, binary: 'livekit-server' },
  { image: 'test-server', workflow: /test-server-docker\.yaml$/, binary: 'livekit-test-server' },
] as const

type Verdict = Pick<TestCaseVerdictRecord, 'verdict' | 'mode'>
const PASSED: Verdict = { verdict: 'passed', mode: 'executed' }
const FAILED: Verdict = { verdict: 'failed', mode: 'executed' }
const SKIPPED: Verdict = { verdict: 'skipped', mode: 'skipped' }

export interface BuildkitVertex {
  target: string
  stage: string
  command: string
  done: boolean
  cached: boolean
  error: boolean
}

const platformOf = (raw: string | undefined) => (!raw ? '' : raw.startsWith('linux/') ? raw : `linux/${raw}`)
// `#35 [linux/arm64 builder 11/11] RUN ...`, `#35 [linux/amd64->arm64 builder  9/11] ...` (BuildKit pads k to n's width).
const STEP = /^#(\d+) \[(?:(linux\/\w+(?:\/v\d+)?)(?:->((?:linux\/)?\w+(?:\/v\d+)?))? )?([\w-]+) +\d+\/\d+\] (.*)$/

/** BuildKit plain-progress vertices of the first build in the log (each job runs one `docker buildx build`). */
export function buildkitVertices(log: string): BuildkitVertex[] {
  const vertices = new Map<string, BuildkitVertex>()
  let builds = 0
  for (const line of log.split('\n')) {
    if (/^#\d+ \[internal\] load build definition from /.test(line)) builds++
    if (builds > 1) break
    const step = STEP.exec(line)
    if (step) {
      const [, id = '', platform, cross, stage = '', command = ''] = step
      if (!vertices.has(id))
        vertices.set(id, { target: platformOf(cross ?? platform), stage, command: command.replace(/\s+/g, ' ').trim(), done: false, cached: false, error: false })
      continue
    }
    const end = /^#(\d+) (DONE|CACHED|ERROR)\b/.exec(line)
    const v = end ? vertices.get(end[1] ?? '') : undefined
    if (!v) continue
    if (end?.[2] === 'DONE') v.done = true
    else if (end?.[2] === 'CACHED') v.cached = true
    else v.error = true
  }
  return [...vertices.values()]
}

function goBuildTarget(v: BuildkitVertex): string {
  const arch = /\bGOARCH=(\w+)/.exec(v.command)?.[1]
  return arch && arch !== '$TARGETARCH' ? `linux/${arch}` : v.target
}

function vertexVerdict(vertices: BuildkitVertex[], stepFailed: boolean): Verdict {
  if (stepFailed || !vertices.length || vertices.some((v) => v.error)) return FAILED
  if (vertices.every((v) => v.done)) return PASSED
  if (vertices.every((v) => v.done || v.cached)) return { verdict: 'passed', mode: 'reused' }
  return FAILED
}

function dockerUnits(image: string, binary: string, job: EvidenceJob | undefined): Map<string, Verdict> {
  const units = new Map<string, Verdict>()
  const vertices = job ? buildkitVertices(job.log) : []
  const step = job?.steps.find((s) => /^Build and push$/i.test(s.name))
  const stepPassed = job ? (step ? step.conclusion === 'success' : job.conclusion === 'success') : false
  const copy = new RegExp(`^COPY --from=builder \\S*\\b${binary}\\b`)
  for (const platform of PLATFORMS) {
    units.set(`docker:${image}:go-binary:${platform}`, vertexVerdict(vertices.filter((v) => /\bgo build\b/.test(v.command) && goBuildTarget(v) === platform), !stepPassed))
    units.set(`docker:${image}:image:${platform}`, vertexVerdict(vertices.filter((v) => v.target === platform && copy.test(v.command)), !stepPassed))
  }
  return units
}

const pkgId = (pkg: string) => (pkg === MODULE ? '.' : pkg.startsWith(`${MODULE}/`) ? pkg.slice(MODULE.length + 1) : pkg)

/** gotestfmt output: packages (`📦 <import path>`) and their tests (`##[group]✅ TestX (1.2s)`). */
export function gotestfmtResults(log: string): { packages: Map<string, Verdict>; tests: Map<string, Verdict> } {
  const packages = new Map<string, Verdict>()
  const tests = new Map<string, Verdict>()
  let pkg: string | undefined
  for (const line of log.split('\n')) {
    const p = /^📦 (\S+)\s*$/.exec(line)
    if (p) {
      pkg = pkgId(p[1] ?? '')
      if (!packages.has(pkg)) packages.set(pkg, PASSED)
      continue
    }
    if (!pkg) continue
    if (/^\s*🛑 no test files/.test(line)) {
      packages.set(pkg, SKIPPED)
      continue
    }
    const t = /^(?:##\[group\])?(✅|❌|🚧) (\S+) \(/.exec(line)
    if (!t) continue
    const v = t[1] === '✅' ? PASSED : t[1] === '❌' ? FAILED : SKIPPED
    const id = `${pkg}:${t[2]}`
    if (tests.get(id)?.verdict !== 'failed') tests.set(id, v)
    if (v === FAILED) packages.set(pkg, FAILED)
  }
  return { packages, tests }
}

const isTestJob = (j: EvidenceJob) => /buildtest\.yaml$/.test(j.workflowPath)

const extract: EvidenceExtractor = ({ jobs }) => {
  const tests = new Map<string, ExtractedTest>()
  const commands = new Set<string>()
  const obligations = new Set<string>()
  const record = (testId: string, v: Verdict) => tests.set(testId, { testId, ...v })

  const testJob = jobs.find(isTestJob)
  const stepOk = (name: RegExp) => {
    const s = testJob?.steps.find((x) => name.test(x.name))
    return s ? s.conclusion === 'success' : false
  }
  // Go tests (race detector, gotestfmt).
  const go = testJob ? gotestfmtResults(testJob.log) : { packages: new Map<string, Verdict>(), tests: new Map<string, Verdict>() }
  for (const [pkg, v] of go.packages) record(`go-test:${pkg}`, v)
  for (const [id, v] of go.tests) record(`go-test:${id}`, v)
  if (!go.packages.size) record('go-test:all', FAILED)
  if (testJob && /go test -race -json -v \.\/\.\.\./.test(testJob.log)) commands.add('go test -race -json -v ./...')
  if (go.packages.size && [...go.packages.values()].every((v) => v.verdict !== 'failed')) obligations.add('go-tests')

  // Lint and build.
  const lintPassed = !!testJob && /^0 issues\.$/m.test(testJob.log)
  record('lint:golangci-lint', lintPassed ? PASSED : FAILED)
  if (lintPassed) {
    obligations.add('lint:golangci-lint')
    commands.add('golangci-lint run')
  }
  record('build:mage', stepOk(/^Mage Build$/) ? PASSED : FAILED)
  if (stepOk(/^Mage Build$/)) commands.add('go run github.com/magefile/mage build')

  // Docker images, per target platform.
  for (const { image, workflow, binary } of IMAGES) {
    const job = jobs.find((j) => workflow.test(j.workflowPath) && !(image === 'server' && /test-server/.test(j.workflowPath)))
    for (const [id, v] of dockerUnits(image, binary, job)) record(id, v)
    if (job) commands.add(`docker buildx build (${image}) --platform linux/amd64,linux/arm64`)
    for (const platform of PLATFORMS)
      if ([`docker:${image}:go-binary:${platform}`, `docker:${image}:image:${platform}`].every((id) => tests.get(id)?.verdict === 'passed'))
        obligations.add(`docker-image:${image}:${platform}`)
  }

  const sorted = [...tests.values()].sort((a, b) => a.testId.localeCompare(b.testId))
  return {
    tests: sorted,
    coverage: {
      scope: sorted.filter((t) => t.verdict !== 'skipped').map((t) => t.testId),
      covered: sorted.filter((t) => t.verdict === 'passed').map((t) => t.testId),
    },
    obligations: [...obligations].sort(),
    commands: [...commands].sort(),
  }
}

export default extract
