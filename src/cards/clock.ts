import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FaceplateCard } from "../core/base-card";
import { FaceplateEditor, type HaFormSchema } from "../core/base-editor";
import { formatNumber } from "../core/format";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig } from "../core/types";
import {
  ForecastSubscription,
  weatherIcon,
  type ForecastItem,
} from "../core/weather";

const CARD = "faceplate-clock-card";
const EDITOR = "faceplate-clock-card-editor";

export interface FaceplateClockConfig extends FaceplateBaseConfig {
  clock_size?: "small" | "medium" | "large";
  time_format?: "12" | "24" | "auto";
  show_seconds?: boolean;
  show_date?: boolean;
  date_format?: string;
  time_zone?: string;
  /** A `weather` entity, to put today's outlook beside the date. */
  weather_entity?: string;
  show_weather?: boolean;
  /**
   * `row` puts the time, date and weather on one line instead of stacking the
   * date under the figures. On a wide, one-row tile that is the difference
   * between figures capped at a third of the height and figures filling it.
   */
  layout?: "stack" | "row";
}

/** The panel clock: LCD figures, tabular so the layout never twitches. */
@customElement(CARD)
export class FaceplateClockCard extends FaceplateCard<FaceplateClockConfig> {
  protected static requiresEntity = false;

  @state() private _now = new Date();

  @state() private _forecast: ForecastItem[] = [];

  private _timer?: number;

  private _subscription = new ForecastSubscription((forecast) => {
    this._forecast = forecast;
  });

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(): Partial<FaceplateClockConfig> {
    return { show_date: true, clock_size: "medium" };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return { columns: 6, rows: 1, min_columns: 3, min_rows: 1 };
  }

