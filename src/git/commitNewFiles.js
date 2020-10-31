import { flaschenpost } from "flaschenpost";
import git from "isomorphic-git";

import { errors } from "../errors.js";
import { dir, gitdir } from "../constants.js";
import { gitAuthorEmail, gitAuthorName } from "../constants.js";

const logger = flaschenpost.getLogger();

const commitFiles = async function ({ files, fs }) {
  try {
    for (const file of files) {
      await git.add({ fs, dir, gitdir, filepath: file });
    }

    await git.commit({
      fs,
      gitdir,
      message: `add: ${files.join(",")}`,
      author: {
        name: gitAuthorName,
        email: gitAuthorEmail,
      },
      committer: {
        name: gitAuthorName,
        email: gitAuthorEmail,
      },
    });
  } catch (ex) {
    logger.fatal("Commit failed.", { ex });

    throw new errors.RepositoryCommitFailed(undefined, { cause: ex });
  }
};

export { commitFiles };
