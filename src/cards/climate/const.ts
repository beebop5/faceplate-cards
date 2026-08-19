export const CARD_NAME = "faceplate-climate-card";
export const EDITOR_NAME = "faceplate-climate-card-editor";

/** Off leads the mode list: it doubles as the power control, so it must be the
 *  quickest target to hit. */
export const HVAC_MODE_ORDER = [
  "off",
  "auto",
  "heat_cool",
  "heat",
  "cool",
  "dry",
  "fan_only",
];

export const HVAC_MODE_ICONS: Record<string, string> = {
  auto: "mdi:thermostat-auto",
  heat_cool: "mdi:sun-snowflake-variant",
  heat: "mdi:fire",
  cool: "mdi:snowflake",
  dry: "mdi:water-percent",
  fan_only: "mdi:fan",
  off: "mdi:power",
};

/** Fall back colors mirror HA's climate state colors; themes can override
 *  the --state-climate-*-color tokens. */
export const HVAC_MODE_COLORS: Record<string, string> = {
  auto: "var(--state-climate-auto-color, #008e6d)",
  heat_cool: "var(--state-climate-heat_cool-color, #008e6d)",
  heat: "var(--state-climate-heat-color, #ff8100)",
  cool: "var(--state-climate-cool-color, #2196f3)",
  dry: "var(--state-climate-dry-color, #efbd07)",
  fan_only: "var(--state-climate-fan_only-color, #009688)",
  off: "var(--state-climate-off-color, var(--disabled-text-color, #9e9e9e))",
};

/** Best-effort icon for a fan speed option name. */
export function fanIcon(option: string): string {
  const o = option.toLowerCase();
  if (o.includes("auto")) return "mdi:fan-auto";
  if (o === "off") return "mdi:fan-off";
  if (/(quiet|silent|sleep|night)/.test(o)) return "mdi:fan-minus";
  if (/(low|min|1)/.test(o)) return "mdi:fan-speed-1";
  if (/(mid|med|2)/.test(o)) return "mdi:fan-speed-2";
  if (/(high|3)/.test(o)) return "mdi:fan-speed-3";
  if (/(max|top|turbo|strong|4|5)/.test(o)) return "mdi:fan-plus";
  return "mdi:fan";
}

/**
 * True when the icon already spells out the option, as mdi:fan-speed-2 does for
 * "2" — the chip can then drop the label instead of showing the number twice.
 * Speeds above 3 fall back to a generic icon, so they keep their text.
 */
export function iconCarriesLabel(option: string, icon: string): boolean {
  const trimmed = option.trim();
  return /^\d+$/.test(trimmed) && icon.endsWith(`-${trimmed}`);
}

/** Best-effort icon for a swing option name. */
export function swingIcon(option: string, horizontal: boolean): string {
  const o = option.toLowerCase();
  if (/(off|stop|fix)/.test(o))
    return horizontal ? "mdi:pan-horizontal" : "mdi:pan-vertical";
  if (/(on|swing|both|all|auto|oscillat|full|range)/.test(o))
    return horizontal ? "mdi:swap-horizontal" : "mdi:swap-vertical";
  if (horizontal) {
    if (/left/.test(o)) return "mdi:arrow-left";
    if (/right/.test(o)) return "mdi:arrow-right";
    if (/(mid|cent)/.test(o)) return "mdi:arrow-split-vertical";
    return "mdi:swap-horizontal";
  }
  if (/(highest|top|up)/.test(o)) return "mdi:arrow-up";
  if (/(lowest|bottom|down|low)/.test(o)) return "mdi:arrow-down";
  if (/(mid|cent|horiz)/.test(o)) return "mdi:arrow-split-horizontal";
  if (/high/.test(o)) return "mdi:arrow-top-right";
  return "mdi:swap-vertical";
}

/** Icon for options of a combined swing control (off/vertical/horizontal/both). */
export function combinedSwingIcon(option: string): string {
  const o = option.toLowerCase();
  if (/both|all/.test(o)) return "mdi:arrow-all";
  if (/horiz/.test(o)) return "mdi:swap-horizontal";
  if (/vert/.test(o)) return "mdi:swap-vertical";
  if (/off|stop|fix/.test(o)) return "mdi:arrow-oscillating-off";
  return "mdi:arrow-oscillating";
}

export function prettify(value: string): string {
  return value
    .replace(/[_-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
