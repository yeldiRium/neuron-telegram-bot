import { assert } from "assertthat";
import { isCustomError } from "defekt";
import { nodeenv } from "nodeenv";

import { errors } from "../errors.js";
import { loadConfig } from "./loadConfig.js";

describe("loadConfig", () => {
  const botToken = "654948132:NQGF234obviouslynotrealqev453Fflvge",
    gitUsername = "someUser",
    gitPassword = "somePassword",
    gitRemoteUrl = "https://github.com/bla/blub.git",
    gitDirectory = "./blub";

  test("throws an error if no bot token is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: "",
      NEURONTG_GIT__USERNAME: "",
      NEURONTG_GIT__PASSWORD: "",
      NEURONTG_GIT__REMOTE_URL: "",
      NEURONTG_GIT__DIRECTORY: "",
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
      NEURONTG_GIT__DIRECTORY: "",
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
      NEURONTG_GIT__USERNAME: gitUsername,
      NEURONTG_GIT__PASSWORD: "",
      NEURONTG_GIT__REMOTE_URL: "",
      NEURONTG_GIT__DIRECTORY: "",
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
      NEURONTG_GIT__USERNAME: gitUsername,
      NEURONTG_GIT__PASSWORD: gitPassword,
      NEURONTG_GIT__REMOTE_URL: "",
      NEURONTG_GIT__DIRECTORY: "",
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

  test("throws an error if no git directory is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: botToken,
      NEURONTG_GIT__USERNAME: gitUsername,
      NEURONTG_GIT__PASSWORD: gitPassword,
      NEURONTG_GIT__REMOTE_URL: gitRemoteUrl,
      NEURONTG_GIT__DIRECTORY: "",
    });

    assert
      .that(() => {
        loadConfig();
      })
      .is.throwing((error) => {
        return (
          isCustomError(error) && error.code === errors.GitDirectoryMissing.code
        );
      });

    reset();
  });

  test("loads the bot token successfully from the environment.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM_TOKEN: botToken,
      NEURONTG_GIT__USERNAME: gitUsername,
      NEURONTG_GIT__PASSWORD: gitPassword,
      NEURONTG_GIT__REMOTE_URL: gitRemoteUrl,
      NEURONTG_GIT__DIRECTORY: gitDirectory,
    });

    const config = loadConfig();

    assert.that(config.TELEGRAM_TOKEN).is.equalTo(botToken);

    reset();
  });
});
