import { LitElement, html, css, nothing } from "lit";
import { customElement, property, query, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { styleMap } from "lit/directives/style-map.js";
import {
  CARD_NAME,
  EDITOR_NAME,
  HVAC_MODE_COLORS,
  HVAC_MODE_ICONS,
  HVAC_MODE_ORDER,
  combinedSwingIcon,
  fanIcon,
  fanSpeedLabel,
  swingIcon,
  prettify,
  statusLabel,
} from "./const";
import { faceplateStyles } from "../../core/styles";
import type {
  FaceplateClimateConfig,
  ControlSource,
  HassEntity,
  HomeAssistant,
  PopupKind,
  SettingEntity,
} from "./types";

/** One section on the fan & swing popup. */
interface FanSection {
  key: "fan" | "vswing" | "hswing";
  title: string;
  segmentIcon: string;
  icon: (option: string) => string;
  source: ControlSource;
}

@customElement(CARD_NAME)
export class FaceplateClimateCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: FaceplateClimateConfig;
  @state() private _popup: PopupKind | null = null;
  @query("dialog.popup-backdrop") private _dialogEl?: HTMLDialogElement;
  @state() private _localTarget?: number;

  private _commitTimer?: number;
  private _pressTimer?: number;
  private _longPressed = false;

  public static async getConfigElement() {
    await import("./editor");
    return document.createElement(EDITOR_NAME);
  }

  public static getStubConfig(hass: HomeAssistant): Partial<FaceplateClimateConfig> {
    const entity = Object.keys(hass.states).find((e) =>
      e.startsWith("climate.")
    );
    return { entity: entity ?? "" };
  }

  public setConfig(config: FaceplateClimateConfig): void {
    if (!config.entity || !config.entity.startsWith("climate.")) {
      throw new Error("Please define a climate entity");
    }
    this._config = config;
  }

  public getCardSize(): number {
    const layout = this._config?.layout;
    if (layout === "row") return 1;
    return layout === "compact" ? 2 : 3;
  }

  public getGridOptions() {
    // The row layout is built for full-width wall-panel strips: one line of
    // readout and buttons, so it asks for the full 12 columns and one row.
    if (this._config?.layout === "row") {
      return {
        columns: 12,
        rows: 1,
        min_columns: 6,
        min_rows: 1,
      };
    }
    return {
      columns: 6,
      rows: 3,
      min_columns: 3,
      min_rows: 2,
    };
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    window.clearTimeout(this._commitTimer);
    window.clearTimeout(this._pressTimer);
  }

  /* ------------------------------------------------------------------ */
  /* State helpers                                                       */
  /* ------------------------------------------------------------------ */

  private get _stateObj(): HassEntity | undefined {
    return this._config && this.hass
      ? this.hass.states[this._config.entity]
      : undefined;
  }

  private _show(key: keyof FaceplateClimateConfig): boolean {
    return this._config?.[key] !== false;
  }

  private _selectSource(entityId: string): ControlSource | undefined {
    const st = this.hass?.states[entityId];
    if (!st) return undefined;
    const domain = entityId.split(".")[0];
    const serviceDomain = domain === "input_select" ? "input_select" : "select";
    return {
      options: st.attributes.options ?? [],
      current: st.state,
      set: (option) =>
        this.hass!.callService(serviceDomain, "select_option", {
          entity_id: entityId,
          option,
        }),
    };
  }

  private _climateSource(
    optionsKey: string,
    currentKey: string,
    service: string
  ): ControlSource | undefined {
    const climate = this._stateObj;
    if (!climate?.attributes[optionsKey]?.length) return undefined;
    return {
      options: climate.attributes[optionsKey],
      current: climate.attributes[currentKey],
      set: (value) =>
        this.hass!.callService("climate", service, {
          entity_id: climate.entity_id,
          [currentKey]: value,
        }),
    };
  }

  /** Sections shown on the fan & swing popup, in order. */
  private _fanSections(): FanSection[] {
    const sections: FanSection[] = [];
    if (this._show("show_fan")) {
      const source = this._climateSource("fan_modes", "fan_mode", "set_fan_mode");
      if (source) {
        sections.push({
          key: "fan",
          title: "Fan speed",
          segmentIcon: fanIcon(source.current ?? ""),
          icon: fanIcon,
          source,
        });
      }
    }
    const hSource = this._show("show_horizontal_swing")
      ? this._config?.horizontal_swing_entity
        ? this._selectSource(this._config.horizontal_swing_entity)
        : this._climateSource(
            "swing_horizontal_modes",
            "swing_horizontal_mode",
            "set_swing_horizontal_mode"
          )
      : undefined;
    if (this._show("show_vertical_swing")) {
      const source = this._config?.vertical_swing_entity
        ? this._selectSource(this._config.vertical_swing_entity)
        : this._climateSource("swing_modes", "swing_mode", "set_swing_mode");
      if (source?.options.length) {
        // Integrations like this exist: a single swing_mode select covering
        // both axes (off/vertical/horizontal/both). Detect and label it as
        // plain "Swing" with axis-appropriate icons.
        const combined =
          !hSource?.options.length &&
          source.options.some((o) => /horiz|both/i.test(o));
        const icon = combined
          ? combinedSwingIcon
          : (o: string) => swingIcon(o, false);
        sections.push({
          key: "vswing",
          title: combined ? "Swing" : "Vertical swing",
          segmentIcon: icon(source.current ?? ""),
          icon,
          source,
        });
      }
    }
    if (hSource?.options.length) {
      sections.push({
        key: "hswing",
        title: "Horizontal swing",
        segmentIcon: swingIcon(hSource.current ?? "", true),
        icon: (o: string) => swingIcon(o, true),
        source: hSource,
      });
    }
    return sections;
  }

  private _hasSettings(): boolean {
    if (!this._show("show_settings")) return false;
    return Boolean(
      this._stateObj?.attributes.preset_modes?.length ||
        this._config?.setting_entities?.length
    );
  }

  private get _isOff(): boolean {
    return this._stateObj?.state === "off";
  }

  private get _step(): number {
    return (
      this._config?.step ??
      this._stateObj?.attributes.target_temp_step ??
      0.5
    );
  }

  private get _targetTemp(): number | undefined {
    return this._localTarget ?? this._stateObj?.attributes.temperature;
  }

  private get _currentTemp(): number | undefined {
    const override = this._config?.current_temperature_entity;
    if (override) {
      const st = this.hass?.states[override];
      const value = st ? parseFloat(st.state) : NaN;
      return Number.isFinite(value) ? value : undefined;
    }
    return this._stateObj?.attributes.current_temperature;
  }

  private get _outdoorTemp(): number | undefined {
    const entityId = this._config?.outdoor_temperature_entity;
    if (!entityId) return undefined;
    const st = this.hass?.states[entityId];
    const value = st ? parseFloat(st.state) : NaN;
    return Number.isFinite(value) ? value : undefined;
  }

  private get _unit(): string {
    return this.hass?.config.unit_system.temperature ?? "°C";
  }

  private _modeName(mode: string): string {
    return (
      this.hass?.localize(`component.climate.entity_component._.state.${mode}`) ||
      prettify(mode)
    );
  }

  protected willUpdate(): void {
    if (
      this._localTarget !== undefined &&
      this._stateObj?.attributes.temperature === this._localTarget
    ) {
      this._localTarget = undefined;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Actions                                                             */
  /* ------------------------------------------------------------------ */

  private _adjustTemp(direction: 1 | -1): void {
    const stateObj = this._stateObj;
    if (!stateObj) return;
    const a = stateObj.attributes;
    const current = this._targetTemp ?? a.min_temp ?? 20;
    const min = a.min_temp ?? 7;
    const max = a.max_temp ?? 35;
    const step = this._step;
    const next = Math.min(max, Math.max(min, current + direction * step));
    // Round away floating point noise to the step's precision.
    const precision = `${step}`.split(".")[1]?.length ?? 0;
    this._localTarget = parseFloat(next.toFixed(precision));
    window.clearTimeout(this._commitTimer);
    this._commitTimer = window.setTimeout(() => {
      this.hass!.callService("climate", "set_temperature", {
        entity_id: stateObj.entity_id,
        temperature: this._localTarget,
      });
    }, 700);
  }

  /** HVAC modes the card offers, honouring the configured whitelist. */
  private _availableModes(): string[] {
    const allowed = this._config?.hvac_modes;
    return [...(this._stateObj?.attributes.hvac_modes ?? [])]
      .filter((m: string) => !allowed?.length || allowed.includes(m))
      .sort((x, y) => HVAC_MODE_ORDER.indexOf(x) - HVAC_MODE_ORDER.indexOf(y));
  }

  /** Mode a short press turns the unit on to, if one can be determined. */
  private _defaultMode(): string | undefined {
    const modes = this._availableModes().filter((m) => m !== "off");
    const configured = this._config?.default_mode;
    if (configured && modes.includes(configured)) return configured;
    return modes.length === 1 ? modes[0] : undefined;
  }

  private _setHvacMode(mode: string): void {
    this.hass!.callService("climate", "set_hvac_mode", {
      entity_id: this._config!.entity,
      hvac_mode: mode,
    });
  }

  private _pressStart = (): void => {
    this._longPressed = false;
    window.clearTimeout(this._pressTimer);
    this._pressTimer = window.setTimeout(() => {
      this._longPressed = true;
      this._popup = "config";
    }, 500);
  };

  private _pressEnd = (): void => {
    window.clearTimeout(this._pressTimer);
  };

  /** Short press toggles off ⇄ the default mode; a long press has already
   *  opened the mode chooser, so the trailing click is swallowed. */
  private _powerPress = (): void => {
    if (this._longPressed) {
      this._longPressed = false;
      return;
    }
    if (!this._isOff) {
      this._setHvacMode("off");
      return;
    }
    const target = this._defaultMode();
    if (target) {
      this._setHvacMode(target);
    } else {
      this._popup = "config";
    }
  };

  /** Short press steps to the next fan speed; a long press has already opened
   *  the sheet, where the whole set is laid out at once. A button sitting in a
   *  row of working controls has to control something — opening a dialog on
   *  tap made the row read as five buttons of which three did nothing. */
  private _cycleFan = (section: FanSection): void => {
    if (this._longPressed) {
      this._longPressed = false;
      return;
    }
    const { options, current } = section.source;
    if (!options.length) {
      this._popup = "config";
      return;
    }
    const next = options[(options.indexOf(current ?? "") + 1) % options.length];
    section.source.set(next);
  };

  /* ------------------------------------------------------------------ */
  /* Rendering                                                           */
  /* ------------------------------------------------------------------ */

  protected render() {
    if (!this._config || !this.hass) return nothing;
    const stateObj = this._stateObj;
    if (!stateObj) {
      return html`<ha-card class="error">
        Entity not found: ${this._config.entity}
      </ha-card>`;
    }
    const unavailable = stateObj.state === "unavailable";
    const mode = stateObj.state;
    const modeColor = HVAC_MODE_COLORS[mode] ?? HVAC_MODE_COLORS.off;
    const fanSections = this._fanSections();
    // Only the speed section is cyclable from the row; swing and preset stay
    // in the sheet, where their options are named rather than guessed at.
    const fanControl = fanSections.find((s) => s.key === "fan");
    const layout = this._config.layout ?? "standard";
    const name =
      this._config.name ?? stateObj.attributes.friendly_name ?? "";
    const preset = stateObj.attributes.preset_mode;

    const controlsVisible = this._show("show_controls");
    // Nothing is actually blowing when the unit is off, so the fan and swing
    // readouts report no value rather than a stale one.
    const inactive = this._isOff || unavailable;

    return html`
      <ha-card
        class=${classMap({
          [`layout-${layout}`]: true,
          "display-only": !controlsVisible,
        })}
      >
        <!-- With the buttons hidden the display is the only thing left to
             touch, so it becomes the way into the config sheet. -->
        <div
          class=${classMap({
            lcd: true,
            off: inactive,
            tappable: !controlsVisible,
          })}
          @click=${() => {
            if (!controlsVisible) this._popup = "config";
          }}
        >
          <div class="lcd-top">
            ${this._show("show_name")
              ? html`<span class="name" title=${name}>${name}</span>`
              : html`<span></span>`}
            <span class="temps">
              ${this._show("show_current_temperature") &&
              this._currentTemp !== undefined
                ? html`<span class="aux"
                    >Current ${this._formatNumber(this._currentTemp)}°</span
                  >`
                : nothing}
              ${this._outdoorTemp !== undefined
                ? html`<span class="aux"
                    >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                  >`
                : nothing}
            </span>
          </div>
          <div class="lcd-center">
            <span class=${classMap({ readout: true, dimmed: inactive })}>
              ${unavailable || this._targetTemp === undefined
                ? "--"
                : this._formatNumber(this._targetTemp)}<span class="unit"
                >${this._unit}</span
              >
            </span>
            <span class="badge" style=${styleMap({ color: modeColor })}>
              <ha-icon icon=${HVAC_MODE_ICONS[mode] ?? "mdi:thermostat"}></ha-icon>
              <span>${unavailable ? "Unavailable" : this._modeName(mode)}</span>
            </span>
          </div>
          ${fanSections.length || preset
            ? html`<div class="lcd-status">
                ${fanSections.map(
                  (s) => html`<button
                    class="segment"
                    title=${s.title}
                    @click=${() => (this._popup = "config")}
                  >
                    <ha-icon icon=${s.segmentIcon}></ha-icon>
                    <span
                      >${inactive ? "—" : statusLabel(s.source.current ?? "—")}</span
                    >
                  </button>`
                )}
                ${preset && preset !== "none" && this._hasSettings()
                  ? html`<button
                      class="segment"
                      title="Preset"
                      @click=${() => (this._popup = "config")}
                    >
                      <ha-icon icon="mdi:star-outline"></ha-icon>
                      <span>${prettify(preset)}</span>
                    </button>`
                  : nothing}
              </div>`
            : nothing}
        </div>

        ${!controlsVisible
          ? nothing
          : html`<div class="controls">
          <button
            class="ctl accent"
            title="Lower temperature"
            .disabled=${unavailable}
            @click=${() => this._adjustTemp(-1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <button
            class="ctl accent"
            title="Raise temperature"
            .disabled=${unavailable}
            @click=${() => this._adjustTemp(1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
          ${stateObj.attributes.hvac_modes?.length
            ? html`<button
                class=${classMap({ ctl: true, on: !this._isOff, off: this._isOff })}
                title="Power (hold to choose mode)"
                style=${styleMap(this._isOff ? {} : { color: modeColor })}
                .disabled=${unavailable}
                @click=${this._powerPress}
                @pointerdown=${this._pressStart}
                @pointerup=${this._pressEnd}
                @pointerleave=${this._pressEnd}
                @pointercancel=${this._pressEnd}
                @contextmenu=${(e: Event) => e.preventDefault()}
              >
                <ha-icon
                  icon=${HVAC_MODE_ICONS[mode] ?? "mdi:thermostat"}
                ></ha-icon>
              </button>`
            : nothing}
          ${fanControl
            ? html`<button
                class="ctl"
                title="Fan speed (hold for all settings)"
                .disabled=${unavailable}
                @click=${() => this._cycleFan(fanControl)}
                @pointerdown=${this._pressStart}
                @pointerup=${this._pressEnd}
                @pointerleave=${this._pressEnd}
                @pointercancel=${this._pressEnd}
                @contextmenu=${(e: Event) => e.preventDefault()}
              >
                <ha-icon icon=${fanControl.segmentIcon}></ha-icon>
              </button>`
            : nothing}
          ${this._hasSettings()
            ? html`<button
                class="ctl"
                title="Settings"
                .disabled=${unavailable}
                @click=${() => (this._popup = "config")}
              >
                <ha-icon icon="mdi:dots-horizontal"></ha-icon>
              </button>`
            : nothing}
        </div>`}
        ${this._renderPopup(fanSections)}
      </ha-card>
    `;
  }

  private _formatNumber(value: number): string {
    return value.toLocaleString(this.hass?.language ?? "en", {
      maximumFractionDigits: 1,
    });
  }

  /* --------------------------- popups ------------------------------- */

  /**
   * One sheet holding every control the unit exposes — temperature, mode, fan,
   * louvres, presets and any extra entities. Wall panels have no room for the
   * controls inline, and splitting them across three popups meant hunting for
   * the right entry point; here everything is one scroll away from any button.
   */
  private _renderPopup(fanSections: FanSection[]) {
    if (!this._popup) return nothing;
    const close = () => (this._popup = null);

    const climate = this._stateObj!;
    const unavailable = climate.state === "unavailable";
    const title = this._config?.name ?? climate.attributes.friendly_name ?? "Settings";

    const modeColor = HVAC_MODE_COLORS[climate.state] ?? HVAC_MODE_COLORS.off;
    const inactive = this._isOff || unavailable;

    const body = html`
      <!-- The same readout as the card's face: measured temperatures and mode
           above, setpoint across the middle, fan and swing along the bottom. -->
      <div class="popup-lcd ${inactive ? "off" : ""}">
        <div class="lcd-top">
          <span class="temps">
            ${this._show("show_current_temperature") &&
            this._currentTemp !== undefined
              ? html`<span class="aux"
                  >Current ${this._formatNumber(this._currentTemp)}°</span
                >`
              : nothing}
            ${this._outdoorTemp !== undefined
              ? html`<span class="aux"
                  >Outside ${this._formatNumber(this._outdoorTemp)}°</span
                >`
              : nothing}
          </span>
          <span class="badge" style=${styleMap({ color: modeColor })}>
            <ha-icon
              icon=${HVAC_MODE_ICONS[climate.state] ?? "mdi:thermostat"}
            ></ha-icon>
            <span>${unavailable ? "Unavailable" : this._modeName(climate.state)}</span>
          </span>
        </div>
        <div class="popup-lcd-center">
          <button
            class="ctl accent"
            title="Lower temperature"
            .disabled=${unavailable}
            @click=${() => this._adjustTemp(-1)}
          >
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class=${classMap({ "temp-value": true, dimmed: inactive })}>
            ${unavailable || this._targetTemp === undefined
              ? "--"
              : this._formatNumber(this._targetTemp)}<span class="unit"
              >${this._unit}</span
            >
          </span>
          <button
            class="ctl accent"
            title="Raise temperature"
            .disabled=${unavailable}
            @click=${() => this._adjustTemp(1)}
          >
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
        ${fanSections.length
          ? html`<div class="lcd-status">
              ${fanSections.map(
                (s) => html`<span class="segment">
                  <ha-icon icon=${s.segmentIcon}></ha-icon>
                  <span>${inactive ? "—" : statusLabel(s.source.current ?? "—")}</span>
                </span>`
              )}
            </div>`
          : nothing}
      </div>

      <div class="section-title">Mode</div>
      <div class="chips">
        ${this._availableModes().map(
          (m) => html`<button
            class=${classMap({
              chip: true,
              "mode-chip": true,
              active: m === climate.state,
            })}
            style=${styleMap(
              m === climate.state ? { color: HVAC_MODE_COLORS[m] ?? "" } : {}
            )}
            @click=${() => this._setHvacMode(m)}
          >
            <ha-icon icon=${HVAC_MODE_ICONS[m] ?? "mdi:thermostat"}></ha-icon>
            ${this._modeName(m)}
          </button>`
        )}
      </div>

      ${fanSections.map(
        (s) => html`
          <div class="section-title">${s.title}</div>
          <div class="chips">
            ${s.source.options.map((o) => {
              // Only fan speeds get a glyph that carries their whole label;
              // no icon distinguishes "Vertical" from "Horizontal" swing.
              const carried = s.key === "fan" ? fanSpeedLabel(o) : null;
              return html`<button
                class=${classMap({
                  chip: true,
                  "chip-icon": carried !== null,
                  active: o === s.source.current,
                })}
                title=${prettify(o)}
                @click=${() => s.source.set(o)}
              >
                ${this._renderFanChipIcon(o, s.icon(o), carried)}
                ${carried === null ? prettify(o) : nothing}
              </button>`;
            })}
          </div>
        `
      )}
      ${this._renderSettingsBody()}
    `;

    return html`
      <dialog class="popup-backdrop" @click=${close} @close=${close}>
        <div
          class="popup"
          aria-label=${title}
          @click=${(e: Event) => e.stopPropagation()}
        >
          <div class="popup-header">
            <span>${title}</span>
            <button class="close" @click=${close}>
              <ha-icon icon="mdi:close"></ha-icon>
            </button>
          </div>
          <div class="popup-body">${body}</div>
        </div>
      </dialog>
    `;
  }

  /**
   * Drive the native dialog from [_popup].
   *
   * showModal() promotes the dialog to the browser's top layer, which sits above
   * every stacking context on the page. A plain z-index cannot work here: each
   * card in a Home Assistant grid establishes its own stacking context, so a
   * popup drawn inside one card is painted under any card that follows it.
   */
  protected updated(): void {
    const dialog = this._dialogEl;
    if (!dialog) return;
    if (this._popup && !dialog.open) {
      // Falls back to a non-modal open where showModal is missing (jsdom, and
      // any browser too old for the top layer) rather than throwing.
      if (typeof dialog.showModal === "function") dialog.showModal();
      else dialog.setAttribute("open", "");
    } else if (!this._popup && dialog.open) {
      if (typeof dialog.close === "function") dialog.close();
      else dialog.removeAttribute("open");
    }
  }

  /**
   * Material's fan icons stop at fan-speed-3, so a five-speed unit drew 1, 2
   * and 3 as numbered glyphs and 4 and 5 as a generic fan with the number
   * spelled out beside it — half the row numbered, half not, and wide enough
   * to wrap onto a second line. Every numeric speed is composed the same way
   * instead: a plain fan with its digit set into the corner, which holds for
   * however many speeds a unit reports.
   */
  private _renderFanChipIcon(
    _option: string,
    icon: string,
    carried: string | null
  ) {
    if (carried === null) {
      return html`<ha-icon icon=${icon}></ha-icon>`;
    }
    if (carried === "auto") {
      return html`<ha-icon icon="mdi:fan-auto"></ha-icon>`;
    }
    return html`<span class="fan-glyph">
      <ha-icon icon="mdi:fan"></ha-icon>
      <span class="fan-glyph-num">${carried}</span>
    </span>`;
  }

  private _renderSettingsBody() {
    const stateObj = this._stateObj!;
    const presets: string[] = stateObj.attributes.preset_modes ?? [];
    const entities = this._config?.setting_entities ?? [];
    return html`
      ${presets.length
        ? html`<div class="section-title">Preset</div>
            <div class="chips">
              ${presets.map(
                (p) => html`<button
                  class=${classMap({
                    chip: true,
                    active: p === stateObj.attributes.preset_mode,
                  })}
                  @click=${() =>
                    this.hass!.callService("climate", "set_preset_mode", {
                      entity_id: stateObj.entity_id,
                      preset_mode: p,
                    })}
                >
                  ${prettify(p)}
                </button>`
              )}
            </div>`
        : nothing}
      ${entities.map((item) => this._renderSettingRow(item))}
    `;
  }

  private _renderSettingRow(item: SettingEntity) {
    const entityId = typeof item === "string" ? item : item.entity;
    const nameOverride = typeof item === "string" ? undefined : item.name;
    const st = this.hass!.states[entityId];
    if (!st) {
      return html`<div class="row">
        <span class="row-name">${nameOverride ?? entityId}</span>
        <span class="row-missing">not found</span>
      </div>`;
    }
    const domain = entityId.split(".")[0];
    const name = nameOverride ?? st.attributes.friendly_name ?? entityId;

    if (["switch", "input_boolean", "light"].includes(domain)) {
      return html`<div class="row">
        <span class="row-name">${name}</span>
        <ha-switch
          .checked=${st.state === "on"}
          @change=${() =>
            this.hass!.callService("homeassistant", "toggle", {
              entity_id: entityId,
            })}
        ></ha-switch>
      </div>`;
    }

    if (["select", "input_select"].includes(domain)) {
      const serviceDomain = domain === "input_select" ? "input_select" : "select";
      const options: string[] = st.attributes.options ?? [];
      return html`<div class="row column">
        <span class="row-name">${name}</span>
        <div class="chips">
          ${options.map(
            (o) => html`<button
              class=${classMap({ chip: true, active: o === st.state })}
              @click=${() =>
                this.hass!.callService(serviceDomain, "select_option", {
                  entity_id: entityId,
                  option: o,
                })}
            >
              ${prettify(o)}
            </button>`
          )}
        </div>
      </div>`;
    }

    if (["number", "input_number"].includes(domain)) {
      const serviceDomain = domain === "input_number" ? "input_number" : "number";
      const value = parseFloat(st.state);
      const step = st.attributes.step ?? 1;
      const setValue = (v: number) =>
        this.hass!.callService(serviceDomain, "set_value", {
          entity_id: entityId,
          value: Math.min(
            st.attributes.max ?? Infinity,
            Math.max(st.attributes.min ?? -Infinity, v)
          ),
        });
      return html`<div class="row">
        <span class="row-name">${name}</span>
        <div class="stepper">
          <button class="ctl mini" @click=${() => setValue(value - step)}>
            <ha-icon icon="mdi:minus"></ha-icon>
          </button>
          <span class="stepper-value"
            >${st.state}${st.attributes.unit_of_measurement ?? ""}</span
          >
          <button class="ctl mini" @click=${() => setValue(value + step)}>
            <ha-icon icon="mdi:plus"></ha-icon>
          </button>
        </div>
      </div>`;
    }

    return html`<div class="row">
      <span class="row-name">${name}</span>
      <span>${this.hass!.formatEntityState?.(st) ?? st.state}</span>
    </div>`;
  }

  /* ------------------------------------------------------------------ */
  /* Styles                                                              */
  /* ------------------------------------------------------------------ */

  /* The LCD, the round buttons, the chips and the popup all come from the
     suite's shared sheet. What is left here is what only a climate card
     needs: the setpoint block inside the config sheet, and the four size
     variants that let one card serve a 4-column tile and a full-width strip. */
  static styles = [
    ...faceplateStyles,
    css`
      .temps {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: none;
      }

      /* A fan speed drawn rather than borrowed: a plain fan carrying its own
         digit, so every speed looks the same however many the unit has. */
      .fan-glyph {
        position: relative;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        flex: none;
      }
      .fan-glyph ha-icon {
        --mdc-icon-size: 20px;
      }
      .fan-glyph-num {
        position: absolute;
        right: -3px;
        bottom: -2px;
        font-size: 10px;
        font-weight: 700;
        line-height: 1;
        font-variant-numeric: tabular-nums;
      }

      /* ------------------ setpoint block in the sheet ----------------- */
      /* Mirrors the card's own LCD — same inset panel, same round temperature
         buttons — so the sheet reads as the card opened up rather than as a
         separate dialog. */
      .popup-lcd {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        padding: 7px 12px 5px;
        border-radius: var(--faceplate-radius);
        background: var(--faceplate-lcd-background);
        box-shadow: inset 0 1px 5px rgba(0, 0, 0, 0.12);
      }
      .popup-lcd .lcd-status {
        margin-top: 2px;
        padding-top: 4px;
      }
      .popup-lcd.off .segment {
        opacity: 0.55;
      }
      .popup-lcd-center {
        align-self: stretch;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;
      }
      .popup-lcd-center .ctl {
        width: 40px;
        flex: none;
      }
      .temp-value {
        font-size: 34px;
        font-weight: 300;
        font-variant-numeric: tabular-nums;
        line-height: 1.1;
        text-align: center;
        flex: 1;
      }
      .temp-value.dimmed,
      .temp-value.dimmed .unit {
        color: var(--disabled-text-color, var(--secondary-text-color));
      }
      .temp-value .unit {
        font-size: 14px;
      }

      /* -------------------------- layouts ----------------------------- */
      .layout-compact {
        --faceplate-readout-size: 30px;
        --faceplate-button-size: 42px;
        --faceplate-button-max: 52px;
        --faceplate-icon-size: 22px;
        padding: 8px;
        gap: 8px;
      }
      .layout-compact .lcd {
        padding: 6px 10px 4px;
      }
      .layout-compact .lcd-status {
        display: none;
      }
      .layout-compact .badge > span {
        display: none;
      }
      /* Single-line strip for wall panels that must fit a whole dashboard on
         one screen: the readout and the buttons share a row instead of
         stacking, so the card costs ~64px of height instead of ~190px. */
      .layout-row {
        /* Sized against the card's own height so a strip given two rows grows
           into them. It used to hold these fixed and centre the result, which
           on a two-row tile drew a thin ribbon of content in a tall box and
           looked like a mistake. The floors are the old fixed values, so a
           one-row strip is unchanged. */
        /* Height alone is the wrong bound. The controls are a nowrap row, so
           on a tall tile they grew until five buttons were wider than the card
           and slid over the readout. Whichever of the two axes runs out first
           wins; 11cqw is the share five buttons and the readout can agree on. */
        --faceplate-readout-size: clamp(26px, min(34cqh, 9cqw), 56px);
        --faceplate-button-size: clamp(38px, min(50cqh, 12cqw), 78px);
        --faceplate-button-max: clamp(42px, min(54cqh, 13cqw), 84px);
        --faceplate-icon-size: clamp(20px, min(26cqh, 6cqw), 40px);
        container-type: size;
        /* If this ever lands somewhere its height is indefinite, size
           containment would collapse it to nothing; this keeps it visible. */
        min-height: 52px;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        padding: clamp(6px, 6cqh, 12px) 8px;
        gap: 8px;
      }
      .layout-row .lcd {
        flex: 1 1 auto;
        min-width: 0;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
        padding: 4px 10px;
      }
      /* Name over the measured temperature, so the setpoint keeps the eye. */
      .layout-row .lcd-top {
        flex-direction: column;
        align-items: flex-start;
        align-self: center;
        gap: 0;
        flex: 1 1 auto;
        min-width: 0;
      }
      .layout-row .temps {
        gap: 8px;
      }
      .layout-row .lcd-center {
        flex: none;
        gap: 6px;
      }
      .layout-row .lcd-status {
        display: none;
      }
      .layout-row .badge > span {
        display: none;
      }
      /* On a one-row strip the buttons must not wrap — wrapping is what makes
         the card tall, and tall is the thing this layout exists to avoid. */
      .layout-row .controls {
        display: flex;
        flex-wrap: nowrap;
        gap: 5px;
        flex: none;
      }
      .layout-row .ctl {
        width: var(--faceplate-button-size, 38px);
        flex: none;
      }
      /* Given two rows or more, the strip stops being a strip: the readout
         takes the full height on the left and the controls wrap into a block
         beside it, which is both how the space gets used and how the buttons
         get big enough to hit. Below this height nothing changes. */
      @container (min-height: 88px) {
        .layout-row .lcd {
          align-self: stretch;
          /* Stacked, not side by side. Side by side the name and the setpoint
             were competing for a pane barely 190px wide and ran over each
             other. */
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          gap: 2px;
        }
        .layout-row .lcd-center {
          order: 1;
        }
        .layout-row .lcd-top {
          order: 2;
          flex: none;
          align-self: stretch;
          flex-direction: row;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
        }
        /* A real grid rather than a wrapped row: wrapping left the last two
           buttons hanging off one end, which is the sort of thing that reads
           as a bug even when it is only a shrug. Three columns, so five
           controls sit in fixed positions with one empty cell. */
        .layout-row .controls {
          display: grid;
          grid-template-columns: repeat(3, var(--faceplate-button-max, 42px));
          justify-content: end;
          align-content: center;
          gap: 5px;
          max-width: none;
        }
        /* There is room for the fan, swing and preset readouts here, and the
           one-line strip has to hide them. This is the layout that can afford
           to say what the unit is actually doing. */
        .layout-row .lcd-status {
          display: flex;
          order: 3;
          flex-wrap: wrap;
          gap: 4px 10px;
          padding-top: 4px;
          border-top: 1px solid var(--divider-color, rgba(127, 127, 127, 0.25));
          align-self: stretch;
        }
        .layout-row .badge > span {
          display: inline;
        }
        .layout-row .ctl {
          width: var(--faceplate-button-max, 42px);
          height: var(--faceplate-button-max, 42px);
        }
      }

      .layout-large {
        --faceplate-readout-size: 52px;
        --faceplate-button-size: 56px;
        --faceplate-button-max: 72px;
        --faceplate-icon-size: 28px;
        padding: 14px;
        gap: 12px;
      }
      .layout-large .lcd {
        padding: 12px 18px 8px;
      }
      .layout-large .name {
        font-size: 14px;
      }
      .layout-large .aux {
        font-size: 13px;
      }
      .layout-large .badge {
        font-size: 15px;
      }
      .layout-large .segment {
        font-size: 12px;
      }

      /* ------------- status-only display (show_controls: false) -------- */
      .display-only .lcd {
        --faceplate-readout-size: 64px;
        gap: 4px;
        padding: 12px 16px 10px;
      }
      .display-only .name {
        font-size: 14px;
      }
      .display-only .badge {
        font-size: 16px;
      }
      .display-only .badge ha-icon {
        --mdc-icon-size: 22px;
      }
      .display-only .badge > span {
        display: inline;
      }
      .display-only .aux {
        font-size: 13px;
      }
      .display-only .temps {
        display: flex;
      }
      .display-only .lcd-status {
        display: flex;
        font-size: 13px;
      }
      .display-only .segment {
        font-size: 13px;
      }
      .display-only .segment ha-icon {
        --mdc-icon-size: 17px;
      }
      /* Half-width status tiles: three rows have to sit inside roughly 96px of
         card, so the setpoint gives up size before anything overflows the LCD. */
      @container (max-width: 300px) {
        .display-only .lcd {
          --faceplate-readout-size: 38px;
          padding: 6px 10px;
          gap: 1px;
        }
        .display-only .name {
          font-size: 12px;
        }
        .display-only .aux {
          font-size: 11px;
        }
        .display-only .badge {
          font-size: 13px;
        }
        .display-only .badge ha-icon {
          --mdc-icon-size: 18px;
        }
        .display-only .badge > span {
          display: none;
        }
        .display-only .segment {
          font-size: 10px;
        }
        .display-only .segment ha-icon {
          --mdc-icon-size: 12px;
        }
      }
      @container (max-width: 200px) {
        .display-only .lcd {
          --faceplate-readout-size: 40px;
        }
        .display-only .lcd-status {
          gap: 0 8px;
        }
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "faceplate-climate-card": FaceplateClimateCard;
  }
}
