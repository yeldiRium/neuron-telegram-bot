import { defekt } from "defekt";

const errors = defekt({
  GitDirectoryMissing: {},
  GitPasswordMissing: {},
  GitRemoteUrlMissing: {},
  GitUsernameMissing: {},
  LogLevelInvalid: {},
  RepositoryCommitFailed: {},
  RepositoryIsDirty: {},
  RepositoryPullFailed: {},
  RepositoryPushFailed: {},
  TelegramAdminPasswordMissing: {},
  TelegramTokenMissing: {},
});

export { errors };
