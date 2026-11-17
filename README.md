# Kebun Pasang

A seven-level botanical tidal-garden tutorial/challenge prototype, not a final
prize candidate. Vanilla HTML/CSS/JS, local system fonts, locally drawn SVG
channels and SVG/CSS plants; no external assets, libraries, installation or build step.

## Current status: v3 locally packaged; limited parent-reported browser QA

Local v3 packaging completed after all 48 prior manifest hashes matched and the
bounded, no-reparse `out/` target was confirmed absent. Only the verifier's three
screenshot tuples changed; the full script was read back and reviewed before
execution. Game/main/vendor and all milestone files stayed byte-identical.
Using the approved absolute Node shown below, commands were
`tests/packaging-check.mjs preflight`, `main.ts` with process-only
`MAKEFUN_OUTPUT_DIR=out` (prior env restored), and
`tests/packaging-check.mjs verify`: **all exit 0**. The unchanged 45 passing logic
tests were not rerun. No browser/server, install, git, network or submission action
was performed by this coding session.

Current screenshots are `1-v3-l1-planning.png`, `2-v3-l4-won.png`, and
`3-v3-l7-won.png`: parent-reported genuine, unedited native captures at
1200 x 1000, DPR 1, copied byte-identically. **Shot 2 is L4 won, not flowing.**
Parent reports prior real-input all-seven wins and mobile no overflow on this
unchanged v3, plus another seven-level actual-click traversal for these captures,
with no diagnostics observed. This is supplied parent browser evidence, not native
coding-session browser evidence or a comprehensive console/network/accessibility
audit. This session independently checked PNG headers, dimensions, CRCs, bytes
and the supplied hashes; those checks do not authenticate capture provenance.

| Current local v3 output | Actual result |
| --- | --- |
| Game | 6 byte-identical source files, 23,945 bytes; longest path 10 UTF-8 bytes; index 2,962 bytes |
| Screenshots | 3 byte-identical PNGs, 57,340 / 56,724 / 57,213 bytes (171,277 total); each 1200 x 1000 |
| Dossier | 253,874 bytes; byte-exact in-memory `buildDossier(out, same caps)` match |
| Whole output | 12 entries (10 files + 2 directories), 449,096 bytes |

All existing game/index/path, screenshot, dossier and total-output caps passed;
output no-reparse checks passed. Dossier SHA256:
`3C47DF89A82D26E854A6ED37D681FB81090F61C9DD460980F199A3C723515417`.

`local-review/original-prompt.txt` is the supplied exact 119-character/119-byte
UTF-8 text, without BOM or trailing newline. `local-review/start-evidence.json`
is an explicitly attributed summary of Jenderal-supplied root/history claims,
not an independently verified transcript or run record. The prompt candidate is
handed-off via root OpenBot -> BestGame, not typed in Codex. No protected
instructions or private parent logs are copied. Official bundle/check remains
separate after CLI availability; no clearance is claimed.

The three exact tutorials are followed by four certified 4 x 4 challenges with
all 16 tiles present. No new mechanic or browser file/import was added. Metadata
now specifies width, height, inlet/outlet cell and side, flowers and budget.
Flow bounds, initial cursor, outlet checks, grid tracks, bank row/column placement,
arrow navigation, focus target and Indonesian rules are metadata-driven. The v2
botanical drawings/palette remain. CSS gives tile tracks a 44 px minimum and uses
smaller banks/gaps on mobile; the limited parent mobile report above is not an
independent or comprehensive browser verification by this coding session.

### V2 preservation before source changes

All 43 then-current manifest rows were verified before changes. Absolute paths
and in-project ancestors were checked for project bounds/reparse points; existing
archive targets were refused. No deletion or overwrite was performed:

| Source | Preserved destination |
| --- | --- |
| `out/` | `milestones/v2/out/` (exact directory moved: 10 files, 12 entries, 452,118 bytes) |
| `screenshots/1-v2-l1-planning.png` | `milestones/v2/screenshots/1-v2-l1-planning.png` (moved) |
| `screenshots/2-v2-l1-leak.png` | `milestones/v2/screenshots/2-v2-l1-leak.png` (moved) |
| `screenshots/3-v2-l3-won.png` | `milestones/v2/screenshots/3-v2-l3-won.png` (moved) |
| `SHA256SUMS.txt` | `milestones/v2/SHA256SUMS-baseline.txt` (copied unchanged) |

