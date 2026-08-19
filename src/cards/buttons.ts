import { html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { handleAction } from "../core/actions";
import { FaceplateCard } from "../core/base-card";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig, HomeAssistant } from "../core/types";

const CARD = "faceplate-buttons-card";

/**
 * One button in the row. Not a card, so it carries no `type` — everything else
 * is the usual entity/icon/action shape the other cards accept.
 */
export interface FaceplateButtonSpec extends Omit<FaceplateBaseConfig, "type"> {
  /** A digit set into the icon's corner, as on the button card. */
  icon_badge?: string;
}

export interface FaceplateButtonsConfig extends FaceplateBaseConfig {
  buttons: FaceplateButtonSpec[];
}

/**
 * A row of buttons that stays a row.
 *
 * Home Assistant's grid divides a section into twelve columns, so a set that
 * does not divide into twelve cannot sit on one line: seven fan speeds laid
 * out as individual cards wrap four and three, or six and a stranded one. This
 * card owns the whole width and splits it evenly between however many buttons
 * it is given, so a fan's Off plus six speeds read as one control rather than
 * two rows of tiles that happen to be adjacent.
 */
@customElement(CARD)
export class FaceplateButtonsCard extends FaceplateCard<FaceplateButtonsConfig> {
  protected static requiresEntity = false;

  public static getStubConfig(): Partial<FaceplateButtonsConfig> {
    return {
      buttons: [
        { icon: "mdi:fan-off", tap_action: { action: "none" } },
        { icon: "mdi:fan", icon_badge: "1", tap_action: { action: "none" } },
      ],
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return { columns: 12, rows: 2, min_columns: 6, min_rows: 1 };
  }

  public setConfig(config: FaceplateButtonsConfig): void {
    if (!Array.isArray(config?.buttons) || config.buttons.length === 0) {
      throw new Error("Define at least one button");
    }
    super.setConfig(config);
  }

  private _press(spec: FaceplateButtonSpec): void {
    // handleAction wants a card config; a button spec is the same shape minus
    // the type discriminator, which it never reads.
    if (this.hass) {
      handleAction(this, this.hass, { ...spec, type: CARD }, "tap");
    }
  }

  private _isOn(spec: FaceplateButtonSpec): boolean {
    if (!spec.entity) return false;
    const state = this.hass?.states?.[spec.entity]?.state;
    return state === "on" || state === "open";
  }

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        container-type: size;
        min-height: 48px;
        justify-content: center;
        padding: 6px;
      }
      .row {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        gap: 4px;
        width: 100%;
        height: 100%;
      }
      /* Square, sized from the row's height, spread across its width. Letting
         them take an equal share of the width instead stretches them into
         lozenges on a one-row tile — seven buttons across 480px is 62 wide
         against 44 tall — and a button that is not square stops reading as a
         button. Squares with the slack between them look deliberate. */
      .row .ctl {
        flex: 0 0 auto;
        height: 100%;
        width: auto;
        max-width: none;
        aspect-ratio: 1;
      }
      .ctl ha-icon {
        --mdc-icon-size: clamp(16px, 34cqmin, 34px);
      }
      .glyph {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .glyph-badge {
        position: absolute;
        right: -14%;
        bottom: -6%;
        font-size: clamp(9px, 17cqmin, 17px);
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
        text-shadow: 0 0 3px var(--faceplate-lcd-background, rgba(0, 0, 0, 0.6));
      }
    `,
  ];

  protected render() {
    if (!this.hass || !this._config) return nothing;
    const buttons = this._config.buttons;

    return html`
      <ha-card>
        <div class="row">
          ${buttons.map((spec) => {
            const on = this._isOn(spec);
            return html`<button
              class=${classMap({ ctl: true, on, off: Boolean(spec.entity) && !on })}
              title=${spec.name ?? ""}
              aria-label=${spec.name ?? spec.icon ?? "button"}
              @click=${() => this._press(spec)}
            >
              ${spec.icon_badge
                ? html`<span class="glyph">
                    <ha-icon icon=${spec.icon}></ha-icon>
                    <span class="glyph-badge">${spec.icon_badge}</span>
                  </span>`
                : html`<ha-icon icon=${spec.icon}></ha-icon>`}
            </button>`;
          })}
        </div>
      </ha-card>
    `;
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Buttons",
  description:
    "A row of buttons that stays on one line, for sets that do not divide into the grid's twelve columns",
});

declare global {
  interface HTMLElementTagNameMap {
    [CARD]: FaceplateButtonsCard;
  }
}

export type { HomeAssistant };
