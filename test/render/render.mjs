/**
 * Screenshots the cards in a real browser.
 *
 * The jsdom tests prove behaviour; nothing there can tell you a readout has
 * overflowed its panel or that two buttons collide at 480px. This renders the
 * actual bundle in Chromium inside a stand-in for Home Assistant's frontend —
 * the section grid, the theme variables, and light-weight `ha-card` / `ha-icon`
 * elements — at wall-panel size.
 *
 *   npm run shots            all scenes
 *   npm run shots -- kitchen only scenes whose name contains "kitchen"
 */
import { chromium } from "playwright";
import { readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import * as mdi from "@mdi/js";

const here = dirname(fileURLToPath(import.meta.url));
const outDir = join(here, "out");
mkdirSync(outDir, { recursive: true });

const bundle = readFileSync(join(here, "../../dist/faceplate-cards.js"), "utf8");
const { states } = JSON.parse(
  readFileSync(join(here, "../fixtures/live-states.json"), "utf8")
);

/** "mdi:fan-speed-1" → the mdiFanSpeed1 path string from @mdi/js. */
const iconPaths = {};
for (const [name, path] of Object.entries(mdi)) {
  if (typeof path !== "string" || !name.startsWith("mdi")) continue;
  const kebab = name
    .slice(3)
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/([A-Za-z])([0-9])/g, "$1-$2")
    .toLowerCase();
  iconPaths[`mdi:${kebab}`] = path;
}

/**
 * Home Assistant's default theme tokens. Only the ones the suite reads —
 * enough that a screenshot looks like the panel rather than unstyled HTML.
 */
const THEMES = {
  dark: {
    "--primary-color": "#03a9f4",
    "--primary-text-color": "#e1e1e1",
    "--secondary-text-color": "#9b9b9b",
    "--disabled-text-color": "#6f6f6f",
    "--text-primary-color": "#ffffff",
    "--card-background-color": "#1c1c1c",
    "--ha-card-background": "#1c1c1c",
    "--secondary-background-color": "#282828",
    "--primary-background-color": "#111111",
    "--divider-color": "rgba(225,225,225,0.12)",
    "--error-color": "#db4437",
    "--warning-color": "#ffa600",
    "--success-color": "#43a047",
    "--info-color": "#039be5",
    "--state-climate-cool-color": "#2196f3",
    "--state-climate-heat-color": "#ff8100",
    "--state-climate-dry-color": "#efbd07",
    "--state-climate-fan_only-color": "#00bcd4",
    "--state-climate-off-color": "#6f6f6f",
  },
  light: {
    "--primary-color": "#03a9f4",
    "--primary-text-color": "#212121",
    "--secondary-text-color": "#727272",
    "--disabled-text-color": "#bdbdbd",
    "--text-primary-color": "#ffffff",
    "--card-background-color": "#ffffff",
    "--ha-card-background": "#ffffff",
    "--secondary-background-color": "#e5e5e5",
    "--primary-background-color": "#fafafa",
    "--divider-color": "rgba(0,0,0,0.12)",
    "--error-color": "#db4437",
    "--warning-color": "#ffa600",
    "--success-color": "#43a047",
    "--info-color": "#039be5",
    "--state-climate-cool-color": "#2196f3",
    "--state-climate-heat-color": "#ff8100",
    "--state-climate-dry-color": "#efbd07",
    "--state-climate-fan_only-color": "#00bcd4",
    "--state-climate-off-color": "#bdbdbd",
  },
};

/** Template results the banner cards would get back from the server. */
const TEMPLATE_RESULTS = {
  default: "05:14   Wed 19 Aug",
};

/** Forecast the weather cards would get back over the subscription. */
const FORECAST = [
  { datetime: "2026-08-20T00:00:00+08:00", condition: "rainy", temperature: 31, templow: 27 },
  { datetime: "2026-08-21T00:00:00+08:00", condition: "sunny", temperature: 33, templow: 28 },
  { datetime: "2026-08-22T00:00:00+08:00", condition: "partlycloudy", temperature: 32, templow: 27 },
  { datetime: "2026-08-23T00:00:00+08:00", condition: "pouring", temperature: 30, templow: 26 },
  { datetime: "2026-08-24T00:00:00+08:00", condition: "cloudy", temperature: 31, templow: 27 },
];

