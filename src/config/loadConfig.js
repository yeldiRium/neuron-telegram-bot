import rc from "rc";

import { defaultConfig } from "./defaultConfig.js";
import { errors } from "../errors.js";

const loadConfig = function () {
  const config = rc("NEURONTG", defaultConfig);

  if (config.TELEGRAM_TOKEN === "") {
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
  if (config.GIT.DIRECTORY === "") {
    throw new errors.GitDirectoryMissing();
  }

  return config;
};

export { loadConfig };
