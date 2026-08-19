export const REPO_URL = "https://github.com/bl0ckstat/faceplate-cards";

/** Add a card to the dashboard card picker. */
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
