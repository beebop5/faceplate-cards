import { LitElement, html, nothing } from "lit";
import { property, state } from "lit/decorators.js";
import { faceplateStyles } from "./styles";
import type { FaceplateBaseConfig, HassEntity, HomeAssistant } from "./types";

/**
 * Shared plumbing for every card in the suite: the hass/config properties
 * Home Assistant sets, the entity lookup, the "not found" card, and the
 * design-system stylesheet. Subclasses render; nothing else needs repeating.
 */
export abstract class FaceplateCard<
  C extends FaceplateBaseConfig = FaceplateBaseConfig,
> extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() protected _config?: C;

  static styles = faceplateStyles;

  /** Domains this card accepts, or undefined to accept anything. */
  protected static entityDomains?: string[];

  /** false for cards that don't need an entity at all (clock, banner). */
  protected static requiresEntity = true;

  public setConfig(config: C): void {
    const ctor = this.constructor as typeof FaceplateCard;
    if (ctor.requiresEntity) {
      const domains = ctor.entityDomains;
      const domain = config.entity?.split(".")[0];
      if (!config.entity || (domains && !domains.includes(domain!))) {
        throw new Error(
          domains
            ? `Please define a ${domains.join(" or ")} entity`
            : "Please define an entity"
        );
      }
    }
    this._config = config;
  }

  public getCardSize(): number {
    return 2;
  }

  protected get _stateObj(): HassEntity | undefined {
    return this._config?.entity && this.hass
      ? this.hass.states[this._config.entity]
      : undefined;
  }

  /** Config booleans default to on, so cards only need `show_x: false`. */
  protected _show(key: keyof C): boolean {
    return this._config?.[key] !== false;
  }

  protected _missingEntity() {
    return html`<ha-card class="error">
      Entity not found: ${this._config?.entity}
    </ha-card>`;
  }

  /** Guard shared by every render(): bail quietly before setConfig, and show
   *  a readable card when the entity has gone away.
   *
   *  "No entity" and "an entity that isn't there" are different things. A tile
   *  that only navigates has nothing to look up and is fine; a card naming an
   *  entity that does not resolve is a typo, and saying so beats rendering an
   *  empty tile that looks fine and does nothing. `requiresEntity` decides
   *  whether an entity is mandatory, not whether a named one may go missing. */
  protected _guard(): typeof nothing | ReturnType<typeof html> | null {
    if (!this._config || !this.hass) return nothing;
    const ctor = this.constructor as typeof FaceplateCard;
    const named = Boolean(this._config.entity);
    if (!this._stateObj && (ctor.requiresEntity || named)) {
      return this._missingEntity();
    }
    return null;
  }
}
