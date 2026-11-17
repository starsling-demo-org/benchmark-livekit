# StarSling Whole-Pipeline Benchmark Report (`full-1`)

- **Upstream:** `livekit/livekit@401ddb1432900a357c990af3905511290dc9b9f7`
- **Timestamp Resolution:** `1s` (GitHub Actions workflow/job/step timestamps)

## Event `main-push` · cold cache

**Total speedup 2.72×: hardware speedup 2.12×, self-improving CI speedup 1.28× on StarSling Runners and — on GitHub-hosted runners. Evidence: coverage-qualified.**

### Runner configurations

| Runner configuration | Complete / requested | CI duration p50 (IQR) | CI minutes p50 | Estimated cost p50 (USD) | Trigger latency p50 | Harness overhead p50 |
|---|---|---|---|---|---|---|
| `github-baseline` | 5/5 | 968.0 s (IQR 431.0 s, n=5) | 37.33 min | $0.6080 | 5.0 s | 0.0 s |
| `starsling-baseline` | 5/5 | 456.0 s (IQR 1.0 s, n=5) | 16.80 min | $0.1440 | 5.0 s | 0.0 s |
| `starsling-patched` | 5/5 | 356.0 s (IQR 30.0 s, n=5) | 9.02 min | $0.0800 | 5.0 s | 0.0 s |

### Speedups

| Speedup | Ratio | Compares | Cost neutral |
|---|---|---|---|
| `github-baseline` / `github-patched` | — | Self-improving CI speedup, GitHub-hosted runners | Not established (Self-improving CI changed which runners jobs use, so its speedup includes a hardware change.) |
| `starsling-baseline` / `starsling-patched` | 1.28× | Self-improving CI speedup, StarSling Runners | Yes |
| `github-baseline` / `starsling-baseline` | 2.12× | Hardware speedup | Not applicable: hardware speedups never establish it |
| `github-baseline` / `starsling-patched` | 2.72× | Total speedup | Not applicable |

### Step times

| Workflow › job | Step | Change | GitHub-hosted p50 | GitHub-hosted, self-improving CI p50 | StarSling, hardware only p50 | StarSling, self-improving CI p50 |
|---|---|---|---|---|---|---|
| `.github/workflows/buildtest.yaml#test` | Set up job | `matched` | 2.0 s | — | 1.0 s | 2.0 s |
| `.github/workflows/buildtest.yaml#test` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Run actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/buildtest.yaml#test` | Run shogo82148/actions-setup-redis@ffaf3c39499b2917543d84f6acc818277580b531 | `matched` | 1.0 s | — | 1.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Run redis-cli ping | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Resolve Go version | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Set up Go | `matched` | 8.0 s | — | 4.0 s | 5.0 s |
| `.github/workflows/buildtest.yaml#test` | Replace mutexes | `matched` | 18.0 s | — | 11.0 s | 13.0 s |
| `.github/workflows/buildtest.yaml#test` | Mage Build | `matched` | 65.0 s | — | 36.0 s | 37.0 s |
| `.github/workflows/buildtest.yaml#test` | Lint | `matched` | 28.0 s | — | 16.0 s | 16.0 s |
| `.github/workflows/buildtest.yaml#test` | Test | `matched` | 364.0 s | — | 266.0 s | 267.0 s |
| `.github/workflows/buildtest.yaml#test` | Failed tests | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Upload test log | `matched` | 2.0 s | — | 2.0 s | 1.0 s |
| `.github/workflows/buildtest.yaml#test` | Post Lint | `matched` | 1.0 s | — | 2.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Post Set up Go | `matched` | 9.0 s | — | 7.0 s | 3.0 s |
| `.github/workflows/buildtest.yaml#test` | Post Run shogo82148/actions-setup-redis@ffaf3c39499b2917543d84f6acc818277580b531 | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Post Run actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Set up job | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Run actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Set up Docker Buildx | `matched` | 8.0 s | — | 3.0 s | 4.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Login to DockerHub | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Build and push | `matched` | 467.0 s | — | 202.0 s | 44.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Post Build and push | `matched` | 2.0 s | — | 1.0 s | 2.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Post Set up Docker Buildx | `matched` | 12.0 s | — | 2.0 s | 2.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Post Run actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 | `matched` | 0.0 s | — | 0.0 s | 1.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Set up job | `matched` | 3.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/docker.yaml#docker` | Benchmark event context (harness) | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Run actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/docker.yaml#docker` | Docker meta | `matched` | 1.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Resolve Go version | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Set up Go | `matched` | 8.0 s | — | 4.0 s | 4.0 s |
| `.github/workflows/docker.yaml#docker` | Download Go modules | `matched` | 7.0 s | — | 5.0 s | 4.0 s |
| `.github/workflows/docker.yaml#docker` | Generate code | `matched` | 75.0 s | — | 43.0 s | 44.0 s |
| `.github/workflows/docker.yaml#docker` | Set up Docker Buildx | `matched` | 7.0 s | — | 3.0 s | 4.0 s |
| `.github/workflows/docker.yaml#docker` | Login to DockerHub | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Build and push | `matched` | 846.0 s | — | 381.0 s | 75.0 s |
| `.github/workflows/docker.yaml#docker` | Post Build and push | `matched` | 1.0 s | — | 1.0 s | 1.0 s |
| `.github/workflows/docker.yaml#docker` | Post Set up Docker Buildx | `matched` | 11.0 s | — | 3.0 s | 2.0 s |
| `.github/workflows/docker.yaml#docker` | Post Set up Go | `matched` | 3.0 s | — | 1.0 s | 3.0 s |
| `.github/workflows/docker.yaml#docker` | Post Run actions/checkout@3d3c42e5aac5ba805825da76410c181273ba90b1 | `matched` | 0.0 s | — | 0.0 s | 1.0 s |
| `.github/workflows/docker.yaml#docker` | Complete job | `matched` | 0.0 s | — | 0.0 s | 0.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/test-server-docker.yaml#docker` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/buildtest.yaml#test` | Complete runner | `matched` | — | — | 1.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Set up runner | `matched` | — | — | 0.0 s | 0.0 s |
| `.github/workflows/docker.yaml#docker` | Complete runner | `matched` | — | — | 0.0 s | 0.0 s |