  public connectedCallback(): void {
    super.connectedCallback();
    this._schedule();
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._timer);
    this._subscription.stop();
  }

  protected updated(): void {
    this._subscription.sync(
      this.hass,
      this._config?.weather_entity,
      "daily",
      this._weatherWanted
    );
  }

  /**
   * Tick on the boundary rather than every second: without seconds shown a
   * per-second re-render is a minute of wasted work for every minute the
   * panel is awake, and these panels are awake all day.
   */
  private _schedule(): void {
    window.clearTimeout(this._timer);
    const now = new Date();
    this._now = now;
    const period = this._config?.show_seconds ? 1000 : 60000;
    const delay = period - (now.getTime() % period);
    this._timer = window.setTimeout(() => this._schedule(), delay + 20);
  }

  protected willUpdate(changed: Map<string, unknown>): void {
    // A config change can switch the tick rate under us.
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

  private get _weatherWanted(): boolean {
    return Boolean(this._config?.weather_entity) && this._show("show_weather");
  }

  static styles = [
    ...faceplateStyles,
    css`
      /* A size container so the figures can be capped against the tile's
         height. Without it a medium clock with seconds and a date overflows a
         two-row tile and the date is sliced off. The min-height floor keeps it
         legible if this lands in a view that gives the card no definite
         height, where a size container would otherwise collapse. */
      ha-card {
        container-type: size;
        min-height: 40px;
      }
      .lcd {
        gap: 0;
        min-height: 0;
        overflow: hidden;
      }
      /* Each line below the time takes its share out of the figures. The date
         and the weather share one line, so a clock showing both is no shorter
         than a clock showing either. */
      ha-card.with-sub {
        --fp-clock-fit: 46cqh;
      }
      ha-card.with-label {
        --fp-clock-fit: 46cqh;
      }
      ha-card.with-label.with-sub {
        --fp-clock-fit: 34cqh;
      }
      .time {
        font-size: min(
          var(--faceplate-clock-size, 44px),
          var(--fp-clock-fit, 66cqh)
        );
        font-weight: 300;
        line-height: 1.05;
        font-variant-numeric: tabular-nums;
        letter-spacing: 0.01em;
      }
      .meridiem {
        font-size: 0.4em;
        opacity: 0.75;
        margin-left: 4px;
      }
      /* Date and weather read as one secondary line under the figures. */
      .sub {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        margin-top: 2px;
        min-width: 0;
      }
      .date {
        font-size: 13px;
        color: var(--secondary-text-color);
        white-space: nowrap;
      }
      .weather {
        display: flex;
        align-items: center;
        gap: 3px;
        white-space: nowrap;
      }
      .weather ha-icon {
        --mdc-icon-size: 18px;
      }
      .temps {
        font-size: 13px;
        font-variant-numeric: tabular-nums;
      }
      /* The low is the quieter half of the pair, as on the forecast strip. */
      .temp-low {
        color: var(--secondary-text-color);
      }
      .label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      /* Row layout: everything on one line, so the figures are limited by the
         tile's height rather than by having to leave a line free beneath them.
         The stacked layout caps them at 46cqh once a date is shown; here they
         take nearly the whole height, which on a wide one-row tile is the
         difference between a readable clock and a token one. */
      ha-card.row .lcd {
        flex-direction: row;
        align-items: baseline;
        justify-content: center;
        gap: 10px;
        flex-wrap: nowrap;
      }
      ha-card.row.with-sub,
      ha-card.row.with-label,
      ha-card.row.with-label.with-sub {
        --fp-clock-fit: 76cqh;
      }
      /* One size for the whole bar. The time, the date and the weather are one
         line of text, so sizing them apart makes the smaller ones read as an
         afterthought; they all take the size the figures settle on.
         Capped against width as well as height because this line grows: adding
         seconds is four more characters, and a bar that overflows its tile
         silently loses the end of itself. */
      ha-card.row .lcd {
        font-size: min(
          var(--faceplate-clock-size, 44px),
          var(--fp-clock-fit, 76cqh),
          5.2cqw
        );
        /* The bar is a single line of text, so the generous vertical padding
           the stacked readouts want just draws a grey band above and below
           it. Horizontal padding stays: the line needs its margins. */
        padding: 2px 16px;
      }
      ha-card.row .time,
      ha-card.row .date,
      ha-card.row .temps,
      ha-card.row .label {
        font-size: 1em;
      }
      ha-card.row .weather ha-icon {
        --mdc-icon-size: 1em;
      }
      ha-card.row .sub {
        margin-top: 0;
        gap: 8px;
        flex: none;
      }
      /* A header bar is mostly frame otherwise: the card's own padding, then
         the recessed panel's, around a single line of text. Tightening both
         lets the figures grow into the space instead of it being border. */
      ha-card.row {
        --faceplate-padding: 0px;
      }
      ha-card.row .lcd {
        padding: 2px 14px;
        border-radius: var(--faceplate-radius);
        align-self: stretch;
      }
      /* Secondary text is sized against the figures, not fixed at 13px — a
         date a third the height of the time beside it reads as an accident. */

      ha-card.row .weather {
        gap: 5px;
      }

      ha-card.row .label {
        align-self: baseline;
      }
      :host([data-size="small"]) .lcd {
        --faceplate-clock-size: 30px;
      }
      :host([data-size="large"]) .lcd {
        /* Not a target so much as a ceiling: --fp-clock-fit caps the figures
           against the tile's height, so on an ordinary tile this still lands
           near 64px, and on the tall 120mm panels — where a clock is read from
           across a dark room — it grows into the space instead of sitting at
           64px in a 200px box. */
        --faceplate-clock-size: 132px;
      }
      @container (max-width: 260px) {
        .lcd {
          --faceplate-clock-size: 34px;
        }
      }
      @container (max-width: 170px) {
        .lcd {
          --faceplate-clock-size: 26px;
        }
        .date,
        .temps {
          font-size: 11px;
        }
        .sub {
          gap: 5px;
        }
        .weather ha-icon {
          --mdc-icon-size: 15px;
        }
      }
    `,
  ];

  protected render() {
    if (!this._config) return nothing;
    const config = this._config;
    const zone = config.time_zone;

    const timeParts = new Intl.DateTimeFormat(this._locale, {
      hour: "2-digit",
      minute: "2-digit",
      ...(config.show_seconds ? { second: "2-digit" } : {}),
      // 24-hour is requested as an explicit hour cycle, not `hour12: false`.
      // The boolean selects h24, which numbers midnight as 24 — the hour after
      // midnight rendered as "24:55" on every panel in the house. h23 is the
      // cycle people mean by "24 hour": 00:55.
      ...(this._hour12 === undefined
        ? {}
        : this._hour12
          ? { hour12: true }
          : { hourCycle: "h23" as const }),
      ...(zone ? { timeZone: zone } : {}),
    }).formatToParts(this._now);

    const meridiem = timeParts.find((p) => p.type === "dayPeriod")?.value;
    const time = timeParts
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

    const weather = this._weather();

    this.dataset.size = config.clock_size ?? "medium";

    return html`
      <ha-card
        class=${classMap({
          "with-sub": Boolean(date || weather),
          "with-label": Boolean(config.name),
          row: config.layout === "row",
        })}
      >
        <div class="lcd">
          ${config.name
            ? html`<span class="label">${config.name}</span>`
            : nothing}
          <span class="time"
            >${time}${meridiem
              ? html`<span class="meridiem">${meridiem}</span>`
              : nothing}</span
          >
          ${date || weather
            ? html`<div class="sub">
                ${date ? html`<span class="date">${date}</span>` : nothing}
                ${weather ?? nothing}
              </div>`
            : nothing}
        </div>
      </ha-card>
    `;
  }

  /**
   * Today's outlook beside the date: the condition icon and the day's high
   * and low, in the same pairing the weather card's forecast strip uses.
   *
   * The high and low come from the first daily forecast slot rather than the
   * entity's own `temperature`, which is the reading right now — a clock
   * showing "31°" at breakfast and "26°" at bedtime is reporting the weather
   * changing, not the day's range.
   */
  private _weather() {
    if (!this._weatherWanted) return undefined;
    const stateObj = this.hass?.states[this._config!.weather_entity!];
    if (!stateObj) return undefined;

    const today = this._forecast[0];
    const condition = today?.condition ?? stateObj.state;
    const high = today?.temperature;
    const low = today?.templow;

    return html`<span class="weather">
      <ha-icon icon=${weatherIcon(condition)}></ha-icon>
      <span class="temps">
        ${high === undefined ? "--" : formatNumber(this.hass, high, 0)}°${low ===
        undefined
          ? nothing
          : html`<span class="temp-low"
              >/${formatNumber(this.hass, low, 0)}°</span
            >`}
      </span>
    </span>`;
  }
}

