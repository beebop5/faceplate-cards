import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { FaceplateCard } from "../core/base-card";
import { FaceplateEditor, type HaFormSchema } from "../core/base-editor";
import { moreInfo } from "../core/actions";
import { formatNumber, friendlyName, prettify } from "../core/format";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig } from "../core/types";

const CARD = "faceplate-weather-card";
const EDITOR = "faceplate-weather-card-editor";

export interface FaceplateWeatherConfig extends FaceplateBaseConfig {
  show_current?: boolean;
  show_forecast?: boolean;
  forecast_type?: "daily" | "hourly" | "twice_daily";
  forecast_slots?: number;
  secondary_info?: Array<"humidity" | "wind" | "pressure" | "apparent">;
}

interface ForecastItem {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation_probability?: number;
}

/** Home Assistant's weather conditions, in the suite's icon set. */
const CONDITION_ICONS: Record<string, string> = {
  "clear-night": "mdi:weather-night",
  cloudy: "mdi:weather-cloudy",
  exceptional: "mdi:alert-circle-outline",
  fog: "mdi:weather-fog",
  hail: "mdi:weather-hail",
  lightning: "mdi:weather-lightning",
  "lightning-rainy": "mdi:weather-lightning-rainy",
  partlycloudy: "mdi:weather-partly-cloudy",
  pouring: "mdi:weather-pouring",
  rainy: "mdi:weather-rainy",
  snowy: "mdi:weather-snowy",
  "snowy-rainy": "mdi:weather-snowy-rainy",
  sunny: "mdi:weather-sunny",
  windy: "mdi:weather-windy",
  "windy-variant": "mdi:weather-windy-variant",
};

@customElement(CARD)
export class FaceplateWeatherCard extends FaceplateCard<FaceplateWeatherConfig> {
  protected static entityDomains = ["weather"];

  @state() private _forecast: ForecastItem[] = [];

  private _unsubscribe?: () => Promise<void>;
  private _subscribedTo?: string;

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(hass: {
    states: Record<string, unknown>;
  }): Partial<FaceplateWeatherConfig> {
    const entity = Object.keys(hass.states).find((e) => e.startsWith("weather."));
    return { entity: entity ?? "", show_forecast: true };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    return { columns: 12, rows: 2, min_columns: 4, min_rows: 1 };
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeForecast();
  }

  protected updated(): void {
    this._subscribeForecast();
  }

  private async _unsubscribeForecast(): Promise<void> {
    const unsub = this._unsubscribe;
    this._unsubscribe = undefined;
    this._subscribedTo = undefined;
    try {
      await unsub?.();
    } catch {
      /* the socket went away with the subscription */
    }
  }

  /**
   * Forecasts arrive by subscription rather than as an attribute — Home
   * Assistant stopped shipping `attributes.forecast` in 2024.4 because
   * pushing a full forecast into every state update was expensive. The
   * attribute is still read as a fallback for older integrations.
   */
  private async _subscribeForecast(): Promise<void> {
    const config = this._config;
    if (!this.hass?.connection || !config?.entity) return;
    if (config.show_forecast === false) {
      await this._unsubscribeForecast();
      return;
    }
    const key = `${config.entity}|${config.forecast_type ?? "daily"}`;
    if (this._subscribedTo === key) return;

    await this._unsubscribeForecast();
    this._subscribedTo = key;

    const fallback = this._stateObj?.attributes.forecast;
    if (Array.isArray(fallback)) this._forecast = fallback;

    try {
      this._unsubscribe = await this.hass.connection.subscribeMessage(
        (msg: { forecast?: ForecastItem[] }) => {
          if (msg.forecast) this._forecast = msg.forecast;
        },
        {
          type: "weather/subscribe_forecast",
          forecast_type: config.forecast_type ?? "daily",
          entity_id: config.entity,
        }
      );
    } catch {
      // An integration with no forecast support just leaves the strip empty.
      this._subscribedTo = undefined;
    }
  }

  private _icon(condition?: string): string {
    return CONDITION_ICONS[condition ?? ""] ?? "mdi:weather-cloudy";
  }

