import { html, css, nothing } from "lit";
import { customElement, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { FaceplateCard } from "../core/base-card";
import { FaceplateEditor, type HaFormSchema } from "../core/base-editor";
import { registerCard } from "../core/register";
import { faceplateStyles } from "../core/styles";
import type { FaceplateBaseConfig } from "../core/types";

const CARD = "faceplate-banner-card";
const EDITOR = "faceplate-banner-card-editor";

export type BannerSeverity = "plain" | "info" | "ok" | "warn" | "alert";

export interface FaceplateBannerConfig extends FaceplateBaseConfig {
  /** Jinja template, rendered live by Home Assistant. */
  content?: string;
  severity?: BannerSeverity;
  align?: "left" | "center" | "right";
  text_size?: "small" | "medium" | "large";
  /** Drop the card background and render the text straight onto the view. */
  text_only?: boolean;
}

/**
 * A one-line status banner driven by a template.
 *
 * This is the suite's answer to a markdown card used as a readout — a header,
 * a "plant needs watering" warning — rather than a general prose renderer.
 * The template's output is treated as **text**: markup in the template is
 * stripped, and how the line looks comes from `severity` and `text_size`
 * instead of inline `<font>` tags, so a whole dashboard's banners stay
 * consistent and restyle in one place.
 */
@customElement(CARD)
export class FaceplateBannerCard extends FaceplateCard<FaceplateBannerConfig> {
  protected static requiresEntity = false;

  @state() private _rendered = "";
  @state() private _error?: string;

  private _unsubscribe?: () => Promise<void>;
  private _subscribedTo?: string;

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(): Partial<FaceplateBannerConfig> {
    return {
      content: "{{ now().strftime('%H:%M') }}",
      severity: "plain",
      align: "center",
      text_size: "large",
    };
  }

  public getCardSize(): number {
    return 1;
  }

  public getGridOptions() {
    return { columns: 12, rows: 1, min_columns: 3, min_rows: 1 };
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    this._unsubscribeTemplate();
  }

  protected updated(): void {
    this._subscribeTemplate();
  }

  private async _unsubscribeTemplate(): Promise<void> {
    const unsub = this._unsubscribe;
    this._unsubscribe = undefined;
    this._subscribedTo = undefined;
    try {
      await unsub?.();
    } catch {
      /* the socket went away with the subscription; nothing to clean up */
    }
  }

  /**
   * Home Assistant renders the template on the server and pushes a new result
   * whenever anything it touched changes — the card never polls, and never
   * has to know which entities the template happens to reference.
   */
  private async _subscribeTemplate(): Promise<void> {
    const template = this._config?.content;
    if (!this.hass?.connection || !template) return;
    if (this._subscribedTo === template) return;

    await this._unsubscribeTemplate();
    this._subscribedTo = template;

    // A template with no Jinja in it never changes; skip the round trip.
    if (!template.includes("{{") && !template.includes("{%")) {
      this._rendered = template;
      this._error = undefined;
      return;
    }

    try {
      this._unsubscribe = await this.hass.connection.subscribeMessage(
        (msg: { result?: string; error?: string }) => {
          if (msg.error) {
            this._error = msg.error;
            return;
          }
          this._error = undefined;
          this._rendered = msg.result ?? "";
        },
        { type: "render_template", template, report_errors: true }
      );
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
      this._subscribedTo = undefined;
    }
  }

  /** The template's output is a line of text, not a document: markup that
   *  older markdown cards carried (`<center>`, `<font size=5>`) is dropped
   *  in favour of the card's own styling. */
  private _asText(value: string): string {
    return value
      .replace(/<br\s*\/?>/gi, " ")
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/gi, " ")
      .replace(/&amp;/gi, "&")
      .replace(/&lt;/gi, "<")
      .replace(/&gt;/gi, ">")
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&quot;/gi, '"')
      .replace(/\s+/g, " ")
      .trim();
  }

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        flex-direction: row;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        color: var(--faceplate-banner-color, var(--primary-text-color));
      }
      ha-card.text-only {
        background: none;
        border: none;
        box-shadow: none;
        padding: 2px 4px;
      }
      ha-card.align-center {
        justify-content: center;
      }
      ha-card.align-right {
        justify-content: flex-end;
      }
      .text {
        font-size: var(--faceplate-banner-size, 16px);
        font-weight: 500;
        line-height: 1.25;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-variant-numeric: tabular-nums;
      }
      ha-icon {
        --mdc-icon-size: calc(var(--faceplate-banner-size, 16px) * 1.1);
      }
      :host([data-size="small"]) ha-card {
        --faceplate-banner-size: 13px;
      }
      :host([data-size="large"]) ha-card {
        --faceplate-banner-size: 22px;
      }
      :host([data-severity="info"]) ha-card {
        --faceplate-banner-color: var(--info-color, #039be5);
      }
      :host([data-severity="ok"]) ha-card {
        --faceplate-banner-color: var(--success-color, #43a047);
      }
      :host([data-severity="warn"]) ha-card {
        --faceplate-banner-color: var(--warning-color, #ffa600);
      }
      :host([data-severity="alert"]) ha-card {
        --faceplate-banner-color: var(--error-color, #db4437);
      }
      .error {
        font-size: 12px;
        color: var(--error-color, #db4437);
      }
      @container (max-width: 200px) {
        ha-card {
          --faceplate-banner-size: 14px;
        }
      }
    `,
  ];

  protected render() {
    if (!this._config) return nothing;
    const config = this._config;
    const severity = config.severity ?? "plain";

    this.dataset.severity = severity;
    this.dataset.size = config.text_size ?? "medium";

    const text = this._asText(this._rendered);

    return html`
      <ha-card
        class=${classMap({
          "text-only": Boolean(config.text_only),
          [`align-${config.align ?? "center"}`]: true,
        })}
      >
        ${config.icon
          ? html`<ha-icon icon=${config.icon}></ha-icon>`
          : nothing}
        ${this._error
          ? html`<span class="error">Template error: ${this._error}</span>`
          : html`<span class="text" title=${text}>${text}</span>`}
      </ha-card>
    `;
  }
}

@customElement(EDITOR)
export class FaceplateBannerCardEditor extends FaceplateEditor<FaceplateBannerConfig> {
  protected defaults = {
    severity: "plain",
    align: "center",
    text_size: "medium",
    text_only: false,
  };

  protected labels = {
    content: "Content",
    icon: "Icon (optional)",
    severity: "Severity",
    align: "Alignment",
    text_size: "Text size",
    text_only: "No card background",
  };

  protected helpers = {
    content:
      "Jinja template, re-rendered by Home Assistant whenever its inputs change. Markup is stripped — use the options below for styling",
    severity: "Colours the text; alert is the red 'needs attention' banner",
    text_only: "Renders straight onto the view, like a heading",
  };

  protected schema(): HaFormSchema[] {
    return [
      { name: "content", required: true, selector: { template: {} } },
      { name: "icon", selector: { icon: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          {
            name: "severity",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "plain", label: "Plain" },
                  { value: "info", label: "Info" },
                  { value: "ok", label: "OK" },
                  { value: "warn", label: "Warning" },
                  { value: "alert", label: "Alert" },
                ],
              },
            },
          },
          {
            name: "align",
            selector: {
              select: {
                mode: "dropdown",
                options: [
                  { value: "left", label: "Left" },
                  { value: "center", label: "Centre" },
                  { value: "right", label: "Right" },
                ],
              },
            },
          },
          {
            name: "text_size",
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
          { name: "text_only", selector: { boolean: {} } },
        ],
      },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Banner",
  description:
    "A template-driven status line — headers, clocks and 'needs attention' warnings",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-banner-card": FaceplateBannerCard;
    "faceplate-banner-card-editor": FaceplateBannerCardEditor;
  }
}
