# SuperSonic Scratch

Self-hosted Scratch 3 with **SuperSonic** (Sam Aaron’s browser scsynth engine) built in as a core extension—not a remote extension URL.

## Workspace layout

```
SuperSonicScratch/
├── scratch-vm/      # execution runtime (modified)
├── scratch-gui/     # React editor (modified)
└── README.md
```

## First-time setup

```bash
cd scratch-vm && npm install && npm link
cd ../scratch-gui && npm install && npm link scratch-vm
```

Requires **Node.js 18+**.

## Development

Use two terminals:

```bash
# Terminal 1
cd scratch-vm && npm run watch

# Terminal 2
cd scratch-gui && npm start
```

Open http://localhost:8601 and add **SuperSonic** from the extensions library. The engine boots automatically when you click the **green flag** (or on the first sound block you run). The **red stop** button cancels all SuperSonic sounds.

## What was changed

| Repo | File | Change |
|------|------|--------|
| scratch-vm | `src/util/shared-dependencies.js` | CDN / ESM loader |
| scratch-vm | `src/engine/runtime.js` | `runtime.sharedDependencies` |
| scratch-vm | `src/extensions/scratch3_supersonic/index.js` | Full extension |
| scratch-vm | `src/extensions/scratch3_supersonic/samples-manifest.js` | All 206 samples by category |
| scratch-vm | `src/extension-support/extension-manager.js` | `supersonic` builtin |
| scratch-gui | `src/lib/libraries/extensions/index.jsx` | Library entry |
| scratch-gui | `src/lib/libraries/extensions/supersonic/supersonic.png` | Extension tile icon |

SuperSonic loads from jsDelivr at runtime (pinned to `0.67.2`)—no WASM bundled into scratch-vm. The client (`supersonic-scsynth`) and engine (`supersonic-scsynth-core` for WASM/worklet) are separate npm packages; `initEngine` sets both `baseURL` and `coreBaseURL`.

### Samples (206)

Each sample type has its own block with a focused dropdown, for example **play drum sample**, **play loop sample**, **play ambient sample**, **play percussion sample**, and 11 more (15 blocks total, all 206 samples). Regenerate the manifest after a samples package bump:

```bash
cd scratch-vm && node src/extensions/scratch3_supersonic/build-samples-manifest.js
```
