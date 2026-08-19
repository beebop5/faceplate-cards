import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FaceplateCard } from "../core/base-card";
import { FaceplateEditor, type HaFormSchema } from "../core/base-editor";
import { moreInfo } from "../core/actions";
import { formatNumber, prettify } from "../core/format";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig } from "../core/types";

const CARD = "faceplate-header-card";
const EDITOR = "faceplate-header-card-editor";

export interface FaceplateHeaderConfig extends FaceplateBaseConfig {
  weather_entity?: string;
  time_format?: "12" | "24" | "auto";
  show_seconds?: boolean;
  show_date?: boolean;
  show_condition?: boolean;
  time_zone?: string;
  text_only?: boolean;
}

/** Home Assistant's weather conditions in the suite's icon set. */
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

/**
 * The panel's title bar: time, date and what it is doing outside, on one line.
 *
 * A wall panel can spare exactly one row for "where am I and what time is it",
 * and three separate cards spend three. This is that row — the clock's figures
 * and the weather card's reading composed together, sized so it still fits at
 * 480px with a full dashboard underneath.
 */
@customElement(CARD)
export class FaceplateHeaderCard extends FaceplateCard<FaceplateHeaderConfig> {
  protected static requiresEntity = false;

  @state() private _now = new Date();

  private _timer?: number;

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(hass: {
    states: Record<string, unknown>;
  }): Partial<FaceplateHeaderConfig> {
    const weather = Object.keys(hass.states).find((e) => e.startsWith("weather."));
    return { weather_entity: weather, show_date: true, text_only: true };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return { columns: 12, rows: 1, min_columns: 6, min_rows: 1 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._schedule();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._timer);
  }

  /** Tick on the boundary, not every second — see the clock card. */
  private _schedule(): void {
    window.clearTimeout(this._timer);
    const now = new Date();
    this._now = now;
    const period = this._config?.show_seconds ? 1000 : 60000;
    this._timer = window.setTimeout(
      () => this._schedule(),
      period - (now.getTime() % period) + 20
    );
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    if (changed.has("_config")) this._schedule();
  }

  private get _hour12(): boolean | undefined {
    const format = this._config?.time_format ?? "auto";
    if (format === "12") return true;
    if (format === "24") return false;
    const fromHass = this.hass?.locale?.time_format;
    if (fromHass === "12") return true;
    if (fromHass === "24") return false;
    return undefined;
  }

  private get _locale(): string {
    return this.hass?.locale?.language ?? this.hass?.language ?? "en";
  }

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 4px 12px;
      }
      ha-card.text-only {
        background: none;
        border: none;
        box-shadow: none;
        padding: 2px 6px;
      }
      .clock {
        display: flex;
        align-items: baseline;
        gap: 10px;
        min-width: 0;
      }
      .time {
        font-size: var(--faceplate-header-time, 26px);
        font-weight: 500;
        line-height: 1.1;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.01em;
      }
      .meridiem {
        font-size: 0.5em;
        opacity: 0.75;
        margin-left: 3px;
      }
      .date {
        font-size: 14px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      /* The weather sits hard right so the clock's left edge never moves as
         the temperature gains or loses a digit. */
      .weather {
        display: flex;
        align-items: center;
        gap: 6px;
        flex: none;
        cursor: pointer;
      }
      .weather ha-icon {
        --mdc-icon-size: 22px;
      }
      .temp {
        font-size: 17px;
        font-weight: 500;
        font-variant-numeric: tabular-nums;
        white-space: nowrap;
      }
      .condition {
        font-size: 13px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      /* Narrow panels give up the words before the numbers. */
      @container (max-width: 420px) {
        .condition {
          display: none;
        }
      }
      @container (max-width: 330px) {
        ha-card {
          --faceplate-header-time: 22px;
        }
        .date {
          font-size: 12px;
        }
      }
      @container (max-width: 250px) {
        .date {
          display: none;
        }
      }
    `,
  ];

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const config = this._config;
    const zone = config.time_zone;

    const parts = new Intl.DateTimeFormat(this._locale, {
      hour: "2-digit",
      minute: "2-digit",
      ...(config.show_seconds ? { second: "2-digit" } : {}),
      ...(this._hour12 === undefined ? {} : { hour12: this._hour12 }),
      ...(zone ? { timeZone: zone } : {}),
    }).formatToParts(this._now);

    const meridiem = parts.find((p) => p.type === "dayPeriod")?.value;
    const time = parts
      .filter((p) => p.type !== "dayPeriod" && p.type !== "literal")
      .map((p) => p.value)
      .join(":");

    const date = this._show("show_date")
      ? new Intl.DateTimeFormat(this._locale, {
          weekday: "short",
          day: "numeric",
          month: "short",
          ...(zone ? { timeZone: zone } : {}),
        }).format(this._now)
      : undefined;

    const weather = config.weather_entity
      ? this.hass.states[config.weather_entity]
      : undefined;
    const temperature = weather?.attributes.temperature;
    const unit = weather?.attributes.temperature_unit ?? "°";

    return html`
      <ha-card class=${classMap({ "text-only": Boolean(config.text_only) })}>
        <div class="clock">
          <span class="time"
            >${time}${meridiem
              ? html`<span class="meridiem">${meridiem}</span>`
              : nothing}</span
          >
          ${date ? html`<span class="date">${date}</span>` : nothing}
        </div>
        ${weather
          ? html`<div
              class="weather"
              title=${prettify(weather.state)}
              @click=${() => moreInfo(this, config.weather_entity!)}
            >
              <ha-icon
                icon=${CONDITION_ICONS[weather.state] ?? "mdi:weather-cloudy"}
              ></ha-icon>
              ${typeof temperature === "number"
                ? html`<span class="temp"
                    >${formatNumber(this.hass, temperature, 0)}${unit}</span
                  >`
                : nothing}
              ${config.show_condition === false
                ? nothing
                : html`<span class="condition">${prettify(weather.state)}</span>`}
            </div>`
          : nothing}
      </ha-card>
    `;
  }
}

@customElement(EDITOR)
export class FaceplateHeaderCardEditor extends FaceplateEditor<FaceplateHeaderConfig> {
  protected defaults = {
    time_format: "auto",
    show_seconds: false,
    show_date: true,
    show_condition: true,
    text_only: true,
  };

  protected labels = {
    weather_entity: "Weather entity",
    time_format: "Time format",
    show_seconds: "Show seconds",
    show_date: "Show date",
    show_condition: "Show condition",
    time_zone: "Time zone",
    text_only: "No card background",
  };

  protected helpers = {
    weather_entity: "Leave empty for a clock-only header",
    show_condition: "The word beside the temperature; hidden automatically on narrow panels",
    text_only: "Renders straight onto the view, like a title bar",
  };

  protected schema(): HaFormSchema[] {
    return [
      { name: "weather_entity", selector: { entity: { domain: "weather" } } },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "time_format",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "auto", label: "Auto" },
                  { value: "12", label: "12 hour" },
                  { value: "24", label: "24 hour" },
                ],
              },
            },
          },
          { name: "show_seconds", selector: { boolean: {} } },
          { name: "show_date", selector: { boolean: {} } },
          { name: "show_condition", selector: { boolean: {} } },
          { name: "text_only", selector: { boolean: {} } },
        ],
      },
      { name: "time_zone", selector: { text: {} } },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Header",
  description: "Panel title bar: time, date and current weather on one line",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-header-card": FaceplateHeaderCard;
    "faceplate-header-card-editor": FaceplateHeaderCardEditor;
  }
}
