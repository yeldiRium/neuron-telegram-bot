import Telegraf from "telegraf";

import { getAuthenticationMiddleware } from "./telegram/middlewares/getAuthenticationMiddleware.js";
import { getLoggingMiddleware } from "./telegram/middlewares/getLoggingMiddleware.js";
import { generateNoteId } from "./neuron/generateNoteId.js";
import { loadConfig } from "./config/loadConfig.js";

(async () => {
  const config = loadConfig();

  const {
    authenticationMiddleware,
    guardMiddleware,
  } = getAuthenticationMiddleware({
    adminPassword: config.TELEGRAM.ADMIN_PASSWORD,
  });

  const bot = new Telegraf(config.TELEGRAM.TOKEN);
  bot.use(getLoggingMiddleware({ logLevel: "info" }));
  bot.use(authenticationMiddleware);

  bot.command("new_note", guardMiddleware, async (ctx) => {
    const noteId = generateNoteId();

    await ctx.reply(
      `[dry-run] I've created a new note with id [[${noteId}]] for you.`
    );
  });

  bot.startPolling();
})();
