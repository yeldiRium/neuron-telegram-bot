import { flaschenpost } from "flaschenpost";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node/index.js";

import { isRepositoryDirty } from "./isRepositoryDirty.js";
import { errors } from "../errors.js";
import { dir, gitdir, gitAuthorEmail, gitAuthorName } from "../constants.js";

const logger = flaschenpost.getLogger();

const ensureRepositoryIsUsable = async function ({ config, fs }) {
  if (await isRepositoryDirty({ fs })) {
    logger.fatal("Repository is unexpectedly dirty.");

    throw new errors.RepositoryIsDirty();
  }

  try {
    await git.pull({
      fs,
      http,
      dir,
      gitdir,
      author: {
        name: gitAuthorName,
        email: gitAuthorEmail,
      },
      committer: {
        name: gitAuthorName,
        email: gitAuthorEmail,
      },
      onAuth: () => ({
        username: config.GIT.USERNAME,
        password: config.GIT.PASSWORD,
      }),
    });
  } catch (ex) {
    logger.fatal("Pulling into repository failed.", { ex });

    throw new errors.RepositoryPullFailed(undefined, { cause: ex });
  }
};

export { ensureRepositoryIsUsable };