Moved artifacts were hash-checked. The v2 baseline manifest SHA256 is
`663ACD25748969D2B0232E0027744447E071997C5AE1D58653349516264525A3`.
V1 remains untouched. Both archived manifests keep their historical original paths;
the root manifest maps relocated files to archive paths and current source hashes.
Current `out/` contains v3, and `screenshots/` contains only the three v3 captures
listed above. V1/v2 screenshots, browser reports and dossiers below remain
historical and do not validate v3. The verifier now expects the v3 screenshot
tuples and was run as recorded above. Main/vendor remain unchanged.

### Independent reference certificate and gates

`tests/challenge-certificate.json` is the original successful generated artifact;
it was not regenerated or overwritten after interruption. SHA256:
`3383BBE03865D662A8B83E7ED5324FF1A143B0670C7BDA63543E06866FB0F655`.
`tests/challenge-solver.mjs` independently enumerates self-avoiding geometric
inlet-to-outlet paths compatible with straight/elbow shape. It does not import
production logic. It minimizes clockwise rotations per canonical opening set
(straight 180-degree equivalence, unordered elbow openings), deduplicates full-board
orientations, and leaves off-route orientations initial. Counts are not click
permutations or gratuitous off-route rotations. The certificate lists every
all-target candidate, histogram, normalized optimal solutions, route and actions.

Offline bounded LCG search: seed **1263556147**, maximum **10,000** candidate boards;
actual search **1,637** iterations, **295** boards with at least two terminal
geometric routes, **10** boards passing the gate. The first passing representative
at each optimum 6/7/8/9 was selected, then sorted by measured optimum (secondary
keys: near-optimal route count and golden path length). The seed is reproducibility,
not a quality score. DFS also has an explicit 2,000,000-node-per-board bound.

Every released challenge really passes: full 4 x 4 board, 2–4 flowers, optimum
6–10, 1–8 optimal solutions, at least two all-target routes costing at most
optimum+2, and a golden route of at most 14 cells (hence distractors). Budget equals
optimum. All four goldens use 8 cells, leaving 8 off-route tiles on each board.

| Level | Name / kind | Size | Budget / optimum | Flowers | Geometric / all-target / near-optimal routes | Optimal solutions |
| --- | --- | --- | --- | --- | --- | --- |
| 1 | Saluran pertama / tutorial | 3 x 3 | 1 | (2,2) | not challenge-gated | — |
| 2 | Belokan pucuk / tutorial | 3 x 3 | 2 | (1,1), (2,2) | not challenge-gated | — |
| 3 | Pasang berkelok / tutorial | 3 x 3 | 3 | (1,3), (2,1), (3,2) | not challenge-gated | — |
| 4 | Rumpun muara / challenge | 4 x 4 | 6 | (2,1), (2,2) | 2 / 2 / 2 | 1 |
| 5 | Liku bakau / challenge | 4 x 4 | 7 | (2,2), (2,3) | 5 / 2 / 2 | 1 |
| 6 | Taman selat / challenge | 4 x 4 | 8 | (2,2), (3,2), (3,3), (4,3) | 5 / 2 / 2 | 2 |
| 7 | Pasang rimbun / challenge | 4 x 4 | 9 | (2,2), (3,1), (3,2) | 2 / 2 / 2 | 2 |

All published levels deliberately use inlet (1,2), side L; tutorials exit at
(3,2), side R; challenges exit at (4,2), side R. No endpoint variation in the
published set is claimed. Pure tests additionally cover rectangular dimensions,
top/bottom and reversed endpoints, and bank-grid placement for all four sides;
they do not verify those fixtures in a browser. Candidate costs are [6,8], [7,9],
[8,8], [9,9]. Thus the first two alternatives exceed the actual budget by 2:
they are geometrically plausible routes, not extra in-budget wins.

### Golden real-click handoff (outside browser source)

Coordinates are (column,row), top-left (1,1). From a fresh level, perform clicks
in the listed order; `xN` means N distinct clockwise clicks on that tile, then
click **Alirkan**. These are production-replayed goldens, not browser-pass claims.

