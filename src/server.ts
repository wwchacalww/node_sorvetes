import "reflect-metadata";
import cors from "cors";
import express from "express";
import { routes } from "./infra/routes";
import "./infra/containers";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);

app.listen("3333", () => {
  console.log("🚀 Server started on port 3333");
});
