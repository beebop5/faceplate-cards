import type { FaceplateBaseConfig } from "../../core/types";

export type { HassEntity, HomeAssistant } from "../../core/types";

export type Layout = "row" | "compact" | "standard" | "large";

export type SettingEntity = string | { entity: string; name?: string };

export interface FaceplateClimateConfig extends FaceplateBaseConfig {
  entity: string;
  layout?: Layout;
  /** Read current temperature from this entity instead of the climate attribute */
  current_temperature_entity?: string;
  /** Show the outdoor temperature from this entity on the display */
  outdoor_temperature_entity?: string;
  /** Only offer these HVAC modes (default: all the entity reports).
   *  Useful when the integration claims modes the unit can't do. */
  hvac_modes?: string[];
  /** Mode a short press of the power button turns the unit on to.
   *  Defaults to the only available mode when there is just one. */
  default_mode?: string;
  /** Optional select/input_select entities overriding the climate swing attributes */
  vertical_swing_entity?: string;
  horizontal_swing_entity?: string;
  /** Extra entities shown in the settings popup (switch/select/number/…).
   *  Items are entity ids, or objects with a display-name override. */
  setting_entities?: SettingEntity[];
  /** Feature toggles — all default to true, features hide automatically when unsupported */
  show_fan?: boolean;
  show_vertical_swing?: boolean;
  show_horizontal_swing?: boolean;
  show_settings?: boolean;
  show_current_temperature?: boolean;
  show_name?: boolean;
  /** false hides every button, leaving a larger status-only display */
  show_controls?: boolean;
  /** Target temperature step; defaults to the entity's target_temp_step or 0.5 */
  step?: number;
}

/** A resolved source for a list-style control (mode / fan / swing), regardless
 *  of whether it comes from the climate entity or a separate select entity. */
export interface ControlSource {
  options: string[];
  current?: string;
  set: (value: string) => void;
}

export type PopupKind = "config";
