import { defekt } from "defekt";

const errors = defekt({
  GitDirectoryMissing: {},
  GitPasswordMissing: {},
  GitRemoteUrlMissing: {},
  GitUsernameMissing: {},
  TelegramAdminPasswordMissing: {},
  TelegramTokenMissing: {},
});

export { errors };