function page(theme, sections) {
  const vars = Object.entries(THEMES[theme])
    .map(([k, v]) => `${k}:${v}`)
    .join(";");

  return `<!doctype html>
<html><head><meta charset="utf-8"><style>
  html,body{margin:0;padding:0;background:var(--primary-background-color);
    font-family:Roboto,-apple-system,"Segoe UI",sans-serif;${vars}}
  /* Home Assistant's sections view: sections flow as columns capped at 500px
     and centred, so a one-section dashboard on a wide panel renders a ~500px
     strip rather than stretching edge to edge. */
  .view{display:flex;flex-wrap:wrap;justify-content:center;align-content:flex-start;
    gap:8px;padding:8px;box-sizing:border-box;min-height:100vh}
  /* Each section is a 12-column grid on a 56px row. */
  .section{display:grid;grid-template-columns:repeat(12,1fr);
    grid-auto-rows:56px;gap:8px;flex:1 1 320px;max-width:500px;
    align-content:flex-start}
  .slot{min-width:0;min-height:0}
</style></head><body>
<div class="view" id="view"></div>
<script>window.__ICONS__ = ICON_PATHS_JSON;</script>
<script>
  // Stand-ins for the Home Assistant frontend elements the cards render into.
  class HaCard extends HTMLElement {
    connectedCallback(){
      if(this.shadowRoot) return;
      const root=this.attachShadow({mode:'open'});
      root.innerHTML='<style>:host{display:block;background:var(--ha-card-background);'
        +'border-radius:12px;box-shadow:0 2px 2px rgba(0,0,0,.14);'
        +'color:var(--primary-text-color);overflow:hidden;height:100%;'
        +'box-sizing:border-box}</style><slot></slot>';
    }
  }
  customElements.define('ha-card', HaCard);

  class HaIcon extends HTMLElement {
    static observedAttributes=['icon'];
    attributeChangedCallback(){ this.render(); }
    connectedCallback(){ this.render(); }
    render(){
      const name=this.getAttribute('icon')||'';
      const path=window.__ICONS__[name];
      if(!this.shadowRoot) this.attachShadow({mode:'open'});
      // An icon from a pack that is not MDI (phu:, mdil:) draws as a dashed
      // box, so a missing glyph is visible in the screenshot rather than blank.
      this.shadowRoot.innerHTML = path
        ? '<style>:host{display:inline-flex;align-items:center;justify-content:center;'
          +'width:var(--mdc-icon-size,24px);height:var(--mdc-icon-size,24px)}'
          +'svg{width:100%;height:100%;fill:currentColor}</style>'
          +'<svg viewBox="0 0 24 24"><path d="'+path+'"></path></svg>'
        : '<style>:host{display:inline-flex;width:var(--mdc-icon-size,24px);'
          +'height:var(--mdc-icon-size,24px);border:1px dashed currentColor;'
          +'border-radius:3px;opacity:.5;box-sizing:border-box}</style>';
    }
  }
  customElements.define('ha-icon', HaIcon);

  class HaSwitch extends HTMLElement {
    connectedCallback(){
      if(this.shadowRoot) return;
      const root=this.attachShadow({mode:'open'});
      root.innerHTML='<style>:host{display:inline-block;width:36px;height:20px;'
        +'border-radius:10px;background:var(--secondary-background-color)}'
        +':host([checked]){background:var(--primary-color)}</style>';
    }
    set checked(v){ v ? this.setAttribute('checked','') : this.removeAttribute('checked'); }
  }
  customElements.define('ha-switch', HaSwitch);
</script>
<script type="module">
BUNDLE_SOURCE
</script>
<script type="module">
  const states = STATES_JSON;
  const forecast = FORECAST_JSON;
  const templateResults = TEMPLATE_RESULTS_JSON;

  const hass = {
    language:'en',
    locale:{language:'en',time_format:'24'},
    config:{unit_system:{temperature:'°C'}},
    localize:()=> '',
    callService:()=>Promise.resolve(),
    connection:{
      // Answer the subscriptions synchronously with fixture data, so the
      // screenshot shows a populated forecast and banner rather than a card
      // still waiting on the server.
      subscribeMessage: async (cb,msg)=>{
        if(msg.type==='weather/subscribe_forecast') queueMicrotask(()=>cb({forecast}));
        if(msg.type==='render_template') queueMicrotask(()=>cb({result:templateResults.default}));
        return async()=>{};
      },
    },
    states,
  };

  const view = document.getElementById('view');
  for (const cards of SECTIONS_JSON) {
    const section = document.createElement('div');
    section.className='section';
    for (const config of cards) {
      const slot = document.createElement('div');
      slot.className='slot';
      const opts = config.grid_options || {};
      const cols = opts.columns === 'full' ? 12 : (opts.columns || 12);
      slot.style.gridColumn = 'span ' + cols;
      if (opts.rows && opts.rows !== 'auto') slot.style.gridRow = 'span ' + opts.rows;
      const el = document.createElement(config.type.replace('custom:',''));
      el.setConfig(config);
      el.hass = hass;
      slot.appendChild(el);
      section.appendChild(slot);
    }
    view.appendChild(section);
  }
  await Promise.all(
    [...view.querySelectorAll('*')]
      .filter((e)=>e.updateComplete)
      .map((e)=>e.updateComplete)
  );
  document.body.dataset.ready = '1';
</script>
</body></html>`
    .replace("ICON_PATHS_JSON", JSON.stringify(iconPaths))
    .replace("BUNDLE_SOURCE", () => bundle)
    .replace("STATES_JSON", JSON.stringify(states))
    .replace("FORECAST_JSON", JSON.stringify(FORECAST))
    .replace("TEMPLATE_RESULTS_JSON", JSON.stringify(TEMPLATE_RESULTS))
    .replace("SECTIONS_JSON", JSON.stringify(sections));
}

