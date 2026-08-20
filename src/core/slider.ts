import { LitElement, html, css, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

/**
 * A recessed slider in the Faceplate idiom: the same inset well as the LCD,
 * filled to the current value.
 *
 * Built for gloved thumbs on a wall panel, so it is deliberately tall, has no
 * knob to hit (press anywhere on the track), and only reports a value on
 * release — dragging across a bar fires hundreds of intermediate values, and
 * a dimmer that tries to follow each one over the network stutters.
 */
@customElement("faceplate-slider")
export class FaceplateSlider extends LitElement {
  @property({ type: Number }) public value = 0;
  @property({ type: Number }) public min = 0;
  @property({ type: Number }) public max = 100;
  @property({ type: Number }) public step = 1;
  @property({ type: Boolean }) public disabled = false;
  @property({ type: String }) public label?: string;
  @property({ type: String }) public unit = "";
  /** CSS colour for the filled portion. */
  @property({ type: String }) public fill?: string;
  /** A gradient painted along the track instead of a flat fill. */
  @property({ type: String }) public gradient?: string;
  @property({ type: Boolean, attribute: "hide-value" }) public hideValue = false;

  /** While dragging, show the finger's position rather than the entity's. */
  @state() private _dragValue?: number;

  private _pointerId?: number;

  static styles = css`
    :host {
      display: block;
    }
    .track {
      position: relative;
      height: var(--faceplate-slider-height, 42px);
      border-radius: var(--faceplate-control-radius, 10px);
      background: var(--card-background-color, var(--secondary-background-color));
      box-shadow: inset 0 0 0 1px
        var(--faceplate-border, var(--divider-color, rgba(127, 127, 127, 0.3)));
      box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.12);
      overflow: hidden;
      cursor: pointer;
      touch-action: none;
      -webkit-user-select: none;
      user-select: none;
    }
    .track.disabled {
      opacity: 0.45;
      cursor: not-allowed;
    }
    .fill {
      position: absolute;
      inset: 0 auto 0 0;
      /* Terracotta into brass along the travel, per the spec — the two theme
         accents, so a palette change recolours every slider at once. */
      background: var(
        --faceplate-slider-fill,
        linear-gradient(
          90deg,
          var(--slider-color, #b75a33),
          var(--slider-secondary-color, #c89a4b)
        )
      );
      transition: width 0.12s ease-out;
    }
    .track.dragging .fill {
      transition: none;
    }
    .gradient {
      position: absolute;
      inset: 0;
      background: var(--faceplate-slider-gradient);
    }
    /* A notch marking the value on a gradient track, where a fill would hide
       the very colours the user is choosing between. */
    .marker {
      position: absolute;
      top: 0;
      bottom: 0;
      width: 4px;
      margin-left: -2px;
      border-radius: 2px;
      background: var(--primary-text-color);
      box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.25);
      transition: left 0.12s ease-out;
    }
    .track.dragging .marker {
      transition: none;
    }
    .content {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0 8px;
      pointer-events: none;
      font-size: 13px;
      font-weight: 500;
    }
    /* The label and value sit over whatever the track happens to be showing —
       the empty well, a fill in the light's own colour, or the pale end of the
       warmth gradient. No single text colour is readable on all three, so each
       gets its own scrim and is always set in white, the way a legend is
       printed onto an appliance's slider. */
    .content span {
      background: rgba(0, 0, 0, 0.4);
      font-family: var(--faceplate-mono, ui-monospace, monospace);
      font-variant-numeric: tabular-nums;
      color: #fff;
      padding: 2px 7px;
      border-radius: 7px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .content span:empty {
      display: none;
    }
    .value {
      font-variant-numeric: tabular-nums;
    }
  `;

  private get _shown(): number {
    return this._dragValue ?? this.value;
  }

  private _valueFromEvent(ev: PointerEvent): number {
    const rect = this.renderRoot
      .querySelector(".track")!
      .getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (ev.clientX - rect.left) / rect.width));
    const raw = this.min + ratio * (this.max - this.min);
    const stepped = Math.round(raw / this.step) * this.step;
    // Rounding to the step can push a value a hair outside the range.
    return Math.min(this.max, Math.max(this.min, stepped));
  }

  private _down = (ev: PointerEvent): void => {
    if (this.disabled) return;
    ev.preventDefault();
    this._pointerId = ev.pointerId;
    (ev.target as HTMLElement).setPointerCapture(ev.pointerId);
    this._dragValue = this._valueFromEvent(ev);
  };

  private _move = (ev: PointerEvent): void => {
    if (this.disabled || this._pointerId !== ev.pointerId) return;
    this._dragValue = this._valueFromEvent(ev);
  };

  private _up = (ev: PointerEvent): void => {
    if (this.disabled || this._pointerId !== ev.pointerId) return;
    const value = this._valueFromEvent(ev);
    this._pointerId = undefined;
    this._dragValue = undefined;
    this.value = value;
    this.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
  };

  private _cancel = (): void => {
    this._pointerId = undefined;
    this._dragValue = undefined;
  };

  protected render() {
    const span = this.max - this.min || 1;
    const ratio = Math.min(1, Math.max(0, (this._shown - this.min) / span));
    const percent = `${(ratio * 100).toFixed(1)}%`;

    return html`
      <div
        class=${classMap({
          track: true,
          disabled: this.disabled,
          dragging: this._dragValue !== undefined,
        })}
        style=${this.fill ? `--faceplate-slider-fill:${this.fill}` : ""}
        role="slider"
        aria-label=${this.label ?? ""}
        aria-valuemin=${this.min}
        aria-valuemax=${this.max}
        aria-valuenow=${this._shown}
        @pointerdown=${this._down}
        @pointermove=${this._move}
        @pointerup=${this._up}
        @pointercancel=${this._cancel}
      >
        ${this.gradient
          ? html`<div
                class="gradient"
                style=${`--faceplate-slider-gradient:${this.gradient}`}
              ></div>
              <div class="marker" style=${`left:${percent}`}></div>`
          : html`<div class="fill" style=${`width:${percent}`}></div>`}
        <div class="content">
          <span>${this.label ?? ""}</span>
          ${this.hideValue
            ? nothing
            : html`<span class="value"
                >${Math.round(this._shown)}${this.unit}</span
              >`}
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-slider": FaceplateSlider;
  }
}
