import http from "isomorphic-git/http/node/index.js";
import git from "isomorphic-git";

import { dir, gitdir } from "../constants.js";

const setupRepository = async function ({ config, fs }) {
  await git.clone({
    fs,
    http,
    dir,
    gitdir,
    url: config.GIT.REMOTE_URL,
    onAuth: () => ({
      username: config.GIT.USERNAME,
      password: config.GIT.PASSWORD,
    }),
  });
};

export { setupRepository };
