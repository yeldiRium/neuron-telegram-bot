import { format } from "date-fns";
import { source } from "common-tags";

const buildNoteContentFromMessageText = function (text) {
  const trimmedText = text.trim();

  return source`
    ---
    date: ${format(new Date(), "yyyy-MM-dd'T'HH:mm")}
    tags:
      - unsorted
      - automated/neuron-telegram-bot
    ---
    ${trimmedText}
    `;
};

export { buildNoteContentFromMessageText };
