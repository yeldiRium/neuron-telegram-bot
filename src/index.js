import Extra from "telegraf/extra.js";
import fs from "memfs";
import PQueue from "p-queue";
import Telegraf from "telegraf";

import { buildNoteContentFromMessageText } from "./neuron/buildNoteContentFromMessageText.js";
import { commitFiles } from "./git/commitNewFiles.js";
import { ensureRepositoryIsUsable } from "./git/ensureRepositoryIsUsable.js";
import { getAuthenticationMiddleware } from "./telegram/middlewares/getAuthenticationMiddleware.js";
import { getFileNameForNoteId } from "./neuron/getFileNameForNoteId.js";
import { generateNoteId } from "./neuron/generateNoteId.js";
import { getLoggingMiddleware } from "./telegram/middlewares/getLoggingMiddleware.js";
import { loadConfig } from "./config/loadConfig.js";
import { pushChanges } from "./git/pushChanges.js";
import { setupRepository } from "./git/setupRepository.js";
import { writeNoteContentToFile } from "./neuron/writeNoteContentToFile.js";

(async () => {
  const config = loadConfig();
  const pQueue = new PQueue.default({ concurrency: 1 });

  await setupRepository({ config, fs });

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
    const text = ctx.message.text;
    const textWithoutCommand = text.slice("/new_note".length);

    const noteContent = buildNoteContentFromMessageText(textWithoutCommand);
    const noteId = generateNoteId();
    const fileName = getFileNameForNoteId(noteId);

    await ctx.reply(
      `I am currently creating a new note with id [[${noteId}]] for you.`
    );
    await ctx.reply("This is your note's content:");
    await ctx.reply(`\`\`\`\n${noteContent}\n\`\`\``, Extra.markdown());

    await pQueue.add(async () => {
      await ensureRepositoryIsUsable({ config, fs });
      await writeNoteContentToFile({ fileName, content: noteContent, fs });
      await commitFiles({ config, fs, files: [fileName] });
      await pushChanges({ config, fs });
    });

    await ctx.reply(`The note [[${noteId}]] was successfully created.`);
  });

  bot.startPolling();
})();
