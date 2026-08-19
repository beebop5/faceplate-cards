/**
 * Renders the card configurations that were written into the six
 * `nspanelpro-*-dev` dashboards, against entity states captured from the live
 * Home Assistant instance.
 *
 * The smoke tests prove each card works against tidy synthetic entities. This
 * proves the configs actually deployed work against the messy real ones —
 * climate entities reporting a fan_mode outside their own fan_modes list, a
 * single swing select covering both axes, a weather entity with no humidity.
 */
import { readFileSync } from "node:fs";
import {
  calls,
  dom,
  finish,
  makeAssert,
  makeHass,
  mount,
  subscriptions,
  text,
} from "./harness.mjs";

const { states } = JSON.parse(
  readFileSync(new URL("./fixtures/live-states.json", import.meta.url))
);
const hass = makeHass(states);

await import("../dist/faceplate-cards.js");

const { assert, state } = makeAssert();

/** Mount and fail loudly rather than letting an exception kill the run. */
async function render(label, tag, config) {
  try {
    const mounted = await mount(tag, config, hass);
    assert(true, `${label}: renders`);
    return mounted;
  } catch (err) {
    assert(false, `${label}: renders — threw ${err.message}`);
    return { card: null, root: null };
  }
}

/* ------------------------------------------------ climate, as deployed */

{
  // nspanelpro-f-d-dev: the thermostat clones, with the hvac_modes lifted out
  // of the original card's climate-hvac-modes feature.
  const { root } = await render(
    "f-d Living Room Left",
    "faceplate-climate-card",
    {
      type: "custom:faceplate-climate-card",
      entity: "climate.rc_livingroom1_ac_lr1",
      name: "Living Room Left",
      hvac_modes: ["off", "cool"],
      default_mode: "cool",
    }
  );
  assert(text(root).includes("23.5"), "f-d Living Room Left: shows the setpoint");
  assert(text(root).includes("23"), "f-d Living Room Left: shows the room temperature");

  // swing_modes here is a single select covering both axes; the card should
  // detect that and label it "Swing" rather than "Vertical swing".
  const segments = [...root.querySelectorAll(".segment")].map((s) => s.title);
  assert(
    segments.includes("Swing"),
    `f-d Living Room Left: combined swing detected (segments: ${segments.join(", ")})`
  );
}

{
  // The unit is off — the setpoint should grey out and the derived readouts
  // should stop reporting stale fan and swing values.
  const { root } = await render("f-d Living Room Right", "faceplate-climate-card", {
    type: "custom:faceplate-climate-card",
    entity: "climate.rc_livingroom2_ac_lr2",
    name: "Living Room Right",
    hvac_modes: ["off", "cool"],
    default_mode: "cool",
  });
  assert(
    root.querySelector(".readout.dimmed") !== null,
    "f-d Living Room Right: setpoint dims while the unit is off"
  );
  assert(
    root.querySelector(".ctl.off") !== null,
    "f-d Living Room Right: power button reads as off"
  );

  calls.length = 0;
  root.querySelector(".ctl.off").click();
  assert(
    calls.some(
      ([d, s, data]) =>
        d === "climate" && s === "set_hvac_mode" && data.hvac_mode === "cool"
    ),
    "f-d Living Room Right: a short press turns on to the configured default_mode"
  );
}

{
  // nspanelpro-kitchen-dev: status-only tiles, half the grid wide.
  const { root } = await render("kitchen Aircon Left", "faceplate-climate-card", {
    type: "custom:faceplate-climate-card",
    entity: "climate.rc_livingroom1_ac_lr1",
    name: "Aircon Left",
    show_controls: false,
    layout: "standard",
    default_mode: "cool",
    hvac_modes: ["off", "cool"],
  });
  assert(
    root.querySelector(".controls") === null,
    "kitchen Aircon Left: show_controls false hides every button"
  );
  assert(
    root.querySelector("ha-card").classList.contains("display-only"),
    "kitchen Aircon Left: card takes the status-only layout"
  );
  assert(
    root.querySelector(".lcd").classList.contains("tappable"),
    "kitchen Aircon Left: the display becomes the way into the config sheet"
  );
}

