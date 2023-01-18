import Express from "express";
import dotEnv from "dotenv";

dotEnv.config();

const app = Express();

const appConfig = {
  port: process.env.PORT || 5000,
  name: "quiz app",
  baseUrl: "/",
};

app.get(`${appConfig.baseUrl}/`, (req, res) => {
  res.send(`<h1>Hai from sreedev</h1>`);
});

app.listen(`${appConfig.port}`, () => {
  console.log(`[-] Server started on port ${appConfig.port}`);
});