### Samples

| Sample ID | Round | Runner configuration | Complete | CI duration | CI minutes | Runs and diagnostics |
|---|---|---|---|---|---|---|
| `full-1-main-push-cold-rep1-starsling-baseline` | 1 | `starsling-baseline` | ✓ | 456.0 s | 16.90m | [run #43950160389](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43950160389), [run #43950160625](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43950160625), [run #43950160108](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43950160108) |
| `full-1-main-push-cold-rep1-github-baseline` | 1 | `github-baseline` | ✓ | 726.0 s | 26.28m | [run #43952578818](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43952578818), [run #43952578959](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43952578959), [run #43952578910](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43952578910) |
| `full-1-main-push-cold-rep1-starsling-patched` | 1 | `starsling-patched` | ✓ | 380.0 s | 9.48m | [run #43955935803](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43955935803), [run #43955935974](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43955935974), [run #43955936155](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43955936155) |
| `full-1-main-push-cold-rep2-starsling-patched` | 2 | `starsling-patched` | ✓ | 343.0 s | 8.83m | [run #43958411815](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43958411815), [run #43958411715](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43958411715), [run #43958411740](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43958411740) |
| `full-1-main-push-cold-rep2-starsling-baseline` | 2 | `starsling-baseline` | ✓ | 456.0 s | 17.38m | [run #43960491302](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43960491302), [run #43960491236](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43960491236), [run #43960491622](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43960491622) |
| `full-1-main-push-cold-rep2-github-baseline` | 2 | `github-baseline` | ✓ | 968.0 s | 32.23m | [run #43962891529](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43962891529), [run #43962891384](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43962891384), [run #43962891327](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43962891327) |
| `full-1-main-push-cold-rep3-starsling-patched` | 3 | `starsling-patched` | ✓ | 457.0 s | 12.60m | [run #43966644493](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43966644493), [run #43966644296](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43966644296), [run #43966644317](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43966644317) |
| `full-1-main-push-cold-rep3-github-baseline` | 3 | `github-baseline` | ✓ | 952.0 s | 37.33m | [run #43969122586](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43969122586), [run #43969122033](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43969122033), [run #43969122158](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43969122158) |
| `full-1-main-push-cold-rep3-starsling-baseline` | 3 | `starsling-baseline` | ✓ | 455.0 s | 16.77m | [run #43972701317](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43972701317), [run #43972701173](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43972701173), [run #43972701155](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43972701155) |
| `full-1-main-push-cold-rep4-github-baseline` | 4 | `github-baseline` | ✓ | 1383.0 s | 39.60m | [run #43974805965](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43974805965), [run #43974805904](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43974805904), [run #43974806055](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43974806055) |
| `full-1-main-push-cold-rep4-starsling-patched` | 4 | `starsling-patched` | ✓ | 350.0 s | 8.98m | [run #43979308089](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43979308089), [run #43979308202](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43979308202), [run #43979308059](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43979308059) |
| `full-1-main-push-cold-rep4-starsling-baseline` | 4 | `starsling-baseline` | ✓ | 434.0 s | 16.58m | [run #43981076821](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43981076821), [run #43981076905](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43981076905), [run #43981076750](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43981076750) |
| `full-1-main-push-cold-rep5-starsling-baseline` | 5 | `starsling-baseline` | ✓ | 471.0 s | 16.80m | [run #43982943183](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43982943183), [run #43982943115](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43982943115), [run #43982943121](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43982943121) |
| `full-1-main-push-cold-rep5-github-baseline` | 5 | `github-baseline` | ✓ | 1459.0 s | 40.90m | [run #43984964066](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43984964066), [run #43984964099](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43984964099), [run #43984964012](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43984964012) |
| `full-1-main-push-cold-rep5-starsling-patched` | 5 | `starsling-patched` | ✓ | 356.0 s | 9.02m | [run #43989278263](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43989278263), [run #43989278392](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43989278392), [run #43989278182](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43989278182) |



## GitHub API calls

Budget: 252 calls per hour for this controller. Free `304 Not Modified` answers are listed separately and do not count against the account.

- **Experiment:** 615 calls (1533 free 304s); jobs 138, workflows 101, workflow-write 95, artifacts 90, run-list 86, job-logs 45, caches 30, cache-delete 29, other-read 1
- **Waiting:** 6774 s stretched to fit the budget, 0 s waiting for an account reset

| Sample | Calls | Free 304s | Biggest callers |
| --- | ---: | ---: | --- |
| `full-1-main-push-cold-rep1-starsling-baseline` | 46 | 75 | workflows 13, jobs 10, workflow-write 8, run-list 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep1-github-baseline` | 36 | 117 | jobs 9, run-list 6, workflows 6, workflow-write 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep1-starsling-patched` | 34 | 84 | jobs 8, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
| `full-1-main-push-cold-rep2-starsling-patched` | 34 | 77 | jobs 8, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
| `full-1-main-push-cold-rep2-starsling-baseline` | 37 | 95 | jobs 10, run-list 6, workflows 6, workflow-write 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep2-github-baseline` | 36 | 124 | jobs 9, run-list 6, workflows 6, workflow-write 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep3-starsling-patched` | 34 | 91 | jobs 8, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
| `full-1-main-push-cold-rep3-github-baseline` | 36 | 124 | jobs 10, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
| `full-1-main-push-cold-rep3-starsling-baseline` | 36 | 96 | jobs 9, run-list 6, workflows 6, workflow-write 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep4-github-baseline` | 35 | 139 | jobs 10, workflows 6, workflow-write 6, artifacts 6, run-list 4, job-logs 3 |
| `full-1-main-push-cold-rep4-starsling-patched` | 34 | 77 | jobs 8, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
| `full-1-main-push-cold-rep4-starsling-baseline` | 36 | 89 | jobs 9, run-list 6, workflows 6, workflow-write 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep5-starsling-baseline` | 38 | 101 | jobs 11, run-list 6, workflows 6, workflow-write 6, artifacts 6, job-logs 3 |
| `full-1-main-push-cold-rep5-github-baseline` | 37 | 158 | jobs 11, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
| `full-1-main-push-cold-rep5-starsling-patched` | 34 | 77 | jobs 8, workflows 6, workflow-write 6, artifacts 6, run-list 5, job-logs 3 |
