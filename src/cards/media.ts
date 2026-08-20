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

const CARD = "faceplate-media-card";
const EDITOR = "faceplate-media-card-editor";

export interface FaceplateMediaConfig extends FaceplateBaseConfig {
  show_state?: boolean;
  show_art?: boolean;
  show_volume_control?: boolean;
  show_controls?: boolean;
  /** Cap the volume slider, the way the light card caps brightness. */
  max_volume?: number;
}

/**
 * Home Assistant's MediaPlayerEntityFeature bits.
 *
 * Every control here is gated on one: an amplifier that reports no previous
 * track really has no previous track, and a button that silently does nothing
 * is worse than a button that isn't there.
 */
const FEATURE = {
  PAUSE: 1,
  VOLUME_SET: 4,
  VOLUME_MUTE: 8,
  PREVIOUS_TRACK: 16,
  NEXT_TRACK: 32,
  TURN_ON: 128,
  TURN_OFF: 256,
  STOP: 4096,
  PLAY: 16384,
} as const;

@customElement(CARD)
export class FaceplateMediaCard extends FaceplateCard<FaceplateMediaConfig> {
  protected static entityDomains = ["media_player"];

  public static async getConfigElement() {
    return document.createElement(EDITOR);
  }

  public static getStubConfig(hass: {
    states: Record<string, unknown>;
  }): Partial<FaceplateMediaConfig> {
    const entity = Object.keys(hass.states).find((e) =>
      e.startsWith("media_player.")
    );
    return { entity: entity ?? "", show_art: true };
  }

  public getCardSize(): number {
    return 3;
  }

  public getGridOptions() {
    let rows = 3;
    if (this._config?.show_volume_control === false) rows -= 1;
    if (this._config?.show_controls === false) rows -= 1;
    return { columns: 12, rows: Math.max(1, rows), min_columns: 4, min_rows: 1 };
  }

  private get _playing(): boolean {
    return this._stateObj?.state === "playing";
  }

  private _supports(feature: number): boolean {
    const supported = this._stateObj?.attributes.supported_features ?? 0;
    return (supported & feature) !== 0;
  }

  /** The volume ceiling as a percentage; 100 when unset. */
  private get _maxVolume(): number {
    const max = this._config?.max_volume;
    return typeof max === "number" && max > 0 && max <= 100 ? max : 100;
  }

  /** Volume as a share of the ceiling, held inside 0-100 — something else may
   *  have pushed the amplifier past it. */
  private get _volume(): number {
    const level = this._stateObj?.attributes.volume_level;
    if (typeof level !== "number") return 0;
    return Math.min(100, Math.round(((level * 100) / this._maxVolume) * 100));
  }

  private get _muted(): boolean {
    return this._stateObj?.attributes.is_volume_muted === true;
  }

  private _call(service: string, data: Record<string, unknown> = {}): void {
    this.hass!.callService("media_player", service, {
      entity_id: this._config!.entity,
      ...data,
    });
  }

  private _playPause = (): void => this._call("media_play_pause");
  private _next = (): void => this._call("media_next_track");
  private _previous = (): void => this._call("media_previous_track");
  private _toggleMute = (): void =>
    this._call("volume_mute", { is_volume_muted: !this._muted });

  private _setVolume = (ev: CustomEvent<{ value: number }>): void => {
    this._call("volume_set", {
      volume_level: (ev.detail.value * this._maxVolume) / 10000,
    });
  };

