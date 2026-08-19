import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { FaceplateCard } from "../core/base-card";
import { FaceplateEditor, type HaFormSchema } from "../core/base-editor";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig } from "../core/types";

const CARD = "faceplate-clock-card";
const EDITOR = "faceplate-clock-card-editor";

export interface FaceplateClockConfig extends FaceplateBaseConfig {
  clock_size?: "small" | "medium" | "large";
  time_format?: "12" | "24" | "auto";
  show_seconds?: boolean;
  show_date?: boolean;
  date_format?: string;
  time_zone?: string;
}

/** The panel clock: LCD figures, tabular so the layout never twitches. */
@customElement(CARD)
export class FaceplateClockCard extends FaceplateCard<FaceplateClockConfig> {
  protected static requiresEntity = false;

  @state() private _now = new Date();

  private _timer?: number;

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

  static styles = [
    ...faceplateStyles,
    css`
      .lcd {
        gap: 0;
      }
      .time {
        font-size: var(--faceplate-clock-size, 44px);
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
      .date {
        font-size: 13px;
        color: var(--secondary-text-color);
        margin-top: 2px;
        white-space: nowrap;
      }
      .label {
        font-size: 12px;
        font-weight: 500;
        color: var(--secondary-text-color);
      }
      :host([data-size="small"]) .lcd {
        --faceplate-clock-size: 30px;
      }
      :host([data-size="large"]) .lcd {
        --faceplate-clock-size: 64px;
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
        .date {
          font-size: 11px;
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
      ...(this._hour12 === undefined ? {} : { hour12: this._hour12 }),
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

    this.dataset.size = config.clock_size ?? "medium";

    return html`
      <ha-card>
        <div class="lcd">
          ${config.name
            ? html`<span class="label">${config.name}</span>`
            : nothing}
          <span class="time"
            >${time}${meridiem
              ? html`<span class="meridiem">${meridiem}</span>`
              : nothing}</span
          >
          ${date ? html`<span class="date">${date}</span>` : nothing}
        </div>
      </ha-card>
    `;
  }
}

@customElement(EDITOR)
export class FaceplateClockCardEditor extends FaceplateEditor<FaceplateClockConfig> {
  protected defaults = {
    clock_size: "medium",
    time_format: "auto",
    show_seconds: false,
    show_date: true,
  };

  protected labels = {
    name: "Label (optional)",
    clock_size: "Size",
    time_format: "Time format",
    show_seconds: "Show seconds",
    show_date: "Show date",
    time_zone: "Time zone",
  };

  protected helpers = {
    time_format: "Auto follows your Home Assistant profile setting",
    show_seconds: "Ticks every second instead of every minute",
    time_zone: "IANA name, e.g. Asia/Hong_Kong. Empty uses the panel's own zone",
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
