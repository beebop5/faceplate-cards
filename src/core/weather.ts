import type { HomeAssistant } from "./types";

export interface ForecastItem {
  datetime: string;
  condition?: string;
  temperature?: number;
  templow?: number;
  precipitation_probability?: number;
}

export type ForecastType = "daily" | "hourly" | "twice_daily";

/** Home Assistant's weather conditions, in the suite's icon set. */
export const CONDITION_ICONS: Record<string, string> = {
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

export function weatherIcon(condition?: string): string {
  return CONDITION_ICONS[condition ?? ""] ?? "mdi:weather-cloudy";
}

/**
 * A `weather/subscribe_forecast` subscription that follows a card's config.
 *
 * Forecasts arrive by subscription rather than as an attribute — Home
 * Assistant stopped shipping `attributes.forecast` in 2024.4 because pushing a
 * full forecast into every state update was expensive. The attribute is still
 * read as a fallback for older integrations.
 *
 * Shared because both the weather card and the clock's inline readout need the
 * same lifecycle: resubscribe when the entity or forecast type changes, do
 * nothing when neither did, and survive the socket going away underneath.
 */
export class ForecastSubscription {
  private _unsubscribe?: () => Promise<void>;
  private _key?: string;

  constructor(private readonly _onForecast: (forecast: ForecastItem[]) => void) {}

  /** Call from `updated()`; it is a no-op while the inputs stay the same. */
  public async sync(
    hass: HomeAssistant | undefined,
    entityId: string | undefined,
    forecastType: ForecastType = "daily",
    enabled = true
  ): Promise<void> {
    if (!hass?.connection || !entityId) return;
    if (!enabled) {
      await this.stop();
      return;
    }

    const key = `${entityId}|${forecastType}`;
    if (this._key === key) return;

    await this.stop();
    this._key = key;

    const fallback = hass.states[entityId]?.attributes.forecast;
    if (Array.isArray(fallback)) this._onForecast(fallback);

    try {
      this._unsubscribe = await hass.connection.subscribeMessage(
        (msg: { forecast?: ForecastItem[] }) => {
          if (msg.forecast) this._onForecast(msg.forecast);
        },
        {
          type: "weather/subscribe_forecast",
          forecast_type: forecastType,
          entity_id: entityId,
        }
      );
    } catch {
      // An integration with no forecast support just leaves the strip empty.
      this._key = undefined;
    }
  }

  public async stop(): Promise<void> {
    const unsub = this._unsubscribe;
    this._unsubscribe = undefined;
    this._key = undefined;
    try {
      await unsub?.();
    } catch {
      /* the socket went away with the subscription */
    }
  }
}
