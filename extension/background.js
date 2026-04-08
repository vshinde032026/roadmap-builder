const API_URL = "http://localhost:8000/api/v1/clips";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "save-to-roadmap",
    title: "Save selection to Roadmap Builder",
    contexts: ["selection"]
  });
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== "save-to-roadmap" || !tab?.id) return;

  // 1. Ask the page for the selection
  let clip;
  try {
    const [{ result }] = await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      func: () => {
        const sel = window.getSelection();
        if (!sel || sel.rangeCount === 0) return null;
        // Collapse whitespace the way text fragments do; the browser is
        // tolerant of single-space normalization but not arbitrary newlines.
        const text = sel.toString().replace(/\s+/g, " ").trim();
        if (!text) return null;
        return { text, url: location.href, title: document.title };
      }
    });
    clip = result;
  } catch (e) {
    console.error("Failed to read selection:", e);
    return;
  }

  if (!clip) return;

  // 2. Build a text-fragment URL.
  //   - Short selections (<=300 chars): match the whole thing.
  //   - Long selections: use the "textStart,textEnd" range form so the URL
  //     stays small and the browser still highlights the full passage.
  const enc = encodeURIComponent;
  let fragment;
  if (clip.text.length <= 300) {
    fragment = `#:~:text=${enc(clip.text)}`;
  } else {
    const words = clip.text.split(" ");
    const start = words.slice(0, 6).join(" ");
    const end = words.slice(-6).join(" ");
    fragment = `#:~:text=${enc(start)},${enc(end)}`;
  }
  const fragmentUrl = clip.url.split("#")[0] + fragment;

  // 3. Capture a screenshot of the visible tab (best-effort)
  let screenshot = null;
  try {
    screenshot = await chrome.tabs.captureVisibleTab({ format: "png" });
  } catch (e) {
    console.warn("Screenshot failed:", e);
  }

  // 4. POST to backend
  const payload = {
    url: clip.url,
    title: clip.title,
    selected_text: clip.text,
    fragment_url: fragmentUrl,
    screenshot
  };
  console.log("Clip payload:", payload);

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    notify("Saved to Roadmap Builder", clip.text.slice(0, 80));
  } catch (e) {
    notify("Save failed", String(e));
  }
});

function notify(title, message) {
  chrome.notifications.create({
    type: "basic",
    iconUrl: "icon48.png",
    title,
    message
  });
}
