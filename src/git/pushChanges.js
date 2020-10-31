import { flaschenpost } from "flaschenpost";
import git from "isomorphic-git";
import http from "isomorphic-git/http/node/index.js";

import { errors } from "../errors.js";
import { gitdir } from "../constants.js";

const logger = flaschenpost.getLogger();

const pushChanges = async function ({ config, fs }) {
  try {
    await git.push({
      fs,
      http,
      gitdir,
      onAuth: () => ({
        username: config.GIT.USERNAME,
        password: config.GIT.PASSWORD,
      }),
    });
  } catch (ex) {
    logger.fatal("Pushing to remote failed.", { ex });

    throw new errors.RepositoryPushFailed(undefined, { cause: ex });
  }
};

export { pushChanges };
