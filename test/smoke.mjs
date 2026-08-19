import { JSDOM } from "jsdom";

const dom = new JSDOM("<!doctype html><html><body></body></html>", {
  url: "http://localhost/",
  pretendToBeVisual: true,
});

for (const key of Object.getOwnPropertyNames(dom.window)) {
  if (!(key in globalThis)) {
    try {
      globalThis[key] = dom.window[key];
    } catch {
      /* read-only */
    }
  }
}
globalThis.window = dom.window;
globalThis.document = dom.window.document;

// Node ships its own Event/CustomEvent, and jsdom rejects events built by a
// different realm. The loop above skips them because they already exist, so
// overwrite them explicitly or every dispatchEvent in the bundle throws.
for (const key of ["Event", "CustomEvent", "HTMLElement", "Element", "Node"]) {
  globalThis[key] = dom.window[key];
}

const calls = [];
const subscriptions = [];

const hass = {
  language: "en",
  locale: { language: "en", time_format: "24" },
  config: { unit_system: { temperature: "°C" } },
  localize: () => "",
  callService: (domain, service, data) => {
    calls.push([domain, service, data]);
    return Promise.resolve();
  },
  connection: {
    subscribeMessage: async (callback, message) => {
      subscriptions.push({ callback, message });
      return async () => {};
    },
  },
  states: {
    "climate.living_room_ac": {
      entity_id: "climate.living_room_ac",
      state: "cool",
      attributes: {
        friendly_name: "Living Room AC",
        temperature: 23,
        current_temperature: 26.4,
        min_temp: 16,
        max_temp: 30,
        target_temp_step: 0.5,
        hvac_modes: ["off", "cool", "heat", "dry", "fan_only", "auto"],
        fan_modes: ["auto", "low", "medium", "high"],
        fan_mode: "auto",
        swing_modes: ["off", "on"],
        swing_mode: "off",
      },
    },
    "light.kitchen": {
      entity_id: "light.kitchen",
      state: "on",
      attributes: {
        friendly_name: "Kitchen",
        brightness: 128,
        supported_color_modes: ["color_temp", "hs"],
        color_temp_kelvin: 3000,
        min_color_temp_kelvin: 2000,
        max_color_temp_kelvin: 6500,
        rgb_color: [255, 180, 100],
      },
    },
    "switch.balcony": {
      entity_id: "switch.balcony",
      state: "off",
      attributes: { friendly_name: "Balcony Light" },
    },
    "script.fan_speed_2": {
      entity_id: "script.fan_speed_2",
      state: "off",
      attributes: { friendly_name: "Fan Speed 2" },
    },
    "weather.home": {
      entity_id: "weather.home",
      state: "partlycloudy",
      attributes: {
        friendly_name: "Home",
        temperature: 29,
        temperature_unit: "°C",
        humidity: 74,
        wind_speed: 12,
        wind_speed_unit: "km/h",
      },
    },
  },
};

await import("../dist/faceplate-cards.js");

let failures = 0;
const assert = (cond, msg) => {
  if (!cond) {
    console.error("FAIL:", msg);
    failures += 1;
    process.exitCode = 1;
  } else {
    console.log("ok:", msg);
  }
};

/** Mount a card, wait for its first render, and hand back its shadow root. */
async function mount(tag, config) {
  const card = document.createElement(tag);
  card.setConfig(config);
  card.hass = hass;
  document.body.appendChild(card);
  await card.updateComplete;
  return { card, root: card.shadowRoot };
}

/** Visible text only: jsdom exposes Lit's stylesheets as <style> elements,
 *  whose CSS would otherwise swamp every textContent assertion. */
const text = (root) =>
  [...root.childNodes]
    .filter((n) => n.nodeName !== "STYLE")
    .map((n) => n.textContent ?? "")
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();

/* ---------------------------------------------------------------- suite */

const EXPECTED_CARDS = [
  "faceplate-climate-card",
  "faceplate-button-card",
  "faceplate-tile-card",
  "faceplate-light-card",
  "faceplate-clock-card",
  "faceplate-weather-card",
  "faceplate-banner-card",
];

for (const type of EXPECTED_CARDS) {
  assert(
    customElements.get(type) !== undefined,
    `${type} is defined as a custom element`
  );
}

assert(
  EXPECTED_CARDS.every((type) =>
    (window.customCards ?? []).some((c) => c.type === type)
  ),
  "every card appears in the card picker"
);

/* --------------------------------------------------------------- climate */
{
  const { card, root } = await mount("faceplate-climate-card", {
    type: "custom:faceplate-climate-card",
    entity: "climate.living_room_ac",
  });
  assert(root.querySelector(".lcd") !== null, "climate: renders an LCD");
  assert(text(root).includes("23"), "climate: shows the setpoint");
  assert(
    root.querySelector(".readout") !== null,
    "climate: setpoint uses the shared readout class"
  );
  assert(
    root.querySelector(".badge") !== null,
    "climate: mode uses the shared badge class"
  );
  assert(
    root.querySelectorAll(".ctl.accent").length === 2,
    "climate: both temperature buttons use the shared accent class"
  );

  calls.length = 0;
  root.querySelector(".ctl.on").click();
  await card.updateComplete;
  assert(
    calls.some(
      ([d, s, data]) => d === "climate" && s === "set_hvac_mode" && data.hvac_mode === "off"
    ),
    "climate: pressing power while running turns the unit off"
  );
}