/**
 * The panels this suite is built for, measured over adb rather than guessed.
 *
 *   px30_evb  480x480 @160dpi — the 80mm square panels
 *   N101GN   1280x800 @160dpi landscape — the large panel
 *
 * Density 160 means devicePixelRatio 1, so CSS pixels are physical pixels and
 * these numbers are the browser viewport exactly. The 80mm figure is the full
 * 480: `dumpsys window` reports an app area of 480x432, but the panel app runs
 * the WebView fullscreen, and a screenshot of a real panel shows the dashboard
 * using every row.
 */
const PANELS = {
  "nspanel-80": { width: 480, height: 480 },
  // Not one of the three test panels — a wide check for the suite generally.
  "wide": { width: 1280, height: 800 },
};

/* ------------------------------------------------------------------ scenes */

const climate = (over = {}) => ({
  type: "custom:faceplate-climate-card",
  entity: "climate.rc_livingroom1_ac_lr1",
  hvac_modes: ["off", "cool"],
  default_mode: "cool",
  ...over,
});

const button = (icon, over = {}) => ({
  type: "custom:faceplate-button-card",
  icon,
  show_name: false,
  grid_options: { columns: 3, rows: 1 },
  ...over,
});

const fanTile = (n, icon) => ({
  type: "custom:faceplate-tile-card",
  entity: "script.living_room_fan_2",
  name: String(n),
  icon,
  show_state: false,
  grid_options: { columns: 4, rows: 1 },
});

/**
 * Each scene is one dashboard view as it will actually be laid out, on one of
 * the measured panels. The card configs are the ones deployed to the matching
 * `nspanelpro-*-dev` dashboard, not idealised samples.
 */
