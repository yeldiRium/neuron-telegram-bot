import { assert } from "assertthat";

import { getFileNameForNoteId } from "./getFileNameForNoteId.js";

describe("getFileNameForNoteId", () => {
  test("returns the note id with markdown extension.", async () => {
    const noteId = "uiae";

    const fileName = getFileNameForNoteId(noteId);

    assert.that(fileName).is.equalTo(`${noteId}.md`);
  });
});
