export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, any>;
  last_changed: string;
  last_updated: string;
}

export interface HassConnection {
  subscribeMessage: (
    callback: (message: any) => void,
    subscribeMessage: Record<string, unknown>
  ) => Promise<() => Promise<void>>;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  config: { unit_system: { temperature: string } };
  language: string;
  locale?: { language: string; time_format?: string };
  themes?: { darkMode?: boolean };
  connection?: HassConnection;
  localize: (key: string, ...args: unknown[]) => string;
  formatEntityState?: (stateObj: HassEntity, state?: string) => string;
  callService: (
    domain: string,
    service: string,
    data?: Record<string, unknown>,
    target?: Record<string, unknown>
  ) => Promise<unknown>;
}

/** A tap/hold/double-tap action, matching Home Assistant's own action config. */
export interface ActionConfig {
  action:
    | "none"
    | "toggle"
    | "more-info"
    | "navigate"
    | "url"
    | "call-service"
    | "perform-action"
    | "assist";
  navigation_path?: string;
  url_path?: string;
  /** Legacy spelling; `perform_action` is the 2024.8+ name for the same thing. */
  service?: string;
  perform_action?: string;
  service_data?: Record<string, unknown>;
  data?: Record<string, unknown>;
  target?: Record<string, unknown>;
  entity?: string;
  confirmation?: boolean | { text?: string };
}

/** Config keys every card in the suite understands. */
export interface FaceplateBaseConfig {
  type: string;
  entity?: string;
  name?: string;
  icon?: string;
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  /** Home Assistant's own conditional-visibility list, handled by the frontend. */
  visibility?: unknown[];
  grid_options?: Record<string, unknown>;
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
}
