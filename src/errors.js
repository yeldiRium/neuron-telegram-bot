import { defekt } from "defekt";

const errors = defekt({
  GitDirectoryMissing: {},
  GitPasswordMissing: {},
  GitRemoteUrlMissing: {},
  GitUsernameMissing: {},
  LogLevelInvalid: {},
  TelegramAdminPasswordMissing: {},
  TelegramTokenMissing: {},
});

export { errors };
