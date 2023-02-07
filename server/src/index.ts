import dotEnv from "dotenv";
import Express from "express";
import path from "path";
import cors from "cors";

import AuthRouter from "./router/auth";
import PagesRouter from "./router/root";
import AdminRouter from "./router/admin";
import { authInit } from "./services/auth";

// configuring env
dotEnv.config();

// instantiating app
const app = Express();

// apps basic configs
const appConfig = {
  port: process.env.PORT || 5000,
  name: "quiz app",
  baseUrl: process.env.BASE_URL ?? "",
};

app.use(cors());
app.use(Express.json());

// serving files on public folder
app.use(appConfig.baseUrl + "/", Express.static(path.join(process.cwd(), "public")));

// initialized authentication state in every requiest
app.use(authInit);

// authentication routes
app.use(appConfig.baseUrl + "/auth", AuthRouter);
// pages routes
app.use(appConfig.baseUrl + "/", PagesRouter);
// admin router
app.use(appConfig.baseUrl + "/admin", AdminRouter);

app.get(appConfig.baseUrl + "/credits", (req, res) => {
  res.send({
    SERVER: "Hi from server",
    SHUHAIB: "HABEEBYYY",
    SOORYA: "LETS-DO-IT",
  });
});

app.use((req, res) => {
  // 404 messaage
  res.status(404);
  res.send({
    error: true,
    message: "The service you are looking for is not found on this server",
  });
});

app.listen(`${appConfig.port}`, () => {
  console.log(`[-] Server started on port ${appConfig.port}`);
});

// Created by \u0052\u0045\u004D\u0049\u004E