| Level | Ordered clicks | Expected wet cells / flowers |
| --- | --- | --- |
| 1 | (2,2) x1 | 3 / 1 |
| 2 | (1,2) x1; (2,2) x1 | 5 / 2 |
| 3 | (1,3) x1; (2,2) x1; (3,1) x1 | 7 / 3 |
| 4 | (1,2) x1; (2,1) x1; (3,3) x3; (3,2) x1 | 8 / 2 |
| 5 | (1,2) x3; (3,2) x2; (3,3) x1; (4,3) x1 | 8 / 2 |
| 6 | (1,2) x1; (1,1) x1; (3,2) x3; (3,3) x1; (4,3) x2 | 8 / 4 |
| 7 | (2,2) x1; (2,1) x1; (3,1) x1; (3,2) x1; (3,3) x2; (4,3) x3 | 8 / 3 |

After each win, Next advances; after L7 it replays L1. Parent should retest all
seven by actual clicks plus keyboard (arrows/Space/Enter/R), Undo and zero-budget
recovery, Restart in every phase including a queued flow tick, and Next/replay.
At mobile 390 px check actual touch targets >=44 px, no horizontal overflow,
controls reflow, flower and channel visibility, reduced motion, focus/announcements,
and banks aligned with row 2 on both board sizes (not always the board middle).
The parent has since supplied the limited QA report and three genuine-capture
claims used for the authorized local packaging above. Further comprehensive QA
is not implied. No browser/server/detector was run here.

### Current validation and security

After reading/reviewing all changed executable sources and tests, approved Node ran:

```powershell
& 'C:/Users/varal/OpenBot/Agents/agent-994ad623-487d-4534-be59-ab82849ad1dd/tools/node-v22.18.0-win-x64/node.exe' --test tests/logic.test.js tests/challenges.test.js
```

Actual result: **45 passed, 0 failed, 0 skipped; exit 0**. The original 23 tests
remain; only their progression expectation was extended from three to seven
levels. The 22 new tests cover exact tutorial preservation, all four gate/evidence
comparisons, every all-target candidate replay using its measured required budget,
goldens using the real budget, insufficient budgets/no-click failures, canonical
cost/deduplication, nondefault dimensions/endpoints, malformed/negative metadata,
all-seven Undo, locked flow and Restart from all phases with stale callbacks.
An in-memory reproduction of the deterministic generator equals the preserved
certificate; its CLI writer was not rerun and the certificate hash stayed fixed.
No failures required a fix in this test run.

Browser imports remain local and limited to six files; no generator, solver or
certificate is shipped into `game/`. No network, storage, subprocesses, dynamic
imports or external assets were added. The reference solver is pure; tests read
only local certificate/directory data and use fake clocks. Generator `generate()`
is side-effect-free; its separately guarded CLI writes only the fixed certificate
path with exclusive-create mode (used once before interruption). No packaging,
screenshots, run metadata or provenance records were fabricated.

**V3 local packaging passed; limited browser QA is parent-reported only.**
Comprehensive browser/layout/accessibility review remains unverified. Challenge difficulty,
competitiveness and enjoyment require real playtests; route counts alone do not
establish them. No sealed-scorer, detector-clean, privacy/provenance/submission
clearance or prize guarantee is claimed.

## Historical v2 packaged locally, parent-reported browser QA

Everything in this historical section describes v2; its output and PNGs are now
under `milestones/v2/`, not current root `out/` or `screenshots/`.

At v2, the six files in `game/` were the visual-polish version. The compact
heading has no technical eyebrow; the hint has no decorative left rail. Flowers
now have a stem, paired leaves, a closed bud and six procedurally arranged petals
that open through the existing bloom class. The larger board has shallow sand/
stone edge depth with upper-left highlights and lower-right shadows; shaped
water banks preserve the labelled inlet/outlet. No gradients or external assets
were added. Level data, state API, transitions, timers and keyboard bindings are
unchanged. Main/vendor and the existing server configuration were not changed.

Before edits, all 29 baseline manifest entries were verified. After absolute
project-bound and reparse checks and refusing existing targets, the baseline was
preserved without deletion or overwrite:

| Original | Archive mapping |
| --- | --- |
| `out/` | `milestones/v1/out/` (moved; all 10 files / 12 entries / 381,331 bytes) |
| `screenshots/1-l1-planning.png` | `milestones/v1/screenshots/1-l1-planning.png` (moved) |
| `screenshots/2-l1-leak.png` | `milestones/v1/screenshots/2-l1-leak.png` (moved) |
| `screenshots/3-l3-won.png` | `milestones/v1/screenshots/3-l3-won.png` (moved) |
| `SHA256SUMS.txt` | `milestones/v1/SHA256SUMS-baseline.txt` (copied byte-identically) |

