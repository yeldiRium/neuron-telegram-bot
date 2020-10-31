import path from "path";

import { dir } from "../constants.js";

const writeNoteContentToFile = async function ({ fileName, content, fs }) {
  const filePath = path.join(dir, fileName);

  await fs.promises.writeFile(filePath, content, { encoding: "utf-8" });
};

export { writeNoteContentToFile };
