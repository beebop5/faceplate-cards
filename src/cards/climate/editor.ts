import { LitElement, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { EDITOR_NAME } from "./const";
import type { FaceplateClimateConfig, HomeAssistant } from "./types";

const SELECT_DOMAINS = ["select", "input_select"];

const SETTING_DOMAINS = [
  "switch",
  "input_boolean",
  "light",
  "select",
  "input_select",
  "number",
  "input_number",
];

const schema = (
  settingEntitiesAsYaml: boolean,
  entityModes: string[]
) => [
  {
    name: "entity",
    required: true,
    selector: { entity: { domain: "climate" } },
  },
  { name: "name", selector: { text: {} } },
  {
    name: "layout",
    selector: {
      select: {
        mode: "dropdown",
        options: [
          { value: "row", label: "Row (single line)" },
          { value: "compact", label: "Compact" },
          { value: "standard", label: "Standard" },
          { value: "large", label: "Large" },
        ],
      },
    },
  },
  {
    name: "current_temperature_entity",
    selector: { entity: { domain: ["sensor", "number", "input_number"] } },
  },
  {
    name: "outdoor_temperature_entity",
    selector: { entity: { domain: ["sensor", "number", "input_number"] } },
  },
  ...(entityModes.length
    ? [
        {
          name: "default_mode",
          selector: {
            select: {
              mode: "dropdown",
              options: entityModes
                .filter((m) => m !== "off")
                .map((m) => ({
                  value: m,
                  label: m.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
                })),
            },
          },
        },
        {
          name: "hvac_modes",
          selector: {
            select: {
              multiple: true,
              mode: "list",
              options: entityModes.map((m) => ({
                value: m,
                label: m.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
              })),
            },
          },
        },
      ]
    : []),
  {
    type: "grid",
    name: "",
    schema: [
      { name: "show_name", selector: { boolean: {} } },
      { name: "show_current_temperature", selector: { boolean: {} } },
      { name: "show_controls", selector: { boolean: {} } },
      { name: "show_fan", selector: { boolean: {} } },
      { name: "show_vertical_swing", selector: { boolean: {} } },
      { name: "show_horizontal_swing", selector: { boolean: {} } },
      { name: "show_settings", selector: { boolean: {} } },
    ],
  },
  {
    type: "expandable",
    title: "Swing entity overrides",
    icon: "mdi:tune",
    schema: [
      {
        name: "vertical_swing_entity",
        selector: { entity: { domain: SELECT_DOMAINS } },
      },
      {
        name: "horizontal_swing_entity",
        selector: { entity: { domain: SELECT_DOMAINS } },
      },
    ],
  },
  {
    type: "expandable",
    title: "Settings popup",
    icon: "mdi:tune-variant",
    schema: [
      {
        name: "setting_entities",
        selector: settingEntitiesAsYaml
          ? { object: {} }
          : { entity: { multiple: true, domain: SETTING_DOMAINS } },
      },
    ],
  },
  { name: "step", selector: { number: { min: 0.1, max: 5, step: 0.1, mode: "box" } } },
];

const LABELS: Record<string, string> = {
  entity: "Climate entity (required)",
  name: "Name",
  layout: "Size / layout",
  current_temperature_entity: "Current temperature entity (optional)",
  outdoor_temperature_entity: "Outdoor temperature entity (optional)",
  hvac_modes: "Modes to offer",
  default_mode: "Default mode (power button)",
  show_name: "Show name",
  show_current_temperature: "Show current temperature",
  show_controls: "Show buttons",
  show_fan: "Show fan control",
  show_vertical_swing: "Show vertical swing",
  show_horizontal_swing: "Show horizontal swing",
  show_settings: "Show settings popup",
  vertical_swing_entity: "Vertical swing entity",
  horizontal_swing_entity: "Horizontal swing entity",
  setting_entities: "Entities in settings popup",
  step: "Temperature step",
};

const HELPERS: Record<string, string> = {
  current_temperature_entity:
    "Overrides the temperature reported by the climate entity",
  outdoor_temperature_entity:
    "Shown on the display next to the current temperature",
  hvac_modes:
    "Untick modes your unit can't actually do. Empty = offer all of them",
  show_controls: "Off gives a larger status-only display with no buttons",
  default_mode:
    "Pressing power turns the unit on to this mode. Hold the button to pick any mode",
  vertical_swing_entity:
    "Use a select entity instead of the climate swing_mode attribute",
  horizontal_swing_entity:
    "Use a select entity instead of the climate swing_horizontal_mode attribute",
  setting_entities:
    "To rename an item, use YAML: - entity: switch.x, name: Display light",
  step: "Defaults to the entity's own step",
};

const BOOLEAN_DEFAULTS = {
  show_name: true,
  show_current_temperature: true,
  show_controls: true,
  show_fan: true,
  show_vertical_swing: true,
  show_horizontal_swing: true,
  show_settings: true,
};

@customElement(EDITOR_NAME)
export class FaceplateClimateCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: FaceplateClimateConfig;

  public setConfig(config: FaceplateClimateConfig): void {
    this._config = config;
  }

  protected render() {
    if (!this.hass || !this._config) return nothing;
    // Once name overrides ({entity, name}) are in use, the plain entity
    // picker would destroy them — switch that field to a YAML editor.
    const settingEntitiesAsYaml = Boolean(
      this._config.setting_entities?.some((item) => typeof item !== "string")
    );
    const entityModes: string[] =
      this.hass.states[this._config.entity]?.attributes.hvac_modes ?? [];
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ ...BOOLEAN_DEFAULTS, ...this._config }}
        .schema=${schema(settingEntitiesAsYaml, entityModes)}
        .computeLabel=${(s: { name: string }) => LABELS[s.name] ?? s.name}
        .computeHelper=${(s: { name: string }) => HELPERS[s.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = { ...ev.detail.value } as Record<string, unknown>;
    // Drop empty strings / empty arrays so the stored YAML stays clean.
    for (const [key, v] of Object.entries(value)) {
      if (v === "" || (Array.isArray(v) && v.length === 0)) delete value[key];
    }
    this.dispatchEvent(
      new CustomEvent("config-changed", {
        detail: { config: value },
        bubbles: true,
        composed: true,
      })
    );
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-climate-card-editor": FaceplateClimateCardEditor;
  }
}