All moved files were hash-checked against the baseline manifest. Its snapshot
SHA256 is `4AAC9702F0ED77BB1C652CA7EC46064D2D1B853D9FC0A29A9972E9E9DACC585F`.
That archived manifest retains its original paths as a historical snapshot; use
the current root manifest for the relocated paths and current source hashes.

The preservation/visual-edit stage left `out/` absent and `screenshots/` empty.
Subsequently the parent supplied three new v2-named captures and authorized the
v2 local packaging run recorded below. At that stage `out/` contained v2 and
`screenshots/` contained only those three v2 PNGs. The archived v1 PNGs
and dossier remain historical, not evidence for v2. The verifier's three fixed
screenshot tuples were updated for v2; caps, CRC and rebuild checks were retained.

After reading back/reviewing the full changed HTML/CSS/rendering JS and the
unchanged test/imported modules, the existing native Node suite was rerun once
using the command below: **23 passed, 0 failed, 0 skipped; exit 0**. Rendering uses
only fixed local SVG and integer petal rotations. No network, storage or new
runtime side effects were introduced. Node tests do not execute the DOM or prove
appearance, event integration or accessibility. **V2 browser QA: passed limited
parent-reported checks below, not independently performed by this coding session.**

Parent QA and screenshot copying are attributed below. No browser or server was
run or stopped by this coding session. No detector was installed or run; there
is no detector-clean, privacy, provenance or submission-clearance claim.

### V2 parent-reported browser evidence and limitations

Best Game/OpenBot, operating the external parent browser on the unchanged local
server, reported the following (not browser work performed by this coding session):

- Desktop 1200 x 1000: real click solutions won with 3/5/7 wet cells and 1/2/3
  flowers; unrotated L1 failed at (2,2); Undo, ArrowRight, Space, Enter and R worked.
- Mobile 390 x 844: content width 375 with no horizontal overflow, board 275 px,
  reduced-motion true; Tab, Space, Enter, R, restart during flow and L1 win passed.
- Manual image judgment: stem/leaves/petals and bud-versus-bloom clear, dominant
  board, no eyebrow/rail, aligned banks/inlet, no functional regression seen.
- ResourceTiming external list and diagnostics were empty. This is **not a full
  console/network audit**, comprehensive accessibility audit or final-quality review.

The parent reported genuine unedited desktop captures at 1200 x 1000, DPR 1, and
byte-identical copies into `screenshots/`, without overwriting v1. This session
checked PNG signatures, dimensions, chunk boundaries/CRCs, IEND, sizes and supplied
hashes; it did not capture the images, decode their pixels or prove provenance.

### V2 local packaging execution and results

Before execution, all 30 existing manifest entries matched, including every v1
archive file. Exact cwd/output bounds and project-bounded no-reparse checks
passed; `out/` was absent. Main/vendor hashes matched the earlier full source
review, with current filesystem/dossier paths reviewed again. The full revised
verifier was read back and security-reviewed before execution: native modules,
local reads/assertions only, no writes, subprocesses or network.

Using the approved absolute Node executable in the command below, this session ran:

```powershell
& $node tests/packaging-check.mjs preflight
# Dedicated process, exact project cwd; prior process env restored afterward:
$env:MAKEFUN_OUTPUT_DIR = 'out'
& $node main.ts
& $node tests/packaging-check.mjs verify
```

All three commands exited 0. Only the authorized local `out/` was generated;
there was no overwrite, `/output` write, global-config change or v1 archive edit.
Game/main/vendor and mechanics were unchanged. The 23 tests already passed after
the rendering change; they were not repeated during packaging.

| V2 local check | Actual result | Limit |
| --- | --- | --- |
| Game | 6 source files/entries, 18,388 bytes | 993 entries / 48 MiB |
| Longest game-relative path | 10 UTF-8 bytes | 1,000 bytes |
| Index HTML | 2,889 bytes | 1 MiB |
| Screenshots | 3 PNGs, 1200 x 1000 each | long side <=1280, short >=480 |
| Screenshot bytes | 55,315; 56,630; 65,426 (177,371 total) | 256 KiB each |
| Dossier | 256,359 bytes; exact in-memory vendor rebuild match | 1.5 MiB |
| Whole output | 12 entries (10 files + 2 directories), 452,118 bytes | 1,000 entries / 64 MiB |

