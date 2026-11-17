# livekit CI: GitHub vs StarSling

> Not affiliated with [livekit/livekit](https://github.com/livekit/livekit) (22.2k stars). This repository replays livekit's own CI on real upstream commits to measure **how much machine time a push uses** (runner time) and **how long it waits for every check**, from the first workflow starting to the last job finishing.

## Results

**Pushes** (typical per push):

**StarSling: 4.1x less runner time** than GitHub per push (37.33 min → 9.02 min of machine time; GitHub 4 vCPU vs StarSling 4 vCPU).

StarSling = StarSling runners + StarSling agent PRs.

Wait: **StarSling is 2.7x faster** than GitHub for a push to finish every check (16.13 min → 5.93 min).

| | Runner time per push | vs GitHub | Wait per push | vs GitHub |
|---|---:|---:|---:|---:|
| GitHub (the project's CI as is, on GitHub-hosted runners) | **37.33 min** | 1x | **16.13 min** | 1x |
| StarSling (StarSling runners + agent PRs) | **9.02 min** | **4.1x** less runner time | **5.93 min** | **2.7x** faster |

Runner time compared at these machine sizes: GitHub 4 vCPU vs StarSling 4 vCPU.

**Where the savings come from**

Runner time:

- StarSling runners alone (CI unchanged): 16.80 min, **2.2x** less runner time than GitHub
- StarSling agent PRs, on the same runners: **1.9x** less runner time (16.80 min → 9.02 min)
- Together: 2.2x × 1.9x = 4.1x

Wait:

- StarSling runners alone (CI unchanged): 7.60 min, **2.1x** faster than GitHub
- StarSling agent PRs, on the same runners: **1.3x** faster (7.60 min → 5.93 min)
- Together: 2.1x × 1.3x = 2.7x

<sub>Typical = the median over complete rounds. Total = StarSling runners alone × agent PRs on top. Details are in the Appendix.</sub>

## Terms

| Term | Meaning |
|---|---|
| **Runner time** | Total machine time all jobs used for one push, summed across jobs; billed per second. |
| **Wait** | How long one push (or PR update) takes until every check has finished: from the first workflow starting to the last job finishing. |
| **GitHub** | The project's own CI, unchanged, on GitHub-hosted runners (the machines GitHub rents out). |
| **StarSling** | StarSling runners (faster machines) plus StarSling agent PRs (changes to the CI itself). |
| **Agent PRs** | Small pull requests StarSling's agent wrote against the project's CI to make it faster. Each is measured on its own in the Appendix. |
| **Median** | The middle result. Half the runs were faster, half were slower, so one odd run does not move it. |
| **Round** | One replay of the same change on every setup. Only rounds where every setup finished cleanly count. |
| **Cold** | Every run starts with no GitHub Actions caches (saved downloads and build output). |

## Appendix

<details>
<summary>Agent PRs: what each one changed and its own effect</summary>

Merged in this order. Each row's effect comes from its own before/after experiment; the last row's cumulative wait is the headline.

| # | Agent PR | What it changed | Its own effect (typical wait, before → after) | Wait after it (cumulative) |
|---:|---|---|---|---:|
| 1 | [pull/1](https://github.com/starsling-demo-org/benchmark-livekit/pull/1) | dockerfile cross compile | 7.60 min → 5.93 min (−22%), 5 runs per side | 5.93 min |

</details>

<details>
<summary>What we changed</summary>

- [dockerfile cross compile](https://github.com/starsling-demo-org/benchmark-livekit/pull/1)

</details>

<details>
<summary>Same checks, same results</summary>



</details>

<details>
<summary>Every push, round by round</summary>

Each cell is the whole wait for that push and links to its run.

| Upstream commit | Round | GitHub unchanged | StarSling unchanged (hardware alone) | StarSling + agent PRs |
|---|---:|---:|---:|---:|
| [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7) | 1 | [12.10 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43952578818) | [7.60 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43950160389) | [6.33 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43955935803) |
| [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7) | 2 | [16.13 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43962891529) | [7.60 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43960491302) | [5.72 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43958411815) |
| [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7) | 3 | [15.87 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43969122586) | [7.58 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43972701317) | [7.62 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43966644493) |
| [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7) | 4 | [23.05 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43974805965) | [7.23 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43981076821) | [5.83 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43979308089) |
| [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7) | 5 | [24.32 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43984964066) | [7.85 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43982943183) | [5.93 min](https://github.com/starsling-demo-org/benchmark-livekit/actions/runs/43989278263) |

</details>

<details>
<summary>How it's measured</summary>

1. **Pin.** livekit/livekit is pinned at [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7), the [`upstream/`](upstream) submodule in this repository. Each scenario replays one real upstream event: the merge of [`401ddb14`](https://github.com/livekit/livekit/commit/401ddb1432900a357c990af3905511290dc9b9f7) to `master`.
2. **Replay natively.** Each sample pushes that exact tree to this repository's `master` branch and fires the real GitHub event (a push, or a PR synchronize). Every workflow, job and step runs with its own triggers, filters, `needs`, conditions, matrices and `workflow_run` follow-ups, in the order GitHub schedules them.
3. **Runner configurations.** GitHub-hosted runners and StarSling Runners run the CI unchanged; StarSling Runners also run it with the agent PR applied (self-improving CI). Jobs on runners StarSling does not offer stay on GitHub-hosted runners in every configuration and still count.
4. **Rounds.** 5 rounds; in each, every runner configuration replays the event once, in a deterministic shuffled order, one sample at a time. Medians use only complete rounds, and a sample counts only if every expected job succeeded on the first attempt.
5. **Control caches.** Cold cache: Every sample starts with no GitHub Actions caches.
6. **Check.** Replays are compared job by job with upstream's own runs for the same commit, and every sample's test verdicts, coverage and cache restores are read from its own job logs.

- **Cold:** Every sample starts with no GitHub Actions caches.
- **Failed or re-run samples** (replaced, not in the medians): GitHub unchanged: 0; StarSling unchanged (hardware alone): 0; StarSling + agent PRs: 0.

</details>

<details>
<summary>Runners</summary>

| Runners | Label | vCPU | Memory |
|---|---|---:|---:|
| GitHub-hosted | `ubuntu-26.04-4core` | 4 | 16 GiB |
| StarSling | `starsling-ubuntu-26.04` | 4 | 16 GiB |

GitHub-hosted jobs run on the explicit GitHub larger-runner label shown, pinned to the size of upstream's public-repository runner, so the comparison does not change with this repository's visibility.

</details>

<sub>Generated by `bench showcase` from experiment `full-1`. Machine-readable results: [`benchmark/results.json`](benchmark/results.json). Configurations: GitHub-hosted runners; StarSling Runners (hardware only); StarSling Runners (self-improving CI).</sub>