{
  // nspanelpro-bedroom-dev: the mushroom-climate clone, as a single-line strip.
  const { root } = await render("bedroom strip", "faceplate-climate-card", {
    type: "custom:faceplate-climate-card",
    entity: "climate.rc_bedroom_ac_bd",
    show_name: false,
    layout: "row",
  });
  assert(
    root.querySelector("ha-card").classList.contains("layout-row"),
    "bedroom strip: takes the row layout"
  );
  assert(
    root.querySelector(".name") === null,
    "bedroom strip: show_name false drops the name"
  );
}

{
  // nspanelpro-bedside-dev: the full remote, with an outdoor sensor and a
  // restricted mode list that deliberately omits "off".
  const { root } = await render("bedside Bedroom", "faceplate-climate-card", {
    type: "custom:faceplate-climate-card",
    entity: "climate.rc_bedroom_ac_bd",
    name: "Bedroom",
    hvac_modes: ["cool", "fan_only", "dry"],
    outdoor_temperature_entity: "sensor.rc_bedroom_ac_outside_temp",
  });
  assert(
    text(root).includes("Outside 30"),
    "bedside Bedroom: shows the outdoor temperature from its sensor"
  );
}

/* ------------------------------------------------- buttons, as deployed */

{
  // nspanelpro-f-d-dev FAN 1: a perform-action aimed at a device rather than
  // an entity — the target has to survive intact.
  const { root } = await render("f-d FAN 1", "faceplate-button-card", {
    type: "custom:faceplate-button-card",
    show_name: false,
    show_icon: true,
    name: "FAN 1",
    icon: "mdi:fan-off",
    tap_action: {
      action: "perform-action",
      perform_action: "switch.turn_off",
      target: { device_id: "dffe005455a87e6f7f47616fa40708ac" },
    },
  });

  calls.length = 0;
  root.querySelector(".ctl").click();
  await new Promise((r) => setTimeout(r, 20));
  const call = calls.find(([d, s]) => d === "switch" && s === "turn_off");
  assert(call !== undefined, "f-d FAN 1: performs switch.turn_off");
  assert(
    call?.[3]?.device_id === "dffe005455a87e6f7f47616fa40708ac",
    "f-d FAN 1: passes the device_id target through untouched"
  );
}

{
  // nspanelpro-f-d-dev: entity, no tap_action — should fall back to toggling.
  const { root } = await render("f-d countertop", "faceplate-button-card", {
    type: "custom:faceplate-button-card",
    show_name: false,
    show_icon: true,
    icon: "mdi:countertop",
    entity: "switch.kitchen_righta_left",
  });

  calls.length = 0;
  root.querySelector(".ctl").click();
  await new Promise((r) => setTimeout(r, 20));
  assert(
    calls.some(([d, s]) => d === "homeassistant" && s === "toggle"),
    "f-d countertop: a button with an entity and no action toggles it"
  );
}

{
  // An "on" switch should tint its button rather than sit grey.
  const { root } = await render("bedside wardrobe", "faceplate-button-card", {
    type: "custom:faceplate-button-card",
    show_name: false,
    show_icon: true,
    icon: "mdi:wardrobe",
    entity: "switch.wardrobe_lights",
  });
  assert(
    root.querySelector(".ctl.on") !== null,
    "bedside wardrobe: an on switch lights its button"
  );
}

/* ---------------------------------------------------- tiles, as deployed */

{
  // nspanelpro-kitchen-dev fan view: a script tile.
  const { root } = await render("kitchen fan 2", "faceplate-tile-card", {
    type: "custom:faceplate-tile-card",
    entity: "script.living_room_fan_2",
    name: "2",
    icon: "mdi:fan-speed-2",
    show_state: false,
    vertical: false,
    tap_action: {
      action: "perform-action",
      perform_action: "script.living_room_fan_2",
      target: {},
    },
  });
  assert(text(root).includes("2"), "kitchen fan 2: shows its name");
  assert(
    !text(root).toLowerCase().includes("off"),
    "kitchen fan 2: show_state false hides the script's idle state"
  );

  calls.length = 0;
  root.querySelector(".ctl").click();
  assert(
    calls.some(([d, s]) => d === "script" && s === "turn_on"),
    "kitchen fan 2: pressing the icon runs the script"
  );
}

/* ---------------------------------------------------- light, as deployed */