const SCENES = [
  {
    name: "kitchen-home",
    panel: "nspanel-80",
    sections: [
      [
        {
          type: "custom:faceplate-clock-card",
          clock_size: "small",
          time_format: "24",
          weather_entity: "weather.home",
          grid_options: { columns: 12, rows: 1 },
        },
        climate({
          name: "Aircon Left",
          show_controls: false,
          grid_options: { columns: 6, rows: 2 },
        }),
        climate({
          entity: "climate.rc_livingroom2_ac_lr2",
          name: "Aircon Right",
          show_controls: false,
          grid_options: { columns: 6, rows: 2 },
        }),
        {
          type: "custom:faceplate-light-card",
          entity: "light.living_room_skylines",
          show_color_temp_control: true,
          grid_options: { columns: 12, rows: 4 },
        },
        button("mdi:ceiling-light-multiple", {
          entity: "switch.kitchen_righta_left",
          grid_options: { columns: 4, rows: 1 },
        }),
        button("mdi:led-strip-variant", {
          entity: "switch.wardrobe_lights",
          grid_options: { columns: 4, rows: 1 },
        }),
        button("phu:rooms-balcony", {
          entity: "switch.balcony_light",
          grid_options: { columns: 4, rows: 1 },
        }),
      ],
    ],
  },
  {
    name: "kitchen-fan",
    panel: "nspanel-80",
    sections: [
      [
        {
          type: "custom:faceplate-tile-card",
          entity: "script.living_room_fan_power",
          name: "Power",
          icon: "mdi:power",
          show_state: false,
          grid_options: { columns: 6, rows: 1 },
        },
        {
          type: "custom:faceplate-tile-card",
          entity: "script.living_room_fan_2",
          name: "Reverse",
          icon: "mdi:autorenew",
          show_state: false,
          grid_options: { columns: 6, rows: 1 },
        },
        fanTile(1, "mdi:fan-speed-1"),
        fanTile(2, "mdi:fan-speed-2"),
        fanTile(3, "mdi:fan-speed-3"),
        fanTile(4, "mdi:fan"),
        fanTile(5, "mdi:fan"),
        fanTile(6, "mdi:fan-chevron-up"),
        {
          type: "custom:faceplate-tile-card",
          entity: "light.living_room_skylines",
          name: "Home",
          icon: "mdi:home",
          show_state: false,
          grid_options: { columns: 12, rows: 1 },
        },
      ],
    ],
  },
  {
    name: "bedroom",
    panel: "nspanel-80",
    sections: [
      [
        climate({
          entity: "climate.rc_bedroom_ac_bd",
          name: "Bedroom AC",
          grid_options: { columns: 6, rows: 5 },
        }),
        button("mdi:fan-off", { grid_options: { columns: 3, rows: 1 } }),
        button("mdi:fan-speed-1", { grid_options: { columns: 3, rows: 1 } }),
        button("mdi:fan-speed-2", { grid_options: { columns: 3, rows: 1 } }),
        button("mdi:fan-speed-3", { grid_options: { columns: 3, rows: 1 } }),
        button("mdi:ceiling-fan-light", { grid_options: { columns: 6, rows: 2 } }),
        {
          type: "custom:faceplate-weather-card",
          entity: "weather.home",
          show_current: false,
          forecast_slots: 3,
          grid_options: { columns: 6, rows: 2 },
        },
        climate({
          entity: "climate.rc_bedroom_ac_bd",
          show_name: false,
          layout: "row",
          grid_options: { columns: 12, rows: 1 },
        }),
        {
          type: "custom:faceplate-clock-card",
          clock_size: "small",
          time_format: "24",
          grid_options: { columns: 12, rows: 1 },
        },
      ],
    ],
  },
  {
    // The bedside dashboard is four sections; on a 480px panel they stack.
    name: "bedside",
    panel: "nspanel-80",
    sections: [
      [
        climate({
          entity: "climate.rc_bedroom_ac_bd",
          name: "Bedroom",
          hvac_modes: ["cool", "fan_only", "dry"],
          outdoor_temperature_entity: "sensor.rc_bedroom_ac_outside_temp",
          grid_options: { columns: 9, rows: 3 },
        }),
      ],
      [
        button("mdi:fan-off", { grid_options: { columns: 6, rows: 1 } }),
        button("mdi:fan-speed-1", { grid_options: { columns: 6, rows: 1 } }),
        button("mdi:bed-king", {
          entity: "switch.bedroom_left_left",
          grid_options: { columns: 3, rows: 2 },
        }),
        button("mdi:ceiling-fan-light", { grid_options: { columns: 3, rows: 2 } }),
        button("mdi:wardrobe", {
          entity: "switch.wardrobe_lights",
          grid_options: { columns: 3, rows: 2 },
        }),
        button("phu:rooms-bathroom", {
          entity: "switch.wardrobe_lights",
          grid_options: { columns: 3, rows: 2 },
        }),
      ],
      [
        {
          type: "custom:faceplate-weather-card",
          entity: "weather.home",
          show_current: false,
          forecast_slots: 5,
          grid_options: { columns: 12, rows: 2 },
        },
        {
          type: "custom:faceplate-clock-card",
          clock_size: "medium",
          time_format: "24",
          show_seconds: true,
          grid_options: { columns: 12, rows: 2 },
        },
      ],
    ],
  },
  {
    // Same kitchen view on the large panel: one section stays a ~500px column
    // rather than stretching, which is what Home Assistant actually does.
    name: "kitchen-home",
    panel: "wide",
    sections: null, // filled in below from the 80mm scene
  },
  {
    name: "front-door",
    panel: "wide",
    sections: [
      [
        climate({ name: "Living Room Left", grid_options: { columns: 6, rows: 4 } }),
        climate({
          entity: "climate.rc_livingroom2_ac_lr2",
          name: "Living Room Right",
          grid_options: { columns: 6, rows: 4 },
        }),
        button("mdi:fan-off"),
        button("mdi:fan-speed-1"),
        button("mdi:fan-speed-2"),
        button("mdi:fan-speed-3"),
        button("mdi:led-strip-variant", { entity: "light.living_room_skylines" }),
        button("mdi:ceiling-light-multiple", { entity: "switch.kitchen_righta_left" }),
        button("mdi:countertop", { entity: "switch.wardrobe_lights" }),
        button("mdi:faucet-variant", { entity: "switch.balcony_light" }),
        button("mdi:music"),
        button("mdi:air-conditioner"),
        {
          type: "custom:faceplate-banner-card",
          content: "{{ now().strftime('%H:%M') }}",
          text_size: "large",
          text_only: true,
          grid_options: { columns: 6, rows: 1 },
        },
      ],
    ],
  },
  {
    // Every card in one place, for eyeballing the design language as a set.
    name: "gallery",
    panel: "wide",
    sections: [
      [
        climate({ name: "Climate", grid_options: { columns: 12, rows: 3 } }),
        climate({
          name: "Row layout",
          layout: "row",
          grid_options: { columns: 12, rows: 1 },
        }),
        climate({
          entity: "climate.rc_livingroom2_ac_lr2",
          name: "Off",
          grid_options: { columns: 6, rows: 3 },
        }),
        climate({
          name: "Status only",
          show_controls: false,
          grid_options: { columns: 6, rows: 3 },
        }),
      ],
      [
        {
          type: "custom:faceplate-light-card",
          entity: "light.living_room_skylines",
          show_color_temp_control: true,
          grid_options: { columns: 12, rows: 4 },
        },
        {
          type: "custom:faceplate-weather-card",
          entity: "weather.home",
          grid_options: { columns: 12, rows: 3 },
        },
        {
          type: "custom:faceplate-clock-card",
          show_seconds: true,
          grid_options: { columns: 12, rows: 2 },
        },
      ],
      [
        {
          type: "custom:faceplate-tile-card",
          entity: "switch.wardrobe_lights",
          icon: "mdi:wardrobe",
          grid_options: { columns: 12, rows: 1 },
        },
        {
          type: "custom:faceplate-tile-card",
          entity: "script.living_room_fan_power",
          name: "Fan power",
          icon: "mdi:power",
          grid_options: { columns: 12, rows: 1 },
        },
        button("mdi:wardrobe", {
          entity: "switch.wardrobe_lights",
          grid_options: { columns: 3, rows: 2 },
        }),
        button("mdi:string-lights", {
          entity: "switch.balcony_light",
          grid_options: { columns: 3, rows: 2 },
        }),
        button("mdi:arrow-left", {
          name: "Back",
          show_name: true,
          grid_options: { columns: 3, rows: 2 },
        }),
        button("mdi:countertop", {
          entity: "switch.kitchen_righta_left",
          accent: true,
          grid_options: { columns: 3, rows: 2 },
        }),
        {
          type: "custom:faceplate-banner-card",
          content: "Palm needs watering",
          severity: "alert",
          icon: "mdi:watering-can",
          grid_options: { columns: 12, rows: 1 },
        },
      ],
    ],
  },
];

