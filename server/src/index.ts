import dotEnv from "dotenv";
import Express from "express";
import path from "path";
import * as db from "./services/mongoDb";

import AuthRouter from "./router/auth";
import { authInit } from "./services/auth";

// configuring env
dotEnv.config();

// instantiating app
const app = Express();

// apps basic configs
const appConfig = {
  port: process.env.PORT || 5000,
  name: "quiz app",
  baseUrl: "",
};

// serving files on public folder
app.use(
  path.join(appConfig.baseUrl, "/"),
  Express.static(path.join(process.cwd(), "public"))
);

// initialized authentication state in every requiest
app.use(authInit);

// authentication routes
app.use(path.join(appConfig.baseUrl, "/auth"), AuthRouter);

app.get(path.join(appConfig.baseUrl, "/"), (req, res) => {
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
    status: "error",
    message: "The service you are looking for is not found on this server",
  });
});

app.listen(`${appConfig.port}`, () => {
  console.log(`[-] Server started on port ${appConfig.port}`);
});

// test to get data base in sync
const testGetData = async () => {
  // const dataF = {
  //   name: "sample user",
  //   phone: "792434774349",
  // };
  // const uploded =  new db.users(dataF);
  // uploded.save();

  const data = await db.users.find();
  console.log(data);
};
testGetData();
