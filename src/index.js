import { loadConfig } from "./config/loadConfig.js";

(async () => {
  const config = loadConfig();

  console.log({ config });
})();
