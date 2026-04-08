# Roadmap Builder Clipper (Chrome Extension)

A Manifest V3 Chrome extension that lets users save text snippets from any
webpage to their Roadmap Builder account, with a deep-link back to the exact
spot on the original page.

## Load locally (Mac, Chrome)

1. Open `chrome://extensions`
2. Enable **Developer mode** (top right)
3. Click **Load unpacked** and select this `extension/` folder
4. Pin the extension from the toolbar puzzle-piece icon
5. Visit any page → select text → right-click → **Save selection to Roadmap Builder**

## Reload after editing

Click the ↻ icon on the extension card in `chrome://extensions`. If you change
content-script behavior, also refresh the target webpage.

## Debugging

- **Background worker**: click *service worker* link on the extension card
- **Popup**: right-click the popup → Inspect
- **Content script** (the `executeScript` injection): use DevTools on the page

## API target

Hard-coded to `http://localhost:8000/api/clips`. We will make this configurable
once auth is added.

## Files

- `manifest.json` — extension declaration & permissions
- `background.js` — service worker; context menu, selection capture, screenshot, POST
- `popup.html` — toolbar popup (placeholder)
- `icon16.png` / `icon48.png` / `icon128.png` — **TODO: add icons** (any square PNGs)
