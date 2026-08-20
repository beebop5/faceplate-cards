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
import "./cards/buttons";
import "./cards/media";

// The sibling cards register themselves as they load; the climate card is
// large enough to keep its own module layout under cards/climate/.
registerCard({
  type: CLIMATE_CARD,
  name: "Faceplate Climate",
  description:
    "Air-conditioner remote with temperature, fan and swing controls, built for small wall panels",
});

const VERSION = "0.1.20";
// eslint-disable-next-line no-console
console.info(
  `%c FACEPLATE-CARDS %c ${VERSION} `,
  "color:#fff;background:#2196f3;font-weight:700",
  "color:#2196f3;background:#fff;font-weight:700"
);
