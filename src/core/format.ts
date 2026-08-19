import type { HassEntity, HomeAssistant } from "./types";

/** "fan_only" → "Fan Only" */
export function prettify(value: string): string {
  return value.replace(/[_-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export function formatNumber(
  hass: HomeAssistant | undefined,
  value: number,
  maximumFractionDigits = 1
): string {
  return value.toLocaleString(hass?.language ?? "en", { maximumFractionDigits });
}

/** Read a numeric state off an entity, or undefined when it isn't a number. */
export function numericState(
  hass: HomeAssistant | undefined,
  entityId?: string
): number | undefined {
  if (!entityId) return undefined;
  const st = hass?.states[entityId];
  const value = st ? parseFloat(st.state) : NaN;
  return Number.isFinite(value) ? value : undefined;
}

/** Home Assistant's own translated state text, falling back to a tidied
 *  version of the raw state so an untranslated domain still reads well. */
export function localizeState(
  hass: HomeAssistant | undefined,
  stateObj: HassEntity | undefined
): string {
  if (!stateObj) return "";
  if (hass?.formatEntityState) {
    try {
      return hass.formatEntityState(stateObj);
    } catch {
      /* fall through to the generic path */
    }
  }
  const domain = stateObj.entity_id.split(".")[0];
  return (
    hass?.localize(
      `component.${domain}.entity_component._.state.${stateObj.state}`
    ) || prettify(stateObj.state)
  );
}

export function friendlyName(
  stateObj: HassEntity | undefined,
  override?: string
): string {
  return override ?? stateObj?.attributes.friendly_name ?? stateObj?.entity_id ?? "";
}

export function isUnavailable(stateObj: HassEntity | undefined): boolean {
  return (
    !stateObj ||
    stateObj.state === "unavailable" ||
    stateObj.state === "unknown"
  );
}
