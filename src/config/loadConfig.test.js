import { assert } from "assertthat";
import { isCustomError } from "defekt";
import { nodeenv } from "nodeenv";

import { errors } from "../errors.js";
import { loadConfig } from "./loadConfig.js";

describe("loadConfig", () => {
  const telegramToken = "654948132:NQGF234obviouslynotrealqev453Fflvge",
    telegramAdminPassword = "foo",
    gitUsername = "someUser",
    gitPassword = "somePassword",
    gitRemoteUrl = "https://github.com/bla/blub.git";

  test("throws an error if no telegram token is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM__TOKEN: "",
      NEURONTG_TELEGRAM__ADMIN_PASSWORD: "",
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

  test("throws an error if no telegram admin password is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM__TOKEN: telegramToken,
      NEURONTG_TELEGRAM__ADMIN_PASSWORD: "",
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
          error.code === errors.TelegramAdminPasswordMissing.code
        );
      });

    reset();
  });

  test("throws an error if no git username is given.", async () => {
    const reset = nodeenv({
      NEURONTG_TELEGRAM__TOKEN: telegramToken,
      NEURONTG_TELEGRAM__ADMIN_PASSWORD: telegramAdminPassword,
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
      NEURONTG_TELEGRAM__TOKEN: telegramToken,
      NEURONTG_TELEGRAM__ADMIN_PASSWORD: telegramAdminPassword,
      NEURONTG_GIT__USERNAME: gitUsername,
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
      NEURONTG_TELEGRAM__TOKEN: telegramToken,
      NEURONTG_TELEGRAM__ADMIN_PASSWORD: telegramAdminPassword,
      NEURONTG_GIT__USERNAME: gitUsername,
      NEURONTG_GIT__PASSWORD: gitPassword,
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
      NEURONTG_TELEGRAM__TOKEN: telegramToken,
      NEURONTG_TELEGRAM__ADMIN_PASSWORD: telegramAdminPassword,
      NEURONTG_GIT__USERNAME: gitUsername,
      NEURONTG_GIT__PASSWORD: gitPassword,
      NEURONTG_GIT__REMOTE_URL: gitRemoteUrl,
    });

    const config = loadConfig();

    assert.that(config.TELEGRAM.TOKEN).is.equalTo(telegramToken);
    assert
      .that(config.TELEGRAM.ADMIN_PASSWORD)
      .is.equalTo(telegramAdminPassword);
    assert.that(config.GIT.USERNAME).is.equalTo(gitUsername);
    assert.that(config.GIT.PASSWORD).is.equalTo(gitPassword);
    assert.that(config.GIT.REMOTE_URL).is.equalTo(gitRemoteUrl);

    reset();
  });
});