/* ---------------------------------------------------------------- button */
{
  const { card, root } = await mount("faceplate-button-card", {
    type: "custom:faceplate-button-card",
    entity: "switch.balcony",
    icon: "mdi:string-lights",
    show_name: false,
    tap_action: { action: "toggle" },
  });
  assert(root.querySelector(".ctl.fill") !== null, "button: renders one filling button");
  assert(
    root.querySelector("ha-icon").getAttribute("icon") === "mdi:string-lights",
    "button: uses the configured icon"
  );

  calls.length = 0;
  root.querySelector(".ctl").click();
  await card.updateComplete;
  await new Promise((r) => setTimeout(r, 20));
  assert(
    calls.some(([d, s]) => d === "homeassistant" && s === "toggle"),
    "button: tap toggles the entity"
  );
}

{
  // A navigation button has no entity at all — the card must still configure.
  const { card, root } = await mount("faceplate-button-card", {
    type: "custom:faceplate-button-card",
    icon: "mdi:grid",
    tap_action: { action: "navigate", navigation_path: "/dashboard-all" },
  });
  root.querySelector(".ctl").click();
  await card.updateComplete;
  await new Promise((r) => setTimeout(r, 20));
  assert(
    window.location.pathname === "/dashboard-all",
    "button: navigate action changes the location"
  );
}

/* ------------------------------------------------------------------ tile */
{
  const { card, root } = await mount("faceplate-tile-card", {
    type: "custom:faceplate-tile-card",
    entity: "script.fan_speed_2",
    name: "2",
  });
  assert(text(root).includes("2"), "tile: shows its name");

  calls.length = 0;
  root.querySelector(".ctl").click();
  await card.updateComplete;
  assert(
    calls.some(([d, s]) => d === "script" && s === "turn_on"),
    "tile: pressing the icon runs a script rather than toggling it"
  );
}

/* ----------------------------------------------------------------- light */
{
  const { root } = await mount("faceplate-light-card", {
    type: "custom:faceplate-light-card",
    entity: "light.kitchen",
    show_color_temp_control: true,
  });
  assert(text(root).includes("50"), "light: shows brightness as a percentage");
  assert(
    root.querySelectorAll("faceplate-slider").length === 2,
    "light: renders brightness and warmth sliders"
  );

  const slider = root.querySelector("faceplate-slider");
  calls.length = 0;
  slider.dispatchEvent(
    new dom.window.CustomEvent("slider-change", {
      detail: { value: 75 },
      bubbles: true,
      composed: true,
    })
  );
  assert(
    calls.some(
      ([d, s, data]) => d === "light" && s === "turn_on" && data.brightness_pct === 75
    ),
    "light: the brightness slider calls light.turn_on"
  );
}

/* ------------------------------------------------- light with a ceiling */
{
  const { root } = await mount("faceplate-light-card", {
    type: "custom:faceplate-light-card",
    entity: "light.kitchen",
    max_brightness: 60,
  });

  // The fixture sits at 128/255 — half output, so five sixths of a 60% ceiling.
  assert(
    text(root).includes("84"),
    `light: the readout is a share of the ceiling, not of full output (got "${text(root)}")`
  );

  // The point of rescaling rather than clipping: the top of the slider still
  // moves the light, and every position maps somewhere different.
  const slider = root.querySelector("faceplate-slider");
  const sent = (value) => {
    calls.length = 0;
    slider.dispatchEvent(
      new dom.window.CustomEvent("slider-change", {
        detail: { value },
        bubbles: true,
        composed: true,
      })
    );
    return calls.find(([d, s]) => d === "light" && s === "turn_on")?.[2]
      ?.brightness_pct;
  };

  assert(sent(100) === 60, `light: the card's 100% is 60% output (got ${sent(100)})`);
  assert(sent(50) === 30, `light: the card's 50% is 30% output (got ${sent(50)})`);
  assert(sent(80) === 48, `light: 80% scales to 48% output (got ${sent(80)})`);
}

/* ------------------------------- light driven past its ceiling elsewhere */
{
  const light = hass.states["light.kitchen"];
  const original = light.attributes.brightness;
  light.attributes.brightness = 255;

  const { root } = await mount("faceplate-light-card", {
    type: "custom:faceplate-light-card",
    entity: "light.kitchen",
    max_brightness: 60,
  });
  assert(
    text(root).includes("100") && !text(root).includes("166"),
    `light: output past the ceiling reads 100%, not above it (got "${text(root)}")`
  );

  light.attributes.brightness = original;
}

