import { html, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import { FaceplateCard } from "../core/base-card";
import { FaceplateEditor, type HaFormSchema } from "../core/base-editor";
import { moreInfo } from "../core/actions";
import { friendlyName } from "../core/format";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import "../core/slider";
import type { FaceplateBaseConfig } from "../core/types";

const CARD = "faceplate-light-card";
const EDITOR = "faceplate-light-card-editor";

export interface FaceplateLightConfig extends FaceplateBaseConfig {
  show_state?: boolean;
  show_brightness_control?: boolean;
  show_color_temp_control?: boolean;
  /** Tint the readout and the slider with the light's own colour. */
  use_light_color?: boolean;
  show_controls?: boolean;
  /**
   * The on/off bulb beside the slider. Worth dropping where the slider is the
   * whole point and zero already means off — a strip of brightness sliders
   * reads as sliders, not as sliders each with a switch stapled to the end.
   */
  show_toggle?: boolean;
  /**
   * The span of the light's output, as percentages, that the card's own 0-100%
   * covers. `max_brightness: 60` makes the card's full scale 60% output.
   *
   * The card's range is rescaled onto the span rather than clipped at its ends,
   * so the slider stays useful over its whole travel — clipping would leave
   * part of the slider dead, every position in it meaning the same brightness.
   */
  min_brightness?: number;
  max_brightness?: number;
  /**
   * Narrow the warmth slider to this Kelvin span. Both are clamped to what the
   * light actually supports: a slider offering a temperature the bulb cannot
   * reach just sends a value the integration silently rounds away.
   */
  min_color_temp_kelvin?: number;
  max_color_temp_kelvin?: number;
}

/** Kelvin values the mired-era `color_temp` attribute maps onto, used only
 *  when an integration reports no Kelvin range of its own. */
const DEFAULT_MIN_KELVIN = 2000;
const DEFAULT_MAX_KELVIN = 6535;

@customElement(CARD)
export class FaceplateLightCard extends FaceplateCard<FaceplateLightConfig> {
  protected static entityDomains = ["light"];

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(hass: {
    states: Record<string, unknown>;
  }): Partial<FaceplateLightConfig> {
    const entity = Object.keys(hass.states).find((e) => e.startsWith("light."));
    return { entity: entity ?? "", show_brightness_control: true };
  }

  public getCardSize(): number {
    return 2;
  }

  public getGridOptions() {
    // Four rows: the readout, two sliders and the button row do not fit in
    // three, and a slider pushed out of its tile is silently unusable. Hiding
    // the readout gives one back — the sliders already show their own values,
    // so on a crowded panel it is duplicated height rather than information.
    let rows = this._config?.show_color_temp_control ? 4 : 3;
    if (this._config?.show_state === false) rows -= 1;
    if (this._config?.show_controls === false) rows -= 1;
    // Stripped to a name and one slider, the card is a strip and a two-row
    // floor is just padding — several of them stacked push everything else off
    // a panel. The floor only protects layouts that still have something to
    // protect.
    const bare =
      this._config?.show_state === false && this._config?.show_controls === false;
    return {
      columns: 6,
      rows: Math.max(1, rows),
      min_columns: 3,
      min_rows: bare ? 1 : 2,
    };
  }

  private get _on(): boolean {
    return this._stateObj?.state === "on";
  }

  /** The span of real output the card's 0-100% covers, as percentages.
   *
   *  A span that is inverted or empty is ignored rather than obeyed: it would
   *  divide by zero below, and a card that renders nothing usable is a worse
   *  answer to a typo than a card that ignores it. */
  private get _brightnessRange(): { min: number; max: number } {
    const clamp = (v: unknown) =>
      typeof v === "number" && v >= 0 && v <= 100 ? v : undefined;
    const min = clamp(this._config?.min_brightness) ?? 0;
    const max = clamp(this._config?.max_brightness) ?? 100;
    return max > min ? { min, max } : { min: 0, max: 100 };
  }

  /** What the card shows: where the light sits within the configured span.
   *
   *  Something outside the card can still drive the light past either end —
   *  an automation, the Home Assistant app — so this is held inside 0-100
   *  rather than allowed to read past full or below empty. */
  private get _brightness(): number | undefined {
    const raw = this._stateObj?.attributes.brightness;
    if (typeof raw !== "number") return undefined;
    const { min, max } = this._brightnessRange;
    const actual = (raw / 255) * 100;
    return Math.min(100, Math.max(0, Math.round(((actual - min) / (max - min)) * 100)));
  }

  /** The warmth slider's ends: the config's span, held inside what the light
   *  reports it can actually do. */
  private get _kelvinRange(): { min: number; max: number } {
    const entityMin =
      this._stateObj?.attributes.min_color_temp_kelvin ?? DEFAULT_MIN_KELVIN;
    const entityMax =
      this._stateObj?.attributes.max_color_temp_kelvin ?? DEFAULT_MAX_KELVIN;
    const wantMin = this._config?.min_color_temp_kelvin;
    const wantMax = this._config?.max_color_temp_kelvin;

    const min = typeof wantMin === "number" ? Math.max(entityMin, wantMin) : entityMin;
    const max = typeof wantMax === "number" ? Math.min(entityMax, wantMax) : entityMax;
    return max > min ? { min, max } : { min: entityMin, max: entityMax };
  }

  private get _supportsBrightness(): boolean {
    const modes: string[] = this._stateObj?.attributes.supported_color_modes ?? [];
    return modes.some((m) => m !== "onoff" && m !== "unknown");
  }

  private get _supportsColorTemp(): boolean {
    const modes: string[] = this._stateObj?.attributes.supported_color_modes ?? [];
    return modes.includes("color_temp");
  }

  /** The light's current colour, for tinting. Undefined means "use the theme". */
  private get _lightColor(): string | undefined {
    if (this._config?.use_light_color === false || !this._on) return undefined;
    const rgb = this._stateObj?.attributes.rgb_color;
    if (Array.isArray(rgb) && rgb.length >= 3) {
      return `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
    }
    const kelvin = this._stateObj?.attributes.color_temp_kelvin;
    if (typeof kelvin === "number") return kelvinToCss(kelvin);
    return undefined;
  }

  private _toggle = (): void => {
    this.hass!.callService("light", "toggle", {
      entity_id: this._config!.entity,
    });
  };

  private _setBrightness = (ev: CustomEvent<{ value: number }>): void => {
    const { min, max } = this._brightnessRange;
    this.hass!.callService("light", "turn_on", {
      entity_id: this._config!.entity,
      brightness_pct: min + ((max - min) * ev.detail.value) / 100,
    });
  };

  private _setColorTemp = (ev: CustomEvent<{ value: number }>): void => {
    this.hass!.callService("light", "turn_on", {
      entity_id: this._config!.entity,
      color_temp_kelvin: Math.round(ev.detail.value),
    });
  };

  static styles = [
    ...faceplateStyles,
    css`
      /* The badge is a control, so it has to look like one: a target
         big enough for a thumb, sitting in the title row. Plain rgba rather
         than color-mix — the Gen1 panels run a Chromium that predates it and
         would drop the declaration, leaving an invisible button. */
      .badge {
        width: 34px;
        height: 34px;
        justify-content: center;
        flex: none;
        border-radius: var(--faceplate-control-radius);
        background: rgba(127, 127, 127, 0.16);
        transition: background 0.15s;
      }
      .badge.on {
        background: rgba(255, 255, 255, 0.13);
      }
      .badge:hover:not(:disabled) {
        background: rgba(127, 127, 127, 0.3);
      }
      .badge ha-icon {
        --mdc-icon-size: 20px;
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: none;
      }
      /* A strip is the slider and the on/off badge, side by side, with no
         recessed panel around them: the panel's padding and the title row are
         exactly what stopped this fitting a single row. */
      ha-card.strip {
        --faceplate-padding: 6px;
        flex-direction: row;
        align-items: center;
        gap: 8px;
      }
      ha-card.strip .lcd {
        display: contents;
      }
      ha-card.strip .lcd-top {
        display: contents;
      }
      ha-card.strip .name {
        display: none;
      }
      ha-card.strip .sliders {
        flex: 1 1 auto;
        min-width: 0;
      }
      ha-card.strip .badge {
        order: 2;
      }
      /* On a tile too short for everything, the readout gives up its height
         before the sliders do — a clipped number is still readable, a slider
         pushed out of the card is not usable at all. */
      .lcd {
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
      }
      .bulb {
        --mdc-icon-size: 22px;
      }
      .off-label {
        font-size: 20px;
        font-weight: 300;
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
      @container (max-width: 200px) {
        faceplate-slider {
          --faceplate-slider-height: 36px;
        }
      }
    `,
  ];

  protected render() {
    const guard = this._guard();
    if (guard !== null) return guard;
    const config = this._config!;
    const stateObj = this._stateObj!;

    const unavailable = stateObj.state === "unavailable";
    const name = friendlyName(stateObj, config.name);
    const color = this._lightColor;
    const brightness = this._brightness;
    const icon =
      config.icon ??
      stateObj.attributes.icon ??
      (this._on ? "mdi:lightbulb" : "mdi:lightbulb-outline");

    // With the readout and buttons hidden the card is one slider; the name
    // rides inside it rather than taking a line of its own, which is the
    // difference between fitting one grid row and clipping in two.
    const strip =
      config.show_state === false && config.show_controls === false;

    const showBrightness =
      config.show_brightness_control !== false &&
      this._supportsBrightness &&
      !unavailable;
    const showColorTemp =
      config.show_color_temp_control === true &&
      this._supportsColorTemp &&
      !unavailable;

    const { min: minKelvin, max: maxKelvin } = this._kelvinRange;

    // Held inside the slider's own ends: something else may have set a
    // temperature the narrowed range excludes, and a handle parked off the
    // track reads as a broken control.
    const kelvinValue = Math.min(
      maxKelvin,
      Math.max(minKelvin, stateObj.attributes.color_temp_kelvin ?? minKelvin)
    );

    return html`
      <ha-card class=${classMap({ strip })}>
        <div class=${classMap({ lcd: true, off: !this._on })}>
          <div class="lcd-top">
            <span class="name" title=${name}>${name}</span>
            <!-- The badge toggles rather than just reporting. On a tile with
                 the button row hidden it is the only control left, and a lit
                 bulb that cannot be pressed is a confusing thing to show. -->
            ${this._show("show_toggle")
              ? html`<button
              class=${classMap({ badge: true, on: this._on })}
              style=${styleMap(color ? { color } : {})}
              title=${this._on ? "Turn off" : "Turn on"}
              aria-label=${this._on ? "Turn off" : "Turn on"}
              .disabled=${unavailable}
              @click=${this._toggle}
                >
                  <ha-icon class="bulb" icon=${icon}></ha-icon>
                </button>`
              : nothing}
          </div>
          ${this._show("show_state")
            ? html`<div class="lcd-center">
                ${unavailable
                  ? html`<span class="off-label">Unavailable</span>`
                  : this._on
                    ? brightness === undefined
                      ? html`<span class="readout">On</span>`
                      : html`<span class="readout"
                          >${brightness}<span class="unit">%</span></span
                        >`
                    : html`<span class="off-label">Off</span>`}
              </div>`
            : nothing}
        </div>

        ${showBrightness || showColorTemp
          ? html`<div class="sliders">
              ${showBrightness
                ? html`<faceplate-slider
                    label=${strip ? name : "Brightness"}
                    unit="%"
                    min="1"
                    max="100"
                    .value=${brightness ?? 0}
                    .disabled=${!this._on}
                    .fill=${color ?? ""}
                    @slider-change=${this._setBrightness}
                  ></faceplate-slider>`
                : nothing}
              ${showColorTemp
                ? html`<faceplate-slider
                    label=${strip ? name : "Warmth"}
                    unit="K"
                    .min=${minKelvin}
                    .max=${maxKelvin}
                    .step=${50}
                    .value=${kelvinValue}
                    .disabled=${!this._on}
                    .gradient=${`linear-gradient(to right, ${kelvinToCss(
                      minKelvin
                    )}, ${kelvinToCss(
                      (minKelvin + maxKelvin) / 2
                    )}, ${kelvinToCss(maxKelvin)})`}
                    @slider-change=${this._setColorTemp}
                  ></faceplate-slider>`
                : nothing}
            </div>`
          : nothing}

        ${this._show("show_controls")
          ? html`<div class="controls">
              <button
                class=${classMap({
                  ctl: true,
                  on: this._on,
                  off: !this._on,
                })}
                title="Power"
                style=${styleMap(color ? { color } : {})}
                .disabled=${unavailable}
                @click=${this._toggle}
              >
                <ha-icon icon="mdi:power"></ha-icon>
              </button>
              <button
                class="ctl"
                title="Details"
                @click=${() => moreInfo(this, config.entity!)}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>
            </div>`
          : nothing}
      </ha-card>
    `;
  }
}

/**
 * Approximate a colour temperature as CSS, for tinting and for the warmth
 * slider's gradient. Close enough to read as "warm" through "cool"; this is
 * decoration, not colour management.
 */
function kelvinToCss(kelvin: number): string {
  const t = Math.min(6600, Math.max(1000, kelvin)) / 100;
  const clamp = (v: number) => Math.round(Math.min(255, Math.max(0, v)));

  const red = t <= 66 ? 255 : clamp(329.7 * Math.pow(t - 60, -0.1332));
  const green =
    t <= 66
      ? clamp(99.47 * Math.log(t) - 161.12)
      : clamp(288.12 * Math.pow(t - 60, -0.0755));
  const blue =
    t >= 66 ? 255 : t <= 19 ? 0 : clamp(138.52 * Math.log(t - 10) - 305.04);

  return `rgb(${red}, ${green}, ${blue})`;
}

@customElement(EDITOR)
export class FaceplateLightCardEditor extends FaceplateEditor<FaceplateLightConfig> {
  protected defaults = {
    show_state: true,
    show_brightness_control: true,
    show_color_temp_control: false,
    use_light_color: true,
    show_controls: true,
  };

  protected labels = {
    entity: "Light entity (required)",
    name: "Name",
    icon: "Icon",
    show_brightness_control: "Brightness slider",
    show_color_temp_control: "Warmth slider",
    use_light_color: "Tint with the light's colour",
    show_controls: "Show buttons",
    min_brightness: "Brightness floor (%)",
    max_brightness: "Brightness ceiling (%)",
    min_color_temp_kelvin: "Warmest (K)",
    max_color_temp_kelvin: "Coolest (K)",
  };

  protected helpers = {
    show_color_temp_control: "Only appears on lights that support colour temperature",
    show_controls: "Off leaves just the readout and sliders",
    max_brightness:
      "The span the card's own 0-100% covers. A ceiling of 60 makes the card's 100% equal 60% output, rescaling the whole slider rather than clipping its top",
    max_color_temp_kelvin:
      "Narrows the warmth slider. Both ends are held inside what the light actually supports",
  };

  protected schema(): HaFormSchema[] {
    return [
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "light" } },
      },
      { name: "name", selector: { text: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_brightness_control", selector: { boolean: {} } },
          { name: "show_color_temp_control", selector: { boolean: {} } },
          { name: "use_light_color", selector: { boolean: {} } },
          { name: "show_controls", selector: { boolean: {} } },
        ],
      },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "min_brightness",
            selector: { number: { min: 0, max: 100, step: 1, mode: "box" } },
          },
          {
            name: "max_brightness",
            selector: { number: { min: 0, max: 100, step: 1, mode: "box" } },
          },
          {
            name: "min_color_temp_kelvin",
            selector: { number: { min: 1000, max: 10000, step: 50, mode: "box" } },
          },
          {
            name: "max_color_temp_kelvin",
            selector: { number: { min: 1000, max: 10000, step: 50, mode: "box" } },
          },
        ],
      },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Light",
  description:
    "Light control with a recessed brightness slider and a tactile power button",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-light-card": FaceplateLightCard;
    "faceplate-light-card-editor": FaceplateLightCardEditor;
  }
}
