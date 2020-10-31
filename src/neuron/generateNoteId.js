import { v4 as uuid } from "uuid";

const generateNoteId = function () {
  return uuid();
};

export { generateNoteId };
