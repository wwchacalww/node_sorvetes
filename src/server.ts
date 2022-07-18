import "reflect-metadata";
import express from "express";
import { routes } from "./infra/routes";

import "./infra/containers";
import { setupDb } from "./infra/db/sequelize";

const app = express();

app.use(express.json());

app.use(routes);

setupDb();

app.listen("3000", () => {
  console.log("🚀 Server started on port 3000");
});
