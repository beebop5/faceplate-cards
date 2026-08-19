import { JSDOM } from "jsdom";

export const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in globalThis)) {
    try {
      globalThis[key] = dom.window[key];
    } catch {
      /* read-only */
    }
  }
}
globalThis.window = dom.window;
globalThis.document = dom.window.document;

// Node ships its own Event/CustomEvent, and jsdom rejects events built by a
// different realm. The loop above skips them because they already exist, so
// overwrite them explicitly or every dispatchEvent in the bundle throws.
for (const key of ["Event", "CustomEvent", "HTMLElement", "Element", "Node"]) {
  globalThis[key] = dom.window[key];
}

/** Service calls and websocket subscriptions made by the cards under test. */
export const calls = [];
export const subscriptions = [];

export function makeHass(states) {
  return {
    language: "en",
    locale: { language: "en", time_format: "24" },
    config: { unit_system: { temperature: "°C" } },
    localize: () => "",
    callService: (domain, service, data, target) => {
      calls.push([domain, service, data, target]);
      return Promise.resolve();
    },
    connection: {
      subscribeMessage: async (callback, message) => {
        subscriptions.push({ callback, message });
        return async () => {};
      },
    },
    states,
  };
}

export function makeAssert() {
  const state = { failures: 0 };
  const assert = (cond, msg) => {
    if (!cond) {
      console.error("FAIL:", msg);
      state.failures += 1;
      process.exitCode = 1;
    } else {
      console.log("ok:", msg);
    }
  };
  return { assert, state };
}

/** Mount a card the way a dashboard would, and hand back its shadow root. */
export async function mount(tag, config, hass) {
  const card = document.createElement(tag);
  card.setConfig(config);
  card.hass = hass;
  document.body.appendChild(card);
  await card.updateComplete;
  return { card, root: card.shadowRoot };
}

/** Visible text only: jsdom exposes Lit's stylesheets as <style> elements,
 *  whose CSS would otherwise swamp every textContent assertion. */
export function text(root) {
  return [...root.childNodes]
    .filter((n) => n.nodeName !== "STYLE")
    .map((n) => n.textContent ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

/** The clock card keeps a timer running while mounted, which would otherwise
 *  hold the process open long after the assertions are done. */
export function finish(state) {
  console.log(
    state.failures === 0 ? "\nAll tests passed" : `\n${state.failures} failed`
  );
  process.exit(state.failures === 0 ? 0 : 1);
}
