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
    return { columns: 6, rows, min_columns: 3, min_rows: 2 };
  }

  private get _on(): boolean {
    return this._stateObj?.state === "on";
  }

  private get _brightness(): number | undefined {
    const raw = this._stateObj?.attributes.brightness;
    return typeof raw === "number" ? Math.round((raw / 255) * 100) : undefined;
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
    this.hass!.callService("light", "turn_on", {
      entity_id: this._config!.entity,
      brightness_pct: ev.detail.value,
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
      /* The badge is a control, so it has to look like one: a round target
         big enough for a thumb, sitting in the title row. Plain rgba rather
         than color-mix — the Gen1 panels run a Chromium that predates it and
         would drop the declaration, leaving an invisible button. */
      .badge {
        width: 34px;
        height: 34px;
        justify-content: center;
        flex: none;
        border-radius: 50%;
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

    const showBrightness =
      config.show_brightness_control !== false &&
      this._supportsBrightness &&
      !unavailable;
    const showColorTemp =
      config.show_color_temp_control === true &&
      this._supportsColorTemp &&
      !unavailable;

    const minKelvin =
      stateObj.attributes.min_color_temp_kelvin ?? DEFAULT_MIN_KELVIN;
    const maxKelvin =
      stateObj.attributes.max_color_temp_kelvin ?? DEFAULT_MAX_KELVIN;

    return html`
      <ha-card>
        <div class=${classMap({ lcd: true, off: !this._on })}>
          <div class="lcd-top">
            <span class="name" title=${name}>${name}</span>
            <!-- The badge toggles rather than just reporting. On a tile with
                 the button row hidden it is the only control left, and a lit
                 bulb that cannot be pressed is a confusing thing to show. -->
            <button
              class=${classMap({ badge: true, on: this._on })}
              style=${styleMap(color ? { color } : {})}
              title=${this._on ? "Turn off" : "Turn on"}
              aria-label=${this._on ? "Turn off" : "Turn on"}
              .disabled=${unavailable}
              @click=${this._toggle}
            >
              <ha-icon class="bulb" icon=${icon}></ha-icon>
            </button>
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
                    label="Brightness"
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
                    label="Warmth"
                    unit="K"
                    .min=${minKelvin}
                    .max=${maxKelvin}
                    .step=${50}
                    .value=${stateObj.attributes.color_temp_kelvin ?? minKelvin}
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
  };

  protected helpers = {
    show_color_temp_control: "Only appears on lights that support colour temperature",
    show_controls: "Off leaves just the readout and sliders",
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
