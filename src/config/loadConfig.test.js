import { assert } from "assertthat";
import { isCustomError } from "defekt";
import { nodeenv } from "nodeenv";

import { errors } from "../errors.js";
import { loadConfig } from "./loadConfig.js";

describe("loadConfig", () => {
  test("throws an error if no bot token is given.", async () => {
    const reset = nodeenv("NEURONTG_TELEGRAM_TOKEN", "");

    assert
      .that(() => {
        loadConfig();
      })
      .is.throwing((error) => {
        return (
          isCustomError(error) &&
          error.code === errors.TelegramTokenMissing.code
        );
      });

    reset();
  });

  test("loads the bot token successfully from the environment.", async () => {
    const botToken = "654948132:NQGF234obviouslynotrealqev453Fflvge";
    const reset = nodeenv("NEURONTG_TELEGRAM_TOKEN", botToken);

    const config = loadConfig();

    assert.that(config.TELEGRAM_TOKEN).is.equalTo(botToken);

    reset();
  });
});
