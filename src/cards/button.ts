import { html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FaceplateCard } from "../core/base-card";
import {
  ACTION_LABELS,
  ACTION_SCHEMA,
  FaceplateEditor,
  type HaFormSchema,
} from "../core/base-editor";
import { ActionHandler, handleAction } from "../core/actions";
import { friendlyName, localizeState } from "../core/format";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig, HomeAssistant } from "../core/types";

const CARD = "faceplate-button-card";
const EDITOR = "faceplate-button-card-editor";

export interface FaceplateButtonConfig extends FaceplateBaseConfig {
  show_name?: boolean;
  show_icon?: boolean;
  show_state?: boolean;
  /** Fill the button with the accent colour rather than tinting it on. */
  accent?: boolean;
}

/**
 * The suite's workhorse: one round tactile button that fills its tile.
 *
 * Unlike Home Assistant's button card the target grows with the tile instead
 * of sitting at a fixed size in a sea of padding — on a 4-column NSPanel tile
 * that is the difference between a comfortable thumb press and a near miss.
 */
@customElement(CARD)
export class FaceplateButtonCard extends FaceplateCard<FaceplateButtonConfig> {
  protected static requiresEntity = false;

  private _handler?: ActionHandler;

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(): Partial<FaceplateButtonConfig> {
    return { show_name: true, show_icon: true, tap_action: { action: "toggle" } };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return { columns: 4, rows: 1, min_columns: 2, min_rows: 1 };
  }

  public setConfig(config: FaceplateButtonConfig): void {
    super.setConfig(config);
    this._handler?.destroy();
    this._handler = new ActionHandler((action) => this._run(action), {
      hasHold: Boolean(config.hold_action) || Boolean(config.entity),
      hasDoubleTap: Boolean(config.double_tap_action),
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._handler?.destroy();
  }

  private _run(action: "tap" | "hold" | "double_tap"): void {
    if (this.hass && this._config) {
      handleAction(this, this.hass, this._config, action);
    }
  }

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        justify-content: center;
        align-items: center;
        gap: 4px;
        padding: 6px;
      }
      /* The button is the card: it takes whatever space the tile gives it,
         squared off so it stays a circle at any tile shape. */
      .ctl.fill {
        width: auto;
        height: auto;
        max-width: none;
        flex: 0 1 auto;
        min-height: 0;
        min-width: 0;
        max-height: 100%;
        aspect-ratio: 1;
        container-type: size;
      }
      .ctl.fill ha-icon {
        /* Track the button rather than the card, so a wide short tile scales
           the glyph off the height it actually has. */
        --mdc-icon-size: min(52cqh, 52cqw, 40px);
      }
      .label {
        font-size: 12px;
        font-weight: 500;
        text-align: center;
        max-width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        flex: none;
      }
      .label.state {
        font-size: 11px;
        color: var(--secondary-text-color);
      }
      .unavailable {
        opacity: 0.45;
      }
    `,
  ];

  protected render() {
    const guard = this._guard();
    if (guard !== null) return guard;
    const config = this._config!;
    const stateObj = this._stateObj;

    const on = stateObj?.state === "on" || stateObj?.state === "open";
    const unavailable = stateObj?.state === "unavailable";
    const name = friendlyName(stateObj, config.name);
    const icon =
      config.icon ?? stateObj?.attributes.icon ?? this._domainIcon(on);

    return html`
      <ha-card class=${classMap({ unavailable })}>
        ${config.show_icon === false
          ? nothing
          : html`<button
              class=${classMap({
                ctl: true,
                fill: true,
                on: on && !config.accent,
                off: Boolean(stateObj) && !on,
                accent: Boolean(config.accent),
              })}
              title=${name}
              aria-label=${name}
              @click=${this._handler!.click}
              @pointerdown=${this._handler!.down}
              @pointerup=${this._handler!.up}
              @pointerleave=${this._handler!.up}
              @pointercancel=${this._handler!.up}
              @contextmenu=${(e: Event) => e.preventDefault()}
            >
              <ha-icon icon=${icon}></ha-icon>
            </button>`}
        ${config.show_name === false || !name
          ? nothing
          : html`<span class="label" title=${name}>${name}</span>`}
        ${config.show_state && stateObj
          ? html`<span class="label state"
              >${localizeState(this.hass, stateObj)}</span
            >`
          : nothing}
      </ha-card>
    `;
  }

  /** A sensible glyph when neither the config nor the entity offers one. */
  private _domainIcon(on: boolean): string {
    const domain = this._config?.entity?.split(".")[0];
    switch (domain) {
      case "light":
        return on ? "mdi:lightbulb" : "mdi:lightbulb-outline";
      case "switch":
        return "mdi:toggle-switch-outline";
      case "script":
        return "mdi:play";
      case "scene":
        return "mdi:palette";
      case "fan":
        return "mdi:fan";
      case "cover":
        return "mdi:window-shutter";
      case "climate":
        return "mdi:thermostat";
      case "media_player":
        return "mdi:speaker";
      default:
        return this._config?.tap_action?.action === "navigate"
          ? "mdi:arrow-right-circle-outline"
          : "mdi:gesture-tap-button";
    }
  }
}

@customElement(EDITOR)
export class FaceplateButtonCardEditor extends FaceplateEditor<FaceplateButtonConfig> {
  protected defaults = { show_name: true, show_icon: true, show_state: false };

  protected labels = {
    entity: "Entity (optional)",
    name: "Name",
    icon: "Icon",
    show_name: "Show name",
    show_icon: "Show icon",
    show_state: "Show state",
    accent: "Accent colour",
    ...ACTION_LABELS,
  };

  protected helpers = {
    entity: "Leave empty for a button that only navigates or runs an action",
    accent: "Fill the button with the theme's accent colour at all times",
  };

  protected schema(_config: FaceplateButtonConfig, _hass: HomeAssistant): HaFormSchema[] {
    return [
      { name: "entity", selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_name", selector: { boolean: {} } },
          { name: "show_icon", selector: { boolean: {} } },
          { name: "show_state", selector: { boolean: {} } },
          { name: "accent", selector: { boolean: {} } },
        ],
      },
      ACTION_SCHEMA,
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Button",
  description:
    "A round tactile button that fills its tile — toggles, scripts, scenes and navigation",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-button-card": FaceplateButtonCard;
    "faceplate-button-card-editor": FaceplateButtonCardEditor;
  }
}
