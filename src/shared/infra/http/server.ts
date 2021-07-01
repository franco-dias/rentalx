import express from "express";
import "express-async-errors";
import swaggerUi from "swagger-ui-express";

import "@shared/infra/typeorm";
import "@shared/container";
import swaggerFile from "../../../swagger.json";
import errorHandler from "./middlewares/errorHandler";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(router);
app.use(errorHandler);

app.listen(3333, () => console.log("application started!"));