  static styles = [
    ...faceplateStyles,
    css`
      ha-card {
        container-type: inline-size;
      }
      /* Art and text sit side by side: the cover is the fastest way to
         recognise what is playing, and the title alone in a narrow tile
         truncates to uselessness. */
      .now {
        display: flex;
        align-items: center;
        gap: 10px;
        align-self: stretch;
        min-width: 0;
      }
      .art {
        width: 44px;
        height: 44px;
        flex: none;
        border-radius: 6px;
        object-fit: cover;
        background: rgba(127, 127, 127, 0.18);
      }
      .lines {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: 1px;
      }
      .title {
        font-size: 15px;
        font-weight: 400;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .artist {
        font-size: 12px;
        color: var(--secondary-text-color);
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .idle {
        font-size: 20px;
        font-weight: 300;
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
      .sliders {
        display: flex;
        flex-direction: column;
        gap: 6px;
        flex: none;
      }
      .lcd {
        flex: 1 1 auto;
        min-height: 0;
        overflow: hidden;
      }
      /* The cover is the first thing to go when the tile gets narrow: the
         transport buttons have to stay thumb-sized, and the text has to stay
         readable, so the decoration yields first. */
      @container (max-width: 240px) {
        .art {
          display: none;
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
    const off = stateObj.state === "off" || stateObj.state === "standby";
    const name = friendlyName(stateObj, config.name);

    const title = stateObj.attributes.media_title;
    const artist =
      stateObj.attributes.media_artist ?? stateObj.attributes.media_album_name;
    const art = stateObj.attributes.entity_picture;

    const showVolume =
      config.show_volume_control !== false &&
      this._supports(FEATURE.VOLUME_SET) &&
      !unavailable;
    const showControls = config.show_controls !== false && !unavailable;

    return html`
      <ha-card>
        <div class=${classMap({ lcd: true, off: off || unavailable })}>
          <div class="lcd-top">
            <span class="name" title=${name}>${name}</span>
            ${this._supports(FEATURE.VOLUME_MUTE) && !unavailable
              ? html`<button
                  class=${classMap({ badge: true, on: this._muted })}
                  title=${this._muted ? "Unmute" : "Mute"}
                  aria-label=${this._muted ? "Unmute" : "Mute"}
                  @click=${this._toggleMute}
                >
                  <ha-icon
                    icon=${this._muted ? "mdi:volume-off" : "mdi:volume-high"}
                  ></ha-icon>
                </button>`
              : nothing}
          </div>
          ${this._show("show_state")
            ? html`<div class="now">
                ${unavailable
                  ? html`<span class="idle">Unavailable</span>`
                  : title
                    ? html`
                        ${config.show_art !== false && art
                          ? html`<img class="art" src=${art} alt="" />`
                          : nothing}
                        <div class="lines">
                          <span class="title" title=${title}>${title}</span>
                          ${artist
                            ? html`<span class="artist" title=${artist}
                                >${artist}</span
                              >`
                            : nothing}
                        </div>
                      `
                    : html`<span class="idle">${off ? "Off" : "Idle"}</span>`}
              </div>`
            : nothing}
        </div>

        ${showVolume
          ? html`<div class="sliders">
              <faceplate-slider
                label="Volume"
                unit="%"
                min="0"
                max="100"
                .value=${this._volume}
                .disabled=${this._muted}
                @slider-change=${this._setVolume}
              ></faceplate-slider>
            </div>`
          : nothing}

        ${showControls
          ? html`<div class="controls">
              ${this._supports(FEATURE.PREVIOUS_TRACK)
                ? html`<button
                    class="ctl"
                    title="Previous"
                    @click=${this._previous}
                  >
                    <ha-icon icon="mdi:skip-previous"></ha-icon>
                  </button>`
                : nothing}
              ${this._supports(FEATURE.PLAY) || this._supports(FEATURE.PAUSE)
                ? html`<button
                    class=${classMap({ ctl: true, on: this._playing })}
                    title=${this._playing ? "Pause" : "Play"}
                    @click=${this._playPause}
                  >
                    <ha-icon
                      icon=${this._playing ? "mdi:pause" : "mdi:play"}
                    ></ha-icon>
                  </button>`
                : nothing}
              ${this._supports(FEATURE.NEXT_TRACK)
                ? html`<button class="ctl" title="Next" @click=${this._next}>
                    <ha-icon icon="mdi:skip-next"></ha-icon>
                  </button>`
                : nothing}
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

@customElement(EDITOR)
export class FaceplateMediaCardEditor extends FaceplateEditor<FaceplateMediaConfig> {
  protected defaults = {
    show_state: true,
    show_art: true,
    show_volume_control: true,
    show_controls: true,
  };

  protected labels = {
    entity: "Media player entity (required)",
    name: "Name",
    show_state: "Show what's playing",
    show_art: "Show album art",
    show_volume_control: "Volume slider",
    show_controls: "Transport buttons",
    max_volume: "Volume ceiling (%)",
  };

  protected helpers = {
    show_art: "Hidden automatically on a narrow tile",
    max_volume:
      "The slider's 100%, as a percentage of the player's full volume",
  };

  protected schema(): HaFormSchema[] {
    return [
      {
        name: "entity",
        required: true,
        selector: { entity: { domain: "media_player" } },
      },
      { name: "name", selector: { text: {} } },
      {
        type: "grid",
        name: "",
        schema: [
          { name: "show_state", selector: { boolean: {} } },
          { name: "show_art", selector: { boolean: {} } },
          { name: "show_volume_control", selector: { boolean: {} } },
          { name: "show_controls", selector: { boolean: {} } },
        ],
      },
      {
        name: "max_volume",
        selector: { number: { min: 1, max: 100, step: 1, mode: "box" } },
      },
    ];
  }
}

registerCard({
  type: CARD,
  name: "Faceplate Media",
  description: "Now playing, volume and transport controls in LCD type",
});

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-media-card": FaceplateMediaCard;
    "faceplate-media-card-editor": FaceplateMediaCardEditor;
  }
}