/* ----------------------------------------------------------------- clock */
{
  const { root } = await mount("faceplate-clock-card", {
    type: "custom:faceplate-clock-card",
    show_date: true,
  });
  assert(
    /\d{1,2}:\d{2}/.test(text(root)),
    "clock: renders a time in hours and minutes"
  );
}

/* ---------------------------------------------------- clock with weather */
{
  // Two cards now subscribe with identical messages, so each block has to
  // look only at the subscriptions its own mount opened.
  const from = subscriptions.length;
  const { card, root } = await mount("faceplate-clock-card", {
    type: "custom:faceplate-clock-card",
    show_date: true,
    weather_entity: "weather.home",
  });

  const sub = subscriptions.slice(from).find(
    (s) =>
      s.message.type === "weather/subscribe_forecast" &&
      s.message.entity_id === "weather.home" &&
      s.message.forecast_type === "daily"
  );
  assert(sub !== undefined, "clock: subscribes to the daily forecast");

  sub.callback({
    forecast: [
      { datetime: "2026-08-19T00:00:00+08:00", condition: "rainy", temperature: 31, templow: 26 },
      { datetime: "2026-08-20T00:00:00+08:00", condition: "sunny", temperature: 33, templow: 27 },
    ],
  });
  await card.updateComplete;

  // Today's high and low, not tomorrow's and not the reading right now (29).
  assert(
    text(root).includes("31°/26°"),
    `clock: shows today's high and low (got "${text(root)}")`
  );
  assert(
    root.querySelector(".weather ha-icon")?.getAttribute("icon") ===
      "mdi:weather-rainy",
    "clock: the icon follows today's forecast condition"
  );
  assert(
    root.querySelector(".sub .date") !== null &&
      root.querySelector(".sub .weather") !== null,
    "clock: date and weather share one line under the figures"
  );
}

/* --------------------------------------- clock with weather switched off */
{
  const { root } = await mount("faceplate-clock-card", {
    type: "custom:faceplate-clock-card",
    weather_entity: "weather.home",
    show_weather: false,
  });
  assert(
    root.querySelector(".weather") === null,
    "clock: show_weather false drops the readout"
  );
}

/* -------------------------------- clock with a weather entity that is gone */
{
  const { root } = await mount("faceplate-clock-card", {
    type: "custom:faceplate-clock-card",
    weather_entity: "weather.does_not_exist",
  });
  assert(
    /\d{1,2}:\d{2}/.test(text(root)) && root.querySelector(".weather") === null,
    "clock: a missing weather entity leaves the clock itself working"
  );
}

/* --------------------------------------------------------------- weather */
{
  const from = subscriptions.length;
  const { card, root } = await mount("faceplate-weather-card", {
    type: "custom:faceplate-weather-card",
    entity: "weather.home",
    secondary_info: ["humidity", "wind"],
  });
  assert(text(root).includes("29"), "weather: shows the current temperature");
  assert(text(root).includes("74%"), "weather: shows the humidity");

  const sub = subscriptions
    .slice(from)
    .find((s) => s.message.type === "weather/subscribe_forecast");
  assert(sub !== undefined, "weather: subscribes to the forecast");

  sub.callback({
    forecast: [
      { datetime: "2026-08-20T00:00:00+08:00", condition: "sunny", temperature: 33, templow: 27 },
      { datetime: "2026-08-21T00:00:00+08:00", condition: "rainy", temperature: 30, templow: 26 },
    ],
  });
  await card.updateComplete;
  assert(
    root.querySelectorAll(".slot").length === 2,
    "weather: renders a slot per forecast entry"
  );
  assert(text(root).includes("33"), "weather: forecast shows the high");
}

/* ---------------------------------------------------------------- banner */
{
  const { card, root } = await mount("faceplate-banner-card", {
    type: "custom:faceplate-banner-card",
    content: "{{ now().strftime('%H:%M') }}",
    severity: "alert",
  });
  const sub = subscriptions.find((s) => s.message.type === "render_template");
  assert(sub !== undefined, "banner: subscribes to the template");

  // Markup from a markdown-card era template must come through as plain text.
  sub.callback({ result: "<center><b><font color=red size=5>Palm needs watering</font></b></center>" });
  await card.updateComplete;
  assert(
    text(root) === "Palm needs watering",
    `banner: strips markup from the rendered template (got "${text(root)}")`
  );
  assert(
    card.dataset.severity === "alert",
    "banner: severity drives the styling rather than inline font tags"
  );
}

/* --------------------------------------------------------- missing entity */
{
  const { root } = await mount("faceplate-tile-card", {
    type: "custom:faceplate-tile-card",
    entity: "light.does_not_exist",
  });
  assert(
    text(root).includes("Entity not found"),
    "a missing entity renders a readable card rather than throwing"
  );
}

console.log(failures === 0 ? "\nAll smoke tests passed" : `\n${failures} failed`);

// The clock card keeps a timer running for as long as it is mounted, which
// would hold the process open long after the assertions are done.
process.exit(failures === 0 ? 0 : 1);