{
  const { root } = await render("kitchen skylines", "faceplate-light-card", {
    type: "custom:faceplate-light-card",
    entity: "light.living_room_skylines",
    show_brightness_control: true,
    show_color_temp_control: true,
    use_light_color: true,
  });
  // 69/255 rounds to 27%.
  assert(text(root).includes("27"), "kitchen skylines: shows brightness as 27%");
  assert(
    root.querySelectorAll("faceplate-slider").length === 2,
    "kitchen skylines: renders both sliders — the light supports color_temp"
  );

  const [brightness] = root.querySelectorAll("faceplate-slider");
  calls.length = 0;
  brightness.dispatchEvent(
    new dom.window.CustomEvent("slider-change", {
      detail: { value: 60 },
      bubbles: true,
      composed: true,
    })
  );
  assert(
    calls.some(
      ([d, s, data]) => d === "light" && s === "turn_on" && data.brightness_pct === 60
    ),
    "kitchen skylines: the brightness slider calls light.turn_on"
  );
}

/* -------------------------------------------------- weather, as deployed */

{
  const { card, root } = await render("office weather", "faceplate-weather-card", {
    type: "custom:faceplate-weather-card",
    entity: "weather.home",
    show_current: false,
    show_forecast: true,
    forecast_type: "daily",
  });

  const sub = subscriptions.find(
    (s) =>
      s.message.type === "weather/subscribe_forecast" &&
      s.message.entity_id === "weather.home"
  );
  assert(sub !== undefined, "office weather: subscribes to the daily forecast");

  sub.callback({
    forecast: [
      { datetime: "2026-08-20T00:00:00+08:00", condition: "rainy", temperature: 31, templow: 27 },
      { datetime: "2026-08-21T00:00:00+08:00", condition: "sunny", temperature: 33, templow: 28 },
      { datetime: "2026-08-22T00:00:00+08:00", condition: "cloudy", temperature: 32, templow: 27 },
    ],
  });
  await card.updateComplete;
  assert(
    root.querySelectorAll(".slot").length === 3,
    "office weather: renders the forecast strip"
  );
}

{
  // weather.home publishes no humidity. Left unconfigured the card must fall
  // back to a reading this entity actually has rather than an empty line.
  const { root } = await render("weather aux (default)", "faceplate-weather-card", {
    type: "custom:faceplate-weather-card",
    entity: "weather.home",
    show_forecast: false,
  });
  assert(
    root.querySelector(".aux").textContent.trim().startsWith("Wind"),
    `weather aux: default falls back past the missing humidity to wind (got "${root
      .querySelector(".aux")
      .textContent.trim()}")`
  );

  const { root: windRoot } = await render("weather aux (wind)", "faceplate-weather-card", {
    type: "custom:faceplate-weather-card",
    entity: "weather.home",
    show_forecast: false,
    secondary_info: ["wind"],
  });
  assert(
    text(windRoot).includes("Wind 28 km/h"),
    `weather aux: wind reads from this entity (got "${text(windRoot)}")`
  );
}

/* --------------------------------------------------- banner, as deployed */

{
  const { card, root } = await render("kitchen header", "faceplate-banner-card", {
    type: "custom:faceplate-banner-card",
    content: "{{ now().strftime('%H:%M') }}   {{ now().strftime('%a %d %b') }}",
    text_size: "large",
    align: "center",
    text_only: true,
  });
  const sub = subscriptions.find(
    (s) => s.message.type === "render_template" && s.message.template.includes("%H:%M")
  );
  assert(sub !== undefined, "kitchen header: subscribes to its template");

  sub.callback({ result: "05:14   Wed 19 Aug" });
  await card.updateComplete;
  assert(
    text(root) === "05:14 Wed 19 Aug",
    `kitchen header: renders the template result (got "${text(root)}")`
  );
  assert(
    root.querySelector("ha-card").classList.contains("text-only"),
    "kitchen header: text_only drops the card background"
  );
}

/* ----------------------------------------------------- clock, as deployed */

{
  const { root } = await render("bedroom clock", "faceplate-clock-card", {
    type: "custom:faceplate-clock-card",
    clock_size: "small",
    time_format: "24",
    show_seconds: false,
  });
  assert(
    /^\d{2}:\d{2}/.test(text(root)),
    `bedroom clock: renders 24-hour time (got "${text(root)}")`
  );
}

finish(state);