// The large-panel kitchen scene renders the same cards as the 80mm one, so the
// two screenshots differ only by viewport.
SCENES.find((s) => s.name === "kitchen-home" && s.panel === "wide").sections =
  SCENES.find((s) => s.name === "kitchen-home" && s.panel === "nspanel-80").sections;

/* ------------------------------------------------------------------- drive */

const filter = process.argv[2];
const scenes = filter
  ? SCENES.filter((s) => `${s.name}-${s.panel}`.includes(filter))
  : SCENES;

const browser = await chromium.launch();
const problems = [];

for (const scene of scenes) {
  const panel = PANELS[scene.panel];
  for (const theme of ["dark", "light"]) {
    const ctx = await browser.newContext({
      viewport: { width: panel.width, height: panel.height },
      // The panels run at 160dpi, so devicePixelRatio is 1 and CSS pixels are
      // physical pixels. Capture at 2x purely so the PNG is legible to read.
      deviceScaleFactor: 2,
      colorScheme: theme,
    });
    const p = await ctx.newPage();

    const errors = [];
    p.on("pageerror", (e) => errors.push(String(e)));
    p.on("console", (m) => {
      if (m.type() === "error") errors.push(m.text());
    });

    await p.setContent(page(theme, scene.sections), { waitUntil: "load" });
    try {
      await p.waitForSelector("body[data-ready]", { timeout: 10000 });
    } catch {
      errors.push("cards never finished rendering");
    }
    // Let the sliders and container queries settle before capturing.
    await p.waitForTimeout(250);

    const label = `${scene.name}-${scene.panel}-${theme}`;
    const file = join(outDir, `${label}.png`);
    await p.screenshot({ path: file, fullPage: true });

    // A card that overflows its tile is the failure this harness exists to
    // catch, and it does not throw — measure it instead. The measurement has
    // to reach into the shadow root: the host element is whatever size the
    // grid gave it, and the clipping happens on the ha-card inside.
    const overflow = await p.evaluate(() =>
      [...document.querySelectorAll(".slot")]
        .map((slot, i) => {
          const host = slot.firstElementChild;
          const card = host?.shadowRoot?.querySelector("ha-card");
          if (!card) return null;
          const overflowY = card.scrollHeight - card.clientHeight;
          const overflowX = card.scrollWidth - card.clientWidth;
          return overflowY > 2 || overflowX > 2
            ? { index: i, tag: host.tagName.toLowerCase(), overflowX, overflowY }
            : null;
        })
        .filter(Boolean)
    );

    // A control that collapsed to nothing renders no error and no overflow —
    // it just silently is not there, which is how the button card shipped
    // invisible the first time round.
    const collapsed = await p.evaluate(() =>
      [...document.querySelectorAll(".slot")]
        .map((slot, i) => {
          const host = slot.firstElementChild;
          const root = host?.shadowRoot;
          if (!root) return null;
          const dead = [...root.querySelectorAll("button, faceplate-slider")]
            .filter((el) => {
              // A control the card deliberately hides on a narrow tile is not
              // a collapse; only something meant to be on screen counts.
              let node = el;
              while (node && node !== root) {
                if (getComputedStyle(node).display === "none") return false;
                node = node.parentElement;
              }
              const r = el.getBoundingClientRect();
              return r.width < 4 || r.height < 4;
            })
            .map((el) => el.className || el.tagName.toLowerCase());
          return dead.length ? { index: i, tag: host.tagName.toLowerCase(), dead } : null;
        })
        .filter(Boolean)
    );

    // Anything smaller than about 10px is unreadable at arm's length on a
    // wall panel, which is the whole point of these cards.
    const tiny = await p.evaluate(() =>
      [...document.querySelectorAll(".slot")]
        .flatMap((slot) => {
          const root = slot.firstElementChild?.shadowRoot;
          if (!root) return [];
          return [...root.querySelectorAll("*")]
            .filter((el) => {
              const t = [...el.childNodes].some(
                (n) => n.nodeType === 3 && n.textContent.trim()
              );
              if (!t) return false;
              return parseFloat(getComputedStyle(el).fontSize) < 10;
            })
            .map((el) => ({
              tag: el.tagName.toLowerCase(),
              cls: el.className,
              size: getComputedStyle(el).fontSize,
              text: el.textContent.trim().slice(0, 20),
            }));
        })
        .slice(0, 6)
    );

    const notes = [
      errors.length && `${errors.length} console error(s)`,
      overflow.length && `${overflow.length} overflowing`,
      collapsed.length && `${collapsed.length} collapsed control(s)`,
      tiny.length && `${tiny.length} sub-10px text`,
    ].filter(Boolean);

    console.log(
      `${label}: ${panel.width}x${panel.height}` +
        (notes.length ? `  — ${notes.join(", ")}` : "  clean")
    );
    for (const e of errors) console.log(`    error: ${e}`);
    for (const o of overflow) {
      console.log(
        `    overflow: card ${o.index} <${o.tag}> by ${o.overflowX}x${o.overflowY}px`
      );
    }
    for (const c of collapsed) {
      console.log(`    collapsed: card ${c.index} <${c.tag}> — ${c.dead.join(", ")}`);
    }
    for (const t of tiny) {
      console.log(`    tiny: <${t.tag}.${t.cls}> ${t.size} "${t.text}"`);
    }
    if (errors.length || overflow.length || collapsed.length) {
      problems.push(label);
    }
    await ctx.close();
  }
}

await browser.close();

console.log(
  problems.length
    ? `\n${problems.length} scene(s) with problems: ${problems.join(", ")}`
    : "\nAll scenes rendered clean"
);
