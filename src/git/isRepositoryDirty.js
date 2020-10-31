import git from "isomorphic-git";

import { dir } from "../constants.js";

const isRepositoryDirty = async function ({ fs }) {
  const status = await git.statusMatrix({ fs, dir });

  return status.some((row) => row.slice(1).some((item) => item !== 1));
};

export { isRepositoryDirty };
