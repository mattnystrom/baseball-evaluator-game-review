# Player Evaluator

A self-contained browser app for recording player evaluations in any season. Data is stored locally in the browser and can be exported as CSV or backed up as JSON.

Features include a mobile-friendly sprint stopwatch with separate Home-to-1B and Home-to-2B attempt histories, automatic best-time tracking, and a ball/strike pitch counter with undo and reset controls.

The Game Review tab imports a one-game defensive script from CSV and records event-based defensive observations, including routine-out opportunities, one primary missed-out cause, extra advances, coverage mistakes, and excellent plays. It includes editable game logs, current-game team and player ROC summaries, in-game position overrides, local autosave, JSON backup/restore, and a game-events CSV export.

The defense CSV columns are `Date`, `Number`, `Player First`, `Player Last`, and innings `1` through `7`. Blank player rows are ignored; `X` means the player is sitting that inning.

## Run locally

Open `index.html` in a browser, or serve this directory with any static web server.

Run the Game Review calculation tests with:

```sh
node game-review-core.test.js
```

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, select **Deploy from a branch**.
4. Select the `main` branch and `/ (root)`, then click **Save**.

The published app will be available at:

`https://mattnystrom.github.io/baseball-evaluator/`
