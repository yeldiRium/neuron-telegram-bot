import Telegraf from "telegraf";

import { getLoggingMiddleware } from "./telegram/middlewares/getLoggingMiddleware.js";
import { loadConfig } from "./config/loadConfig.js";

(async () => {
  const config = loadConfig();

  const bot = new Telegraf(config.TELEGRAM.TOKEN);
  bot.use(getLoggingMiddleware({ logLevel: "info" }));

  bot.startPolling();
})();
