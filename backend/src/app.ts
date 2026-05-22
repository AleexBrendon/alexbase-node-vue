import express from "express";
import cors from "cors";
import swaggerUi from "swagger-ui-express";

import { routes } from "./routes/index.js";
import { errorHandler } from "./shared/middlewares/errorHandler.js";
import { swaggerSpec } from "./config/swagger.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerSpec)
);

app.use(routes);

app.use(errorHandler);

export { app };