import rc from "rc";

import { defaultConfig } from "./defaultConfig.js";
import { errors } from "../errors.js";

const loadConfig = function () {
  const config = rc("NEURONTG", defaultConfig);

  if (config.TELEGRAM_TOKEN === "") {
    throw new errors.TelegramTokenMissing();
  }

  return config;
};

export { loadConfig };
