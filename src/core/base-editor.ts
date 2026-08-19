import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import type { HomeAssistant } from "./types";

export type HaFormSchema = Record<string, unknown>;

/**
 * Every card's visual editor is the same `ha-form` wired to a different
 * schema, so subclasses supply only the schema, labels and helper text.
 */
export abstract class FaceplateEditor<C = Record<string, unknown>>
  extends LitElement
{
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: C;

  public setConfig(config: C): void {
    this._config = config;
  }

  protected abstract schema(config: C, hass: HomeAssistant): HaFormSchema[];

  protected labels: Record<string, string> = {};
  protected helpers: Record<string, string> = {};
  /** Values ha-form should show for keys the config leaves unset. */
  protected defaults: Record<string, unknown> = {};

  protected render() {
    if (!this.hass || !this._config) return nothing;
    return html`
      <ha-form
        .hass=${this.hass}
        .data=${{ ...this.defaults, ...this._config }}
        .schema=${this.schema(this._config, this.hass)}
        .computeLabel=${(s: { name: string }) => this.labels[s.name] ?? s.name}
        .computeHelper=${(s: { name: string }) => this.helpers[s.name]}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }

  private _valueChanged(ev: CustomEvent): void {
    ev.stopPropagation();
    const value = { ...ev.detail.value } as Record<string, unknown>;
    // Drop empty strings and empty lists so the stored YAML stays clean.
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

/** The tap/hold/double-tap block, shared by the interactive cards. */
export const ACTION_SCHEMA: HaFormSchema = {
  type: "expandable",
  title: "Actions",
  icon: "mdi:gesture-tap",
  schema: [
    { name: "tap_action", selector: { ui_action: {} } },
    { name: "hold_action", selector: { ui_action: {} } },
    { name: "double_tap_action", selector: { ui_action: {} } },
  ],
};

export const ACTION_LABELS: Record<string, string> = {
  tap_action: "Tap action",
  hold_action: "Hold action",
  double_tap_action: "Double tap action",
};
