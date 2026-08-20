import { css } from "lit";

/**
 * The Faceplate look, in three layers:
 *
 *   base    — the card shell and a button reset that survives touch panels
 *   lcd     — the inset readout panel: recessed, tabular figures, dashed rule
 *   buttons — round tactile controls that stay thumb-sized on a small panel
 *
 * Every card composes these, so a Faceplate dashboard reads as one appliance
 * rather than seven unrelated cards.
 */

/** Tokens. Themes override the --faceplate-* names; everything else derives. */
export const faceplateTokens = css`
  :host {
    display: block;
    container-type: inline-size;
    height: 100%;

    /* Brick & Brass: one radius everywhere — no pills, no circles. */
    --faceplate-radius: 10px;
    --faceplate-control-radius: 10px;
    --faceplate-gap: 8px;
    --faceplate-padding: 10px;
    --faceplate-button-size: 44px;
    --faceplate-button-max: 52px;
    --faceplate-icon-size: 24px;
    --faceplate-lcd-background: var(--faceplate-lcd-bg, transparent);
    /* The Brick & Brass token set, themeable with spec values as fallbacks.
       Two accents only: terracotta means "do something", brass means
       "something is on". */
    --faceplate-border: var(--ha-card-border-color, var(--divider-color, #4c3c2d));
    --faceplate-raised: var(--faceplate-raised-bg, #2a211a);
    --faceplate-action: var(--primary-color, #b75a33);
    --faceplate-on: var(--state-icon-active-color, var(--accent-color, #c89a4b));
    --faceplate-on-fill-bg: var(--faceplate-on-fill, rgba(200, 154, 75, 0.16));
    --faceplate-action-fill-bg: var(--faceplate-action-fill, rgba(183, 90, 51, 0.18));
    --faceplate-action-active: var(--faceplate-action-active-text, #d98a5f);
    --faceplate-mono: "IBM Plex Mono", ui-monospace, monospace;
    font-family: var(--primary-font-family, Archivo, sans-serif);
  }
`;

export const baseStyles = css`
  ha-card {
    padding: var(--faceplate-padding);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: var(--faceplate-gap);
    height: 100%;
    box-sizing: border-box;
    overflow: hidden;
  }
  ha-card.error {
    padding: 16px;
    color: var(--error-color, #db4437);
  }
  button {
    font: inherit;
    color: inherit;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;
    /* Long-press must reach us rather than becoming a text selection or
       double-tap zoom on a touch panel. */
    touch-action: manipulation;
    -webkit-user-select: none;
    user-select: none;
    -webkit-touch-callout: none;
  }
  button:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }
  /* ha-icon has no text baseline; keep icons flex-centered everywhere so they
     never drift against neighbouring text or inside round buttons. */
  ha-icon {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: none;
  }
`;

