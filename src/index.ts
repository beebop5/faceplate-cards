import { registerCard } from "./core/register";
import { CARD_NAME as CLIMATE_CARD } from "./cards/climate/const";

import "./cards/climate/climate-card";
import "./cards/climate/editor";
import "./cards/button";
import "./cards/tile";
import "./cards/light";
import "./cards/clock";
import "./cards/weather";
import "./cards/banner";

// The sibling cards register themselves as they load; the climate card keeps
// its own module layout from the AC Remote Card it grew out of.
registerCard({
  type: CLIMATE_CARD,
  name: "Faceplate Climate",
  description:
    "Air-conditioner remote with temperature, fan and swing controls, built for small wall panels",
});

const VERSION = "0.1.4";
// eslint-disable-next-line no-console
console.info(
  `%c FACEPLATE-CARDS %c ${VERSION} `,
  "color:#fff;background:#2196f3;font-weight:700",
  "color:#2196f3;background:#fff;font-weight:700"
);
