import { html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FaceplateCard } from "../core/base-card";
import {
  ACTION_LABELS,
  FaceplateEditor,
  type HaFormSchema,
} from "../core/base-editor";
import { ActionHandler, handleAction, moreInfo } from "../core/actions";
import { friendlyName, localizeState } from "../core/format";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { ActionConfig, FaceplateBaseConfig, HomeAssistant } from "../core/types";

const CARD = "faceplate-tile-card";
const EDITOR = "faceplate-tile-card-editor";

export interface FaceplateTileConfig extends FaceplateBaseConfig {
  show_state?: boolean;
  vertical?: boolean;
  accent?: boolean;
  /** Action for the icon itself; the rest of the row uses `tap_action`. */
  icon_tap_action?: ActionConfig;
}

/**
 * An entity row in the suite's language: the same round button as the button
 * card, with the name and state set beside it in LCD type.
 *
 * The icon and the row carry separate actions, so the common wall-panel
 * pattern — press the button to act, press the label to see detail — works
 * without a long press.
 */
@customElement(CARD)
export class FaceplateTileCard extends FaceplateCard<FaceplateTileConfig> {
  private _rowHandler?: ActionHandler;

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(hass: HomeAssistant): Partial<FaceplateTileConfig> {
    const entity =
      Object.keys(hass.states).find((e) => e.startsWith("light.")) ??
      Object.keys(hass.states)[0];
    return { entity: entity ?? "" };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return this._config?.vertical
      ? { columns: 3, rows: 2, min_columns: 2, min_rows: 2 }
      : { columns: 6, rows: 1, min_columns: 3, min_rows: 1 };
  }

  public setConfig(config: FaceplateTileConfig): void {
    super.setConfig(config);
    this._rowHandler?.destroy();
    this._rowHandler = new ActionHandler((action) => this._run(action), {
      hasHold: true,
      hasDoubleTap: Boolean(config.double_tap_action),
    });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._rowHandler?.destroy();
  }

  private _run(action: "tap" | "hold" | "double_tap"): void {
    if (!this.hass || !this._config) return;
    // A tile's row defaults to more-info; only the icon defaults to acting.
    const config =
      action === "tap" && !this._config.tap_action
        ? { ...this._config, tap_action: { action: "more-info" as const } }
        : this._config;
    handleAction(this, this.hass, config, action);
  }

  private _iconTap = (ev: Event): void => {
    ev.stopPropagation();
    if (!this.hass || !this._config) return;
    const cfg = this._config.icon_tap_action;
    if (cfg) {
      handleAction(this, this.hass, { ...this._config, tap_action: cfg }, "tap");
      return;
    }
    const domain = this._config.entity!.split(".")[0];
    if (["script", "scene", "button", "input_button"].includes(domain)) {
      // Nothing to toggle on a one-shot entity — press means run.
      const service =
        domain === "script" ? "turn_on" : domain === "scene" ? "turn_on" : "press";
      this.hass.callService(domain, service, { entity_id: this._config.entity });
      return;
    }
    if (["light", "switch", "fan", "input_boolean", "media_player"].includes(domain)) {
      this.hass.callService("homeassistant", "toggle", {
        entity_id: this._config.entity,
      });
      return;
    }
    moreInfo(this, this._config.entity!);
  };

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding: 8px 10px;
        cursor: pointer;
      }
      ha-card.vertical {
        flex-direction: column;
        justify-content: center;
        gap: 6px;
        text-align: center;
      }
      .ctl {
        flex: none;
        width: 42px;
        max-width: 42px;
      }
      .ctl ha-icon {
        --faceplate-icon-size: 22px;
      }
      .text {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 1px;
      }
      ha-card.vertical .text {
        align-items: center;
      }
      .primary {
        font-size: 14px;
        font-weight: 500;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .secondary {
        font-size: 12px;
        color: var(--secondary-text-color);
        font-variant-numeric: tabular-nums;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      ha-card.unavailable {
        opacity: 0.5;
      }
      @container (max-width: 140px) {
        .primary {
          font-size: 13px;
        }
      }
    `,
  ];

  protected render() {
    const guard = this._guard();
    if (guard !== null) return guard;
    const config = this._config!;
    const stateObj = this._stateObj!;

    const on = ["on", "open", "playing", "home"].includes(stateObj.state);
    const unavailable = stateObj.state === "unavailable";
    const name = friendlyName(stateObj, config.name);
    const icon = config.icon ?? stateObj.attributes.icon ?? "mdi:eye";

    return html`
      <ha-card
        class=${classMap({ vertical: Boolean(config.vertical), unavailable })}
        @click=${this._rowHandler!.click}
        @pointerdown=${this._rowHandler!.down}
        @pointerup=${this._rowHandler!.up}
        @pointerleave=${this._rowHandler!.up}
        @pointercancel=${this._rowHandler!.up}
        @contextmenu=${(e: Event) => e.preventDefault()}
      >
        <button
          class=${classMap({
            ctl: true,
            on: on && !config.accent,
            off: !on,
            accent: Boolean(config.accent),
          })}
          title=${name}
          @click=${this._iconTap}
        >
          <ha-icon icon=${icon}></ha-icon>
        </button>
        <div class="text">
          <span class="primary" title=${name}>${name}</span>
          ${this._show("show_state")
            ? html`<span class="secondary"
                >${localizeState(this.hass, stateObj)}</span
              >`
            : nothing}
        </div>
      </ha-card>
    `;
  }
}

@customElement(EDITOR)
export class FaceplateTileCardEditor extends FaceplateEditor<FaceplateTileConfig> {
  protected defaults = { show_state: true, vertical: false };

  protected labels = {
    entity: "Entity (required)",
    name: "Name",
    icon: "Icon",
    show_state: "Show state",
    vertical: "Vertical layout",
    accent: "Accent colour",
    icon_tap_action: "Icon tap action",
    ...ACTION_LABELS,
  };

  protected helpers = {
    icon_tap_action:
      "Defaults to toggling, or running the script/scene. The rest of the row opens more-info",
  };

  protected schema(): HaFormSchema[] {
    return [
      { name: "entity", required: true, selector: { entity: {} } },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_state", selector: { boolean: {} } },
          { name: "vertical", selector: { boolean: {} } },
          { name: "accent", selector: { boolean: {} } },
        ],
      },
      {
        type: "expandable",
        title: "Actions",
        icon: "mdi:gesture-tap",
        schema: [
          { name: "icon_tap_action", selector: { ui_action: {} } },
          { name: "tap_action", selector: { ui_action: {} } },
          { name: "hold_action", selector: { ui_action: {} } },
          { name: "double_tap_action", selector: { ui_action: {} } },
        ],
      },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Tile",
  description:
    "An entity row with a tactile icon button, its name and its state in LCD type",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-tile-card": FaceplateTileCard;
    "faceplate-tile-card-editor": FaceplateTileCardEditor;
  }
}
