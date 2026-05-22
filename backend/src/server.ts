import { app } from "./app.js";
import { env } from "./config/env.js";
import { logger } from "./shared/utils/logger.js";

app.listen(env.port, () => {
  logger.info(`Servidor rodando na porta ${env.port}`);
});