All six game copies and three screenshot copies are byte-identical to inputs;
output no-reparse checks passed. Dossier SHA256:
`A668D3D902BBCDE8AC6483EBD564C3EFE06B787AB7269CEE3FCBD538BBB4E018`.
At that stage source, verifier, documentation, input PNGs, every output file and v1
archive paths were listed in `SHA256SUMS.txt`; the manifest itself and live capture
logs are excluded. These are **local contract checks only**, not sealed scoring,
privacy/provenance/submission clearance or final-competitiveness assurance.

## Play

The later browser stage should open `game/index.html` via its approved static
hosting workflow (ES modules need an appropriate browser origin). No server is
provided or launched in this session. Press **Mulai berkebun** to plan.

Water enters/exits at the labelled metadata-defined boundary cells. Visit every flower before
exiting. Click a tile to rotate clockwise, spending one rotation. Stones stay
fixed. **Urungkan** restores the last orientation and rotation budget.
**Alirkan** locks rotations and Undo and traverses one cell every 400 ms.
Mismatches, stones, wrong boundaries and revisits lose. **Ulangi** always resets
the current level and cancels old callbacks. After winning, advance; after L7,
replay from L1. No RNG, score timer, physics, branches or moving tiles.

Keyboard: Tab through controls/tiles; arrows select a channel in that direction,
skipping stones; Space rotates the focused tile; Enter on a tile starts flow.
Enter on another button activates that button normally. R restarts. At zero
budget, tiles retain focus but cannot rotate; Undo/flow/restart remain usable.

## Structure and provenance

- `game/index.html`, `style.css`: Indonesian instructions, responsive diorama,
  visible focus and reduced-motion support.
- `game/levels.js`: seven frozen levels, dimensions/endpoints, openings, flowers,
  budgets, and a pure endpoint-grid helper.
- `game/logic.js`: deterministic immutable transitions, separate from time/DOM.
- `game/runtime.js`: injectable 400 ms scheduler with cancellation generations.
- `game/game.js`: DOM rendering and mouse/keyboard binding.
- `tests/logic.test.js`: native Node test/assert only, injected fake clock.
- `tests/challenges.test.js`: independent evidence comparison, replay, metadata,
  generator reproducibility and seven-level timer/regression coverage.
- `tests/challenge-solver.mjs`, `tests/generate-challenges.mjs`,
  `tests/challenge-certificate.json`: offline reference tools and preserved data.
- `main.ts`: official starter packaging foundation, revised with local output
  and screenshot-existence guards. It was executed once for each authorized v1
  v2 and v3 local packaging dry run, not for submission.
- `vendor/makefun-game.ts`: unchanged official contract copy. The official
  `RULES.txt` and `starter/` inputs are not authored game code. No starter game
  or screenshots were copied. No run metadata or transcripts were fabricated.
- `LICENSE`: MIT (OSI-approved).

## Historical tutorial validation and current browser handoff

The original tutorial-only suite used the following Node 22.18 command. The
current full 45-test command/result is recorded in the v3 section above:

```powershell
& 'C:/Users/varal/OpenBot/Agents/agent-994ad623-487d-4534-be59-ab82849ad1dd/tools/node-v22.18.0-win-x64/node.exe' --test tests/logic.test.js
```

Historical tutorial-suite result after source review:
**23 tests passed, 0 failed, 0 skipped; process exit code 0.** The suite covers
all three exact solutions, L1's unrotated leak at (2,2), Undo budget restoration,
zero-budget recovery, locked flow, one-cell steps, 400 ms scheduling, all four
gameplay-phase restarts, queued stale callback cancellation, mismatch/stone/
boundary failures, defensive loop and missing-flower states, deterministic
repeated inputs, level advance and final replay. No failing tests or logic fixes
were needed in this run. Logic tests do not
prove browser rendering, DOM event behavior or accessibility. **Browser testing
by this coding session: unverified.** The initial implementation stage ran no
browser/server and generated no screenshots, dossier or `out`. A later authorized
local packaging stage is recorded below. There are no fake screenshot placeholders.

