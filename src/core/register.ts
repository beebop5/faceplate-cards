export const REPO_URL = "https://github.com/bl0ckstat/faceplate-cards";

/** Add a card to the dashboard card picker. */
/**
 * Load the faceplate type once per document: Archivo for UI, IBM Plex Mono
 * for metadata. Injected here rather than declared in card CSS because
 * @font-face inside shadow roots never fires. Offline panels fall back to
 * the system stack and lose nothing but the letterforms.
 */
const FONTS =
  "https://fonts.googleapis.com/css2?family=Archivo:wght@300;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap";
if (typeof document !== "undefined" && !document.querySelector(`link[href="${FONTS}"]`)) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = FONTS;
  document.head.appendChild(link);
}

export function registerCard(entry: {
  type: string;
  name: string;
  description: string;
  preview?: boolean;
}): void {
  window.customCards = window.customCards || [];
  if (window.customCards.some((c) => c.type === entry.type)) return;
  window.customCards.push({
    preview: true,
    documentationURL: REPO_URL,
    ...entry,
  });
}
