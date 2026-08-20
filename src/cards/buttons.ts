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
  /**
   * Text rendered in place of the icon, in the metadata mono face — the
   * spec's numeral chips. A fan speed reads faster as "3" than as any glyph.
   */
  label?: string;
  /** Small mono caption under the icon — the OFF under a ceiling fan. */
  caption?: string;
  /**
   * Mark this one out from the rest of the row. Meant for the member of a set
   * that undoes the others — the Off at the head of a row of fan speeds, which
   * is otherwise the hardest thing in the row to pick out in a hurry.
   */
  danger?: boolean;
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

  private _timers = new Map<number, number>();
  private _held = new Set<number>();

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    for (const t of this._timers.values()) window.clearTimeout(t);
    this._timers.clear();
  }

  /** Hold, so a row can carry the pairs a single button carries — tap the fan
   *  light on, hold it off — instead of forcing those onto separate cards. */
  private _down(index: number, spec: FaceplateButtonSpec): void {
    if (!spec.hold_action) return;
    this._held.delete(index);
    this._timers.set(
      index,
      window.setTimeout(() => {
        this._held.add(index);
        if (this.hass) {
          handleAction(this, this.hass, { ...spec, type: CARD }, "hold");
        }
      }, 500)
    );
  }

  private _up(index: number): void {
    const timer = this._timers.get(index);
    if (timer !== undefined) {
      window.clearTimeout(timer);
      this._timers.delete(index);
    }
  }

  private _press(index: number, spec: FaceplateButtonSpec): void {
    // A hold has already fired; swallow the click that trails it.
    if (this._held.delete(index)) return;
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
      /* Inherits --faceplate-padding rather than setting its own: the frame
         around a card is the one thing the eye compares across a panel, and a
         row of controls framed at 6px beside a climate card framed at 10px
         reads as a mistake even when each card is fine alone. */
      ha-card {
        container-type: size;
        min-height: 48px;
        justify-content: center;
        /* Deliberately tighter than --faceplate-padding. A strip is all
           control and no content, so the frame earns less of the width here
           than it does around a readout, and the buttons take what it gives
           up. */
        padding: 2px 6px;
      }
      .row {
        display: flex;
        align-items: center;
        /* Flush to the padding at both ends, so the visible frame is the
           padding and not whatever width the squares happened to leave over. */
        justify-content: space-between;
        gap: 3px;
        width: 100%;
        height: 100%;
      }
      /* Square, sized by whichever of the tile's two dimensions runs out
         first. Height alone is not enough: on a two-row tile seven squares of
         the row's height are wider than the tile, and the overflow is clipped
         silently — the card showed five of seven buttons and looked deliberate
         doing it. Width alone stretches them into lozenges on a one-row tile.
         So: the smaller of the row's height and its fair share of the width. */
      /* Each button takes its fair share of the width and the whole of the
         height. Square was the old rule, and it wasted whatever the binding
         axis left over: seven buttons across a 480px panel cap at 62px wide,
         so a two-row strip drew 62px squares floating in a 112px card and
         gave back half the space it had asked for. */
      .row {
        --fp-w: calc(
          (100cqw - (var(--fp-count, 1) - 1) * 3px) / var(--fp-count, 1)
        );
      }
      .row .ctl {
        flex: 0 0 auto;
        width: var(--fp-w);
        /* Square, and no taller than the card. Which of the two binds depends
           on the strip: four buttons on a two-row tile are limited by height,
           seven on a one-row tile by width. Give a strip more rows than its
           buttons can use and the surplus shows as a band of card above and
           below them, so size the tile to the buttons, not the other way. */
        height: min(100%, var(--fp-w));
        max-width: none;
        /* The glyph is sized off the button, not the card. Off the card it
           tracked the card's short side, so a one-row row of seven buttons
           bottomed out on the 16px floor and drew postage stamps inside
           36px squares. The explicit width plus aspect-ratio gives this a
           definite size in both axes, which is what a size container needs. */
        container-type: size;
      }
      .ctl ha-icon {
        --mdc-icon-size: clamp(14px, 55cqmin, 34px);
      }
      /* The marked-out member of a set — the Off at the head of the fan
         speeds. Terracotta action treatment, not red: it is the "do
         something" accent, and red is reserved for the destructive. */
      .ctl.danger {
        color: var(--faceplate-action-active, var(--primary-color));
        background: var(--faceplate-action-fill-bg, rgba(183, 90, 51, 0.18));
        box-shadow: inset 0 0 0 1px var(--faceplate-action, var(--primary-color));
      }
      /* Numeral chips: the value is the label, in the metadata mono. */
      .ctl .num {
        font-family: var(--faceplate-mono, monospace);
        font-size: clamp(13px, 30cqmin, 17px);
        font-weight: 500;
        font-variant-numeric: tabular-nums;
      }
      .ctl .stack {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
      }
      .ctl .caption {
        font-family: var(--faceplate-mono, monospace);
        font-size: 9px;
        font-weight: 500;
        letter-spacing: 0.08em;
        line-height: 1;
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
        font-size: clamp(9px, 28cqmin, 17px);
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
        <div class="row" style="--fp-count: ${buttons.length}">
          ${buttons.map((spec, i) => {
            const on = this._isOn(spec);
            return html`<button
              class=${classMap({
                ctl: true,
                on,
                off: Boolean(spec.entity) && !on,
                danger: Boolean(spec.danger),
              })}
              title=${spec.name ?? ""}
              aria-label=${spec.name ?? spec.icon ?? "button"}
              style=${on
                ? "color: var(--state-active-color, var(--primary-color))"
                : ""}
              @click=${() => this._press(i, spec)}
              @pointerdown=${() => this._down(i, spec)}
              @pointerup=${() => this._up(i)}
              @pointerleave=${() => this._up(i)}
              @pointercancel=${() => this._up(i)}
              @contextmenu=${(e: Event) => e.preventDefault()}
            >
              ${spec.label
                ? html`<span class="num">${spec.label}</span>`
                : spec.caption
                  ? html`<span class="stack">
                      <ha-icon icon=${spec.icon}></ha-icon>
                      <span class="caption">${spec.caption}</span>
                    </span>`
                  : spec.icon_badge
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
