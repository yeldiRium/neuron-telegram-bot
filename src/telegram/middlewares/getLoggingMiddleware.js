import { flaschenpost } from "flaschenpost";
import { errors } from "../../errors.js";

const logger = flaschenpost.getLogger();

const formatLogMessage = function (ctx) {
  let message = "";

  message += ctx.updateType;

  if (ctx.updateTypes !== undefined && Array.isArray(ctx.updateTypes)) {
    message += `|${ctx.updateTypes.join(",")}`;
  }

  message += ` #${ctx.update.update_id}`;

  message += ` from ${ctx.update.message.from.id}`;

  if (ctx.update.message.from.id < 0) {
    message += " (a group)";
  } else {
    message += ` (${
      ctx.update.message.from.username ??
      ctx.update.message.from.first_name ??
      "<anonymous"
    })`;
  }

  return message;
};

const getLoggingMiddleware = function ({ logLevel = "info" }) {
  return (ctx, next) => {
    if (!Reflect.has(logger, logLevel)) {
      throw new errors.LogLevelInvalid(undefined, { data: { logLevel } });
    }

    const logMessage = formatLogMessage(ctx);

    logger[logLevel](logMessage);

    next();
  };
};

export { getLoggingMiddleware };
