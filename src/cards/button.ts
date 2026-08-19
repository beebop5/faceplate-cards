import { html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
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
  /**
   * A digit or two set into the icon's corner, the way mdi:fan-speed-2 draws
   * its own. Material only numbers its fan icons to three, so a six-speed fan
   * would otherwise show three numbered glyphs and three identical ones; this
   * numbers the whole set consistently however many speeds there are.
   */
  icon_badge?: string;
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
      /* The digit sits in the icon's corner rather than beside it, so the
         button still reads as one glyph at a glance and the label is not
         competing with the icon for a small tile's width. */
      .glyph {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .glyph-badge {
        position: absolute;
        right: -0.28em;
        bottom: -0.18em;
        font-size: 0.5em;
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }
      /* A size container, so the button can be sized from whichever of the
         tile's two dimensions is smaller. aspect-ratio alone cannot do it:
         it derives one axis from the other, so whichever axis gets clamped
         second leaves the circle an ellipse. The min-height floor keeps the
         button visible if this ever lands in a view that gives the card an
         indefinite height, where a size container would otherwise collapse. */
      ha-card {
        justify-content: center;
        align-items: center;
        gap: 4px;
        padding: 6px;
        container-type: size;
        min-height: 48px;
      }
      /* The button is the card: it takes whatever space the tile gives it,
         squared off so it stays a circle at any tile shape.
         Deliberately not a size container: container-type size on an element
         with auto width and height collapses it to nothing, which renders the
         button invisible. */
      .ctl.fill {
        /* Square by construction: the smaller of the tile's two dimensions,
           less whatever the labels underneath have reserved. */
        --fp-button: min(100cqw, calc(100cqh - var(--fp-labels, 0px)));
        width: var(--fp-button);
        height: var(--fp-button);
        max-width: none;
        flex: none;
      }
      /* Each label line under the button takes its height out of the circle
         rather than squashing it. */
      ha-card.with-name .ctl.fill {
        --fp-labels: 20px;
      }
      ha-card.with-state .ctl.fill {
        --fp-labels: 20px;
      }
      ha-card.with-name.with-state .ctl.fill {
        --fp-labels: 44px;
      }
      .ctl.fill ha-icon {
        --mdc-icon-size: clamp(16px, 46cqmin, 38px);
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

    const showName = config.show_name !== false && Boolean(name);
    const showState = Boolean(config.show_state && stateObj);

    return html`
      <ha-card
        class=${classMap({
          unavailable,
          "with-name": showName,
          "with-state": showState,
        })}
      >
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
              style=${styleMap(
                on && !config.accent
                  ? { color: "var(--state-active-color, var(--primary-color))" }
                  : {}
              )}
              @click=${this._handler!.click}
              @pointerdown=${this._handler!.down}
              @pointerup=${this._handler!.up}
              @pointerleave=${this._handler!.up}
              @pointercancel=${this._handler!.up}
              @contextmenu=${(e: Event) => e.preventDefault()}
            >
              ${config.icon_badge
                ? html`<span class="glyph">
                    <ha-icon icon=${icon}></ha-icon>
                    <span class="glyph-badge">${config.icon_badge}</span>
                  </span>`
                : html`<ha-icon icon=${icon}></ha-icon>`}
            </button>`}
        ${showName
          ? html`<span class="label" title=${name}>${name}</span>`
          : nothing}
        ${showState
          ? html`<span class="label state"
              >${localizeState(this.hass, stateObj!)}</span
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
