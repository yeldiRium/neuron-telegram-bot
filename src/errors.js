import { defekt } from "defekt";

const errors = defekt({
  GitUsernameMissing: {},
  GitPasswordMissing: {},
  GitRemoteUrlMissing: {},
  TelegramTokenMissing: {},
});

export { errors };