  private _slotLabel(item: ForecastItem): string {
    const date = new Date(item.datetime);
    if (Number.isNaN(date.getTime())) return "";
    const locale = this.hass?.locale?.language ?? this.hass?.language ?? "en";
    return this._config?.forecast_type === "hourly"
      ? new Intl.DateTimeFormat(locale, { hour: "numeric" }).format(date)
      : new Intl.DateTimeFormat(locale, { weekday: "short" }).format(date);
  }

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        cursor: pointer;
      }
      .lcd {
        gap: 4px;
      }
      .condition {
        --mdc-icon-size: 30px;
      }
      /* The forecast reads as a strip of segments across the bottom of the
         panel, the way a weather station prints its outlook. */
      .forecast {
        display: grid;
        grid-auto-flow: column;
        grid-auto-columns: 1fr;
        gap: 4px;
        align-self: stretch;
        margin-top: 4px;
        padding-top: 6px;
        border-top: 1px dashed var(--divider-color, rgba(0, 0, 0, 0.12));
      }
      .slot {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1px;
        min-width: 0;
      }
      .slot-label {
        font-size: 10px;
        color: var(--secondary-text-color);
        text-transform: uppercase;
        letter-spacing: 0.03em;
      }
      .slot ha-icon {
        --mdc-icon-size: 18px;
      }
      .slot-temps {
        font-size: 11px;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .slot-low {
        color: var(--secondary-text-color);
      }
      @container (max-width: 260px) {
        .slot-temps {
          font-size: 10px;
        }
      }
    `,
  ];

  protected render() {
    const guard = this._guard();
    if (guard !== null) return guard;
    const config = this._config!;
    const stateObj = this._stateObj!;

    const name = friendlyName(stateObj, config.name);
    const unit = stateObj.attributes.temperature_unit ?? "°";
    const temperature = stateObj.attributes.temperature;
    const condition = stateObj.state;

    const slots = (config.show_forecast === false ? [] : this._forecast).slice(
      0,
      config.forecast_slots ?? 5
    );

    return html`
      <ha-card @click=${() => moreInfo(this, config.entity!)}>
        <div class="lcd">
          ${config.show_current === false
            ? nothing
            : html`
                <div class="lcd-top">
                  <span class="name" title=${name}>${name}</span>
                  <span class="aux">${this._secondary(stateObj)}</span>
                </div>
                <div class="lcd-center">
                  <span class="readout">
                    ${typeof temperature === "number"
                      ? formatNumber(this.hass, temperature, 0)
                      : "--"}<span class="unit">${unit}</span>
                  </span>
                  <span class="badge">
                    <ha-icon
                      class="condition"
                      icon=${this._icon(condition)}
                    ></ha-icon>
                    <span>${prettify(condition)}</span>
                  </span>
                </div>
              `}
          ${slots.length
            ? html`<div class="forecast">
                ${slots.map(
                  (item) => html`<div class="slot">
                    <span class="slot-label">${this._slotLabel(item)}</span>
                    <ha-icon icon=${this._icon(item.condition)}></ha-icon>
                    <span class="slot-temps">
                      ${item.temperature === undefined
                        ? "--"
                        : formatNumber(this.hass, item.temperature, 0)}°${item.templow ===
                      undefined
                        ? nothing
                        : html`<span class="slot-low"
                            >/${formatNumber(this.hass, item.templow, 0)}°</span
                          >`}
                    </span>
                  </div>`
                )}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  /** The auxiliary line: whichever measurements the user asked for. */
  private _secondary(stateObj: { attributes: Record<string, any> }): string {
    const wanted = this._config?.secondary_info ?? ["humidity"];
    const parts: string[] = [];
    for (const key of wanted) {
      if (key === "humidity" && stateObj.attributes.humidity !== undefined) {
        parts.push(`Humidity ${Math.round(stateObj.attributes.humidity)}%`);
      }
      if (key === "wind" && stateObj.attributes.wind_speed !== undefined) {
        parts.push(
          `Wind ${formatNumber(this.hass, stateObj.attributes.wind_speed, 0)} ${
            stateObj.attributes.wind_speed_unit ?? ""
          }`.trim()
        );
      }
      if (key === "pressure" && stateObj.attributes.pressure !== undefined) {
        parts.push(
          `${formatNumber(this.hass, stateObj.attributes.pressure, 0)} ${
            stateObj.attributes.pressure_unit ?? ""
          }`.trim()
        );
      }
      if (
        key === "apparent" &&
        stateObj.attributes.apparent_temperature !== undefined
      ) {
        parts.push(
          `Feels ${formatNumber(
            this.hass,
            stateObj.attributes.apparent_temperature,
            0
          )}°`
        );
      }
    }
    return parts.join("   ");
  }
}

@customElement(EDITOR)
export class FaceplateWeatherCardEditor extends FaceplateEditor<FaceplateWeatherConfig> {
  protected defaults = {
    show_current: true,
    show_forecast: true,
    forecast_type: "daily",
    forecast_slots: 5,
  };

  protected labels = {
    entity: "Weather entity (required)",
    name: "Name",
    show_current: "Show current conditions",
    show_forecast: "Show forecast",
    forecast_type: "Forecast type",
    forecast_slots: "Forecast slots",
    secondary_info: "Auxiliary readouts",
  };

  protected helpers = {
    forecast_slots: "How many days or hours to show across the strip",
    secondary_info: "Shown on the top line beside the name",
  };

  protected schema(): HaFormSchema[] {
    return [
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "weather" } },
      },
      { name: "name", selector: { text: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_current", selector: { boolean: {} } },
          { name: "show_forecast", selector: { boolean: {} } },
          {
            name: "forecast_type",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "daily", label: "Daily" },
                  { value: "hourly", label: "Hourly" },
                  { value: "twice_daily", label: "Twice daily" },
                ],
              },
            },
          },
          {
            name: "forecast_slots",
            selector: { number: { min: 1, max: 10, mode: "box" } },
          },
        ],
      },
      {
        name: "secondary_info",
        selector: {
          select: {
            multiple: true,
            mode: "list",
            options: [
              { value: "humidity", label: "Humidity" },
              { value: "wind", label: "Wind" },
              { value: "pressure", label: "Pressure" },
              { value: "apparent", label: "Feels like" },
            ],
          },
        },
      },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Weather",
  description: "Current conditions and a forecast strip, in LCD type",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-weather-card": FaceplateWeatherCard;
    "faceplate-weather-card-editor": FaceplateWeatherCardEditor;
  }
}
