import { defekt } from "defekt";

const errors = defekt({
  GitDirectoryMissing: {},
  GitPasswordMissing: {},
  GitRemoteUrlMissing: {},
  GitUsernameMissing: {},
  TelegramTokenMissing: {},
});

export { errors };
