import type { ActionConfig, FaceplateBaseConfig, HomeAssistant } from "./types";

/** Domains where `homeassistant.toggle` isn't the right verb. */
const TOGGLE_OVERRIDES: Record<string, string> = {
  lock: "lock",
  cover: "cover",
  group: "homeassistant",
};

export function fireEvent(
  node: HTMLElement,
  type: string,
  detail?: unknown
): void {
  node.dispatchEvent(
    new CustomEvent(type, { detail, bubbles: true, composed: true })
  );
}

export function moreInfo(node: HTMLElement, entityId: string): void {
  fireEvent(node, "hass-more-info", { entityId });
}

/**
 * Run one of Home Assistant's dashboard actions.
 *
 * Both `perform-action` (2024.8+) and the older `call-service` spelling are
 * accepted, because dashboards written against either are still out there and
 * a card that only understood one would silently do nothing on the other.
 */
export function handleAction(
  node: HTMLElement,
  hass: HomeAssistant,
  config: FaceplateBaseConfig,
  action: "tap" | "hold" | "double_tap"
): void {
  const key = `${action}_action` as
    | "tap_action"
    | "hold_action"
    | "double_tap_action";
  const fallback: ActionConfig =
    action === "tap"
      ? { action: config.entity ? "toggle" : "none" }
      : action === "hold"
        ? { action: config.entity ? "more-info" : "none" }
        : { action: "none" };
  const cfg = config[key] ?? fallback;

  switch (cfg.action) {
    case "none":
      return;

    case "more-info": {
      const entityId = cfg.entity ?? config.entity;
      if (entityId) moreInfo(node, entityId);
      return;
    }

    case "toggle": {
      const entityId = cfg.entity ?? config.entity;
      if (!entityId) return;
      const domain = entityId.split(".")[0];
      hass.callService(TOGGLE_OVERRIDES[domain] ?? "homeassistant", "toggle", {
        entity_id: entityId,
      });
      return;
    }

    case "navigate": {
      if (!cfg.navigation_path) return;
      history.pushState(null, "", cfg.navigation_path);
      fireEvent(node, "location-changed", { replace: false });
      return;
    }

    case "url": {
      if (cfg.url_path) window.open(cfg.url_path, "_blank", "noreferrer");
      return;
    }

    case "assist":
      fireEvent(node, "show-dialog", {
        dialogTag: "ha-voice-command-dialog",
        dialogImport: () => Promise.resolve(),
        dialogParams: {},
      });
      return;

    case "call-service":
    case "perform-action": {
      const full = cfg.perform_action ?? cfg.service;
      if (!full || !full.includes(".")) return;
      const [domain, service] = full.split(".", 2);
      hass.callService(
        domain,
        service,
        cfg.data ?? cfg.service_data ?? {},
        cfg.target
      );
      return;
    }
  }
}

/**
 * Wire tap / hold / double-tap onto one element.
 *
 * Pointer events rather than click: a wall panel's touch layer delivers
 * pointerdown long before click, which is what makes a half-second hold
 * feel immediate instead of laggy. The trailing click after a hold is
 * swallowed so a long press never also fires the tap action.
 */
export class ActionHandler {
  private _timer?: number;
  private _held = false;
  private _lastTap = 0;
  private _tapTimer?: number;

  constructor(
    private readonly _run: (action: "tap" | "hold" | "double_tap") => void,
    private readonly _opts: {
      hasHold?: boolean;
      hasDoubleTap?: boolean;
      holdMs?: number;
    } = {}
  ) {}

  public readonly down = (): void => {
    this._held = false;
    if (!this._opts.hasHold) return;
    window.clearTimeout(this._timer);
    this._timer = window.setTimeout(() => {
      this._held = true;
      this._run("hold");
    }, this._opts.holdMs ?? 500);
  };

  public readonly up = (): void => {
    window.clearTimeout(this._timer);
  };

  public readonly click = (ev: Event): void => {
    ev.stopPropagation();
    if (this._held) {
      this._held = false;
      return;
    }
    if (!this._opts.hasDoubleTap) {
      this._run("tap");
      return;
    }
    const now = Date.now();
    if (now - this._lastTap < 300) {
      window.clearTimeout(this._tapTimer);
      this._lastTap = 0;
      this._run("double_tap");
      return;
    }
    this._lastTap = now;
    // Hold the tap back just long enough to know a second one isn't coming.
    this._tapTimer = window.setTimeout(() => this._run("tap"), 300);
  };

  public destroy(): void {
    window.clearTimeout(this._timer);
    window.clearTimeout(this._tapTimer);
  }
}
