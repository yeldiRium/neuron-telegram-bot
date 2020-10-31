import { flaschenpost } from "flaschenpost";
import { errors } from "../../errors.js";

const logger = flaschenpost.getLogger();

const getLoggingMiddleware = function ({ logLevel = "info" }) {
  return (ctx, next) => {
    if (!Reflect.has(logger, logLevel)) {
      throw new errors.LogLevelInvalid(undefined, { data: { logLevel } });
    }

    // const logMessage = formatLogMessageFromTelegrafContext(ctx);

    if (Reflect.has(ctx, "message")) {
      logger[logLevel]("Received an update.", { message: ctx.message });
    } else {
      logger[logLevel]("Received an update without a message.", {
        message: ctx.message,
      });
    }

    next();
  };
};

export { getLoggingMiddleware };