Later browser review must check the start screen, mouse rotations, all keyboard
controls, focus retention, small-screen layout, 400 ms progress, flower visibility,
zero-budget recovery, lose/restart, restart during flow, all seven wins, Next and
final replay. Check assistive announcements, contrast and reduced-motion behavior.
Capture 3–4 genuine unedited game renders only after verification (start, planning
or flow with HUD, result/restart); store them under `screenshots/` using the official
size/dimension rules. Do not claim a browser pass until it actually occurs.

Local packaging must use `MAKEFUN_OUTPUT_DIR=out`; the official grader default
remains `/output` when that variable is absent. The existence guard is not a
substitute for validating screenshots; the official vendor validates dossier inputs.

## Security scope

Browser modules only import local files. No fetch, sockets, external URLs,
storage, analytics, eval, dynamic imports, subprocesses or filesystem APIs in
game code. Rendering inserts only paths derived from fixed local opening enums
and integer coordinates; no user text is inserted as HTML. Current tests use
native test/assert, filesystem reads, hashing and local reference/production
modules; they use fake time and do not write files. The offline generator CLI's
exclusive-create certificate write is separate from the test execution path.
Packaging is a separate filesystem-writing entrypoint, executed only for the
authorized v1, v2 and v3 local dry runs recorded here.

## Historical v1 authorized local packaging dry run

The following results refer only to the archived baseline under `milestones/v1/`,
not the current polished game. Root-relative `out/` and screenshot paths in this
historical account are the paths used at the time of that dry run.

The parent reported limited functional browser QA by Best Game/OpenBot on a
local reviewed server. This is not a final bounty-quality or provenance clearance.
The parent supplied three PNGs as byte-identical copies of genuine unedited
native browser captures, not images authored or captured by this coding session.
Their headers, dimensions, chunk CRCs, byte counts and supplied SHA256 hashes
were independently checked here; those checks do not prove capture provenance.

After reviewing all of `main.ts` and the unchanged vendor, this session authored,
read and security-reviewed `tests/packaging-check.mjs`. It is a read-only local
verifier using native Node modules and the official vendor. Its preflight checks
exact cwd, resolved paths, absence of `out`, input hashes and caps. Project-bounded
Windows attribute checks rejected reparse points in the input trees and their
in-project ancestors; canonical project path equality checked ancestor redirection
without reading outside the project. Output reparse checks also passed.

Commands actually run, using the approved absolute Node executable shown above:

```powershell
# $node denotes that approved absolute executable, not a PATH lookup.
& $node tests/packaging-check.mjs preflight
# In a dedicated process at the exact project cwd; restored previous env afterward:
$env:MAKEFUN_OUTPUT_DIR = 'out'
& $node main.ts
& $node tests/packaging-check.mjs verify
```

All three commands exited 0. `out` was absent before packaging; it was not
overwritten. No write to `/output` or global config occurred. No browser, server,
install, network, submission, upload, git or payout action was performed; no
existing QA server was stopped. Game files and main/vendor remained unchanged.
The prior 23 passing logic tests were not repeated because logic did not change.

Local contract results (not a sealed scorer pass):

| Check | Actual result | Limit |
| --- | --- | --- |
| Game | 6 source files/entries, 16,089 bytes | 993 entries / 48 MiB |
| Longest game-relative path | 10 UTF-8 bytes | 1,000 bytes |
| Index HTML | 2,533 bytes | 1 MiB |
| Screenshots | 3 PNGs, 1200 x 1000 each | 3 files; long side <=1280, short >=480 |
| Screenshot bytes | 47,258; 48,224; 53,570 (149,052 total) | 256 KiB each |
| Dossier | 216,190 bytes; exact in-memory vendor rebuild match | 1.5 MiB |
| Whole output | 12 entries (10 files + 2 directories), 381,331 bytes | 1,000 entries / 64 MiB |

All six copied game files and three copied PNGs are byte-identical to inputs.
Dossier SHA256: `5D7121EF268240D96BAEFDFEDCF04969D3E525C813DC3D676C73446D1CA17B39`.
`SHA256SUMS.txt` records original inputs/sources, the reviewed verifier, these
screenshots and every output file, excluding itself and live capture logs.
Full browser quality/accessibility review, anti-slop detection, sealed scoring
and provenance clearance remain outside this local check. The verifier validates
PNG chunk structure/CRC, not a full pixel decoder or visual fidelity.