@customElement(EDITOR)
export class FaceplateClockCardEditor extends FaceplateEditor<FaceplateClockConfig> {
  protected defaults = {
    clock_size: "medium",
    time_format: "auto",
    show_seconds: false,
    show_date: true,
    show_weather: true,
  };

  protected labels = {
    name: "Label (optional)",
    clock_size: "Size",
    time_format: "Time format",
    show_seconds: "Show seconds",
    show_date: "Show date",
    time_zone: "Time zone",
    weather_entity: "Weather entity (optional)",
    show_weather: "Show weather",
  };

  protected helpers = {
    time_format: "Auto follows your Home Assistant profile setting",
    show_seconds: "Ticks every second instead of every minute",
    time_zone: "IANA name, e.g. Asia/Hong_Kong. Empty uses the panel's own zone",
    weather_entity:
      "Puts today's condition icon and high/low beside the date",
  };

  protected schema(): HaFormSchema[] {
    return [
      { name: "name", selector: { text: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "clock_size",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "small", label: "Small" },
                  { value: "medium", label: "Medium" },
                  { value: "large", label: "Large" },
                ],
              },
            },
          },
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
        ],
      },
      { name: "time_zone", selector: { text: {} } },
      {
        name: "weather_entity",
        selector: { entity: { domain: "weather" } },
      },
      { name: "show_weather", selector: { boolean: {} } },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Clock",
  description: "Time and date in LCD figures",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-clock-card": FaceplateClockCard;
    "faceplate-clock-card-editor": FaceplateClockCardEditor;
  }
}
