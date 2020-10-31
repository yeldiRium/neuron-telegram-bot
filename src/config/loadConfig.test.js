import { assert } from "assertthat";
import { isCustomError } from "defekt";
import { nodeenv } from "nodeenv";

import { errors } from "../errors.js";
import { loadConfig } from "./loadConfig.js";

describe("loadConfig", () => {
  const botToken = "654948132:NQGF234obviouslynotrealqev453Fflvge",
    username = "someUser",
    password = "somePassword",
    gitUrl = "https://github.com/bla/blub.git";

  test("throws an error if no bot token is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: "",
      NEURONTG_GIT__USERNAME: "",
      NEURONTG_GIT__PASSWORD: "",
      NEURONTG_GIT__REMOTE_URL: "",
    });

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

  test("throws an error if no git username is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: botToken,
      NEURONTG_GIT__USERNAME: "",
      NEURONTG_GIT__PASSWORD: "",
      NEURONTG_GIT__REMOTE_URL: "",
    });

    assert
      .that(() => {
        loadConfig();
      })
      .is.throwing((error) => {
        return (
          isCustomError(error) && error.code === errors.GitUsernameMissing.code
        );
      });

    reset();
  });

  test("throws an error if no git password is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: botToken,
      NEURONTG_GIT__USERNAME: username,
      NEURONTG_GIT__PASSWORD: "",
      NEURONTG_GIT__REMOTE_URL: "",
    });

    assert
      .that(() => {
        loadConfig();
      })
      .is.throwing((error) => {
        return (
          isCustomError(error) && error.code === errors.GitPasswordMissing.code
        );
      });

    reset();
  });

  test("throws an error if no git remote url is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: botToken,
      NEURONTG_GIT__USERNAME: username,
      NEURONTG_GIT__PASSWORD: password,
      NEURONTG_GIT__REMOTE_URL: "",
    });

    assert
      .that(() => {
        loadConfig();
      })
      .is.throwing((error) => {
        return (
          isCustomError(error) && error.code === errors.GitRemoteUrlMissing.code
        );
      });

    reset();
  });

  test("loads the bot token successfully from the environment.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: botToken,
      NEURONTG_GIT__USERNAME: username,
      NEURONTG_GIT__PASSWORD: password,
      NEURONTG_GIT__REMOTE_URL: gitUrl,
    });

    const config = loadConfig();

    assert.that(config.TELEGRAM_TOKEN).is.equalTo(botToken);

    reset();
  });
});