export const lcdStyles = css`
  .lcd {
    border-radius: var(--faceplate-radius);
    padding: 10px 16px 8px;
    background: var(--faceplate-lcd-background);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2px;
    min-height: 0;
    flex: 1;
    justify-content: center;
  }
  .lcd.tappable {
    cursor: pointer;
  }
  /* "Off" greys the derived readouts but leaves measured values at full
     contrast — a measurement is still true when the appliance is idle. */
  .lcd.off .segment {
    opacity: 0.55;
  }
  .lcd-top {
    align-self: stretch;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
  }
  .name {
    font-size: 15px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .lcd-center {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  /* The one big number every card leads with. */
  .readout {
    font-size: var(--faceplate-readout-size, 40px);
    font-weight: 300;
    line-height: 1.1;
    font-variant-numeric: tabular-nums;
  }
  .readout.dimmed,
  .readout.dimmed .unit {
    color: var(--primary-text-color);
  }
  .unit {
    font-size: calc(var(--faceplate-readout-size, 40px) * 0.4);
    opacity: 0.75;
    margin-left: 1px;
  }
  .aux {
    font-size: 13px;
    color: var(--secondary-text-color);
    white-space: nowrap;
    font-variant-numeric: tabular-nums;
  }
  .badge {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 13px;
    font-weight: 500;
    white-space: nowrap;
  }
  .badge ha-icon {
    --mdc-icon-size: 17px;
  }
  /* Secondary readouts, ruled off like a segment row on a real panel. */
  .lcd-status {
    align-self: stretch;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 2px 6px;
    margin-top: 3px;
  }
  /* The metadata line: IBM Plex Mono, uppercase, tertiary — the spec's
     "FAN — · SWING — · NORMAL" row. Values carry the information; the icons
     that used to sit here said the same thing twice at 14px. */
  .segment {
    display: flex;
    align-items: center;
    gap: 5px;
    font-family: var(--faceplate-mono);
    font-size: 11px;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: var(--disabled-text-color, var(--secondary-text-color));
    border-radius: 6px;
    padding: 1px 2px;
  }
  .segment + .segment::before {
    content: "·";
    margin-right: 5px;
    opacity: 0.7;
  }
  button.segment:hover {
    background: rgba(127, 127, 127, 0.15);
    color: var(--primary-text-color);
  }
  .segment ha-icon {
    display: none;
  }
  .seg-label {
    opacity: 0.75;
  }
  .segment span {
    max-width: 12ch;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export const buttonStyles = css`
  /* Buttons flow into as many equal columns as fit at a thumb-friendly size,
     wrapping onto another row on narrow wall-panel tiles rather than shrinking
     into fiddly targets or overflowing the card. */
  .controls {
    display: grid;
    grid-template-columns: repeat(
      auto-fit,
      minmax(var(--faceplate-button-size, 46px), 1fr)
    );
    gap: 6px;
    align-items: center;
    justify-items: center;
    flex: none;
    min-width: 0;
  }
  .ctl {
    width: 100%;
    max-width: var(--faceplate-button-max, 60px);
    height: auto;
    aspect-ratio: 1;
    border-radius: var(--faceplate-control-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--faceplate-raised);
    box-shadow: inset 0 0 0 1px var(--faceplate-border);
    color: var(--secondary-text-color);
    transition: background 0.15s;
  }
  .ctl ha-icon {
    --mdc-icon-size: var(--faceplate-icon-size, 24px);
    max-width: 100%;
  }
  .ctl:hover:not(:disabled) {
    filter: brightness(0.92);
  }
  /* The accented button — the primary action on any given card. Solid
     terracotta, no border: the one thing on the card asking to be pressed. */
  .ctl.accent {
    background: var(--faceplate-action);
    box-shadow: none;
    color: var(--text-primary-color, #f5ede0);
  }
  .ctl.accent:hover:not(:disabled) {
    background: var(--faceplate-action);
    filter: brightness(0.92);
  }
  /* An "active" button tints itself with its own state colour, which the card
     supplies as the element's color — the climate card passes the HVAC mode's
     colour, the others an active-state colour. A card that left color as plain
     text would tint with the text colour and come out fainter than the
     inactive button, so every card sets it explicitly.

     The older panels ship Chromium 107, which predates color-mix(). There the
     tint collapses to the plain background — identical to an inactive button —
     so the ring, which needs no color-mix, is what actually carries the state.
     Where color-mix does work the two reinforce each other. */
  .ctl.on {
    box-shadow: inset 0 0 0 1px currentColor;
    background: var(--faceplate-on-fill-bg);
    color: var(--faceplate-on);
  }
  .ctl.off {
    color: var(--secondary-text-color);
  }
  .ctl.mini {
    --faceplate-icon-size: 18px;
    width: 30px;
    flex: none;
  }
`;

/** Chips and rows: the option controls inside popups, and the tile card. */
export const chipStyles = css`
  .section-title {
    font-size: 10px;
    text-transform: uppercase;
    letter-spacing: 0.6px;
    color: var(--secondary-text-color);
    padding: 9px 2px 4px;
  }
  /* Chips grow to fill each row so the edges stay flush, but size to their own
     content first — an equal-column grid clipped "Automatic" next to icon-only
     chips that needed a third of the width. */
  .chips {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
    padding: 0;
  }
  .chip {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 5px;
    min-height: 36px;
    padding: 5px 8px;
    border-radius: var(--faceplate-control-radius);
    font-size: 13px;
    background: var(--faceplate-raised);
    box-shadow: inset 0 0 0 1px var(--faceplate-border);
    color: var(--secondary-text-color);
    white-space: nowrap;
    flex: 1 1 auto;
    min-width: 72px;
  }
  /* Where the icon already carries the label — a numbered fan glyph reads as
     "2" on its own — the chip sheds the text and stays narrow. */
  .chip-icon {
    min-height: 34px;
    flex: 0 1 auto;
    min-width: 46px;
  }
  .chip-icon ha-icon {
    --mdc-icon-size: 20px;
  }
  .chip ha-icon {
    --mdc-icon-size: 18px;
  }
  .chip.active {
    background: var(--faceplate-action-fill-bg);
    box-shadow: inset 0 0 0 1px var(--faceplate-action);
    color: var(--faceplate-action-active);
    font-weight: 600;
  }
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 10px 4px;
    font-size: 14px;
    border-top: 1px solid var(--divider-color, rgba(0, 0, 0, 0.08));
  }
  .row.column {
    flex-direction: column;
    align-items: stretch;
  }
  .row:first-child {
    border-top: none;
  }
  .row-name {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .row-missing {
    color: var(--error-color, #db4437);
    font-size: 12px;
  }
  .stepper {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .stepper-value {
    min-width: 5ch;
    text-align: center;
    font-variant-numeric: tabular-nums;
  }
`;

export const popupStyles = css`
  /* A native modal dialog, so the popup lands in the browser's top layer
     rather than competing on z-index inside this card's stacking context:
     each card in a Home Assistant grid establishes its own stacking context,
     so a popup drawn inside one card paints under any card that follows it. */
  .popup-backdrop {
    border: none;
    /* Generous vertical inset. The dialog is centred, so this is what keeps
       its close button clear of the top edge — on a wall panel the top ~40px
       is where Android's own pull-down lives, and a close button sitting in
       it is a coin toss between closing the sheet and opening the shade. */
    padding: 30px 16px;
    margin: auto;
    max-width: 100vw;
    max-height: 100vh;
    width: 100%;
    height: 100%;
    background: transparent;
    overflow: hidden;
  }
  /* The UA sheet hides a closed dialog; only lay it out once open. */
  .popup-backdrop[open] {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-backdrop::backdrop {
    background: rgba(0, 0, 0, 0.4);
  }
  .popup {
    background: var(--ha-card-background, var(--card-background-color, #fff));
    color: var(--primary-text-color);
    border-radius: 16px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.35);
    width: min(420px, 96vw);
    /* 100% of the backdrop's content box, which the backdrop's own padding has
       already inset — so the sheet is as tall as it can be while its close
       button still clears the top edge. A vh figure would double-count that
       inset and scroll content that had room to sit still. */
    max-height: min(100%, 560px);
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }
  .popup-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px 14px 8px;
    font-size: 15px;
    font-weight: 500;
  }
  .close {
    width: 44px;
    height: 44px;
    flex: none;
    border-radius: var(--faceplate-control-radius);
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--secondary-text-color);
  }
  .close:hover {
    background: rgba(127, 127, 127, 0.2);
  }
  .popup-body {
    padding: 0 12px 12px;
    overflow-y: auto;
    /* A column flex item defaults to min-height:auto, which refuses to shrink
       below its content — so overflow-y had nothing to act on and the sheet
       clipped its last section instead of scrolling it. */
    flex: 1 1 auto;
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  /* A full-width option row, for lists too long or too wordy for chips. */
  .option {
    display: flex;
    align-items: center;
    gap: 14px;
    min-height: 48px;
    padding: 10px 14px;
    border-radius: 12px;
    text-align: left;
    font-size: 15px;
  }
  .option:hover {
    background: rgba(127, 127, 127, 0.15);
  }
  .option.active {
    background: rgba(127, 127, 127, 0.15);
    background: color-mix(in srgb, currentColor 12%, transparent);
    color: var(--primary-color);
    font-weight: 600;
  }
  .option ha-icon {
    --mdc-icon-size: 20px;
  }
  .option .check {
    margin-left: auto;
  }
`;

/** Shrink gracefully on a narrow wall-panel tile: keep the touch targets,
 *  give up the secondary readouts first, then the auxiliary line. */
export const responsiveStyles = css`
  @container (max-width: 300px) {
    ha-card {
      --faceplate-padding: 8px;
    }
    .lcd {
      --faceplate-readout-size: 34px;
      padding: 6px 10px 4px;
    }
    .badge > span {
      display: none;
    }
    .lcd-status {
      gap: 2px 8px;
    }
  }
  @container (max-width: 230px) {
    .lcd {
      --faceplate-readout-size: 30px;
    }
    .lcd-status {
      display: none;
    }
  }
  @container (max-width: 170px) {
    .aux {
      display: none;
    }
    .controls {
      --faceplate-button-size: 40px;
      gap: 4px;
    }
  }
`;

/** Everything, in the order cards normally want it. */
export const faceplateStyles = [
  faceplateTokens,
  baseStyles,
  lcdStyles,
  buttonStyles,
  chipStyles,
  popupStyles,
  responsiveStyles,
];
