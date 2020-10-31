import rc from "rc";

import { defaultConfig } from "./defaultConfig.js";
import { errors } from "../errors.js";

const loadConfig = function () {
  const config = rc("NEURONTG", defaultConfig);

  if (config.TELEGRAM.TOKEN === "") {
    throw new errors.TelegramTokenMissing();
  }
  if (config.TELEGRAM.ADMIN_PASSWORD === "") {
    throw new errors.TelegramAdminPasswordMissing();
  }
  if (config.TELEGRAM.ADMIN_PASSWORD === "") {
    throw new errors.TelegramTokenMissing();
  }
  if (config.GIT.USERNAME === "") {
    throw new errors.GitUsernameMissing();
  }
  if (config.GIT.PASSWORD === "") {
    throw new errors.GitPasswordMissing();
  }
  if (config.GIT.REMOTE_URL === "") {
    throw new errors.GitRemoteUrlMissing();
  }

  return config;
};

export { loadConfig };
