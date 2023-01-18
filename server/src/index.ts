import Express from "express";

const app = Express();

const appConfig = {
  port: process.env.PORT || 5000,
  name: "quiz app",
  baseUrl: "/",
};

app.get(`${appConfig.baseUrl}/`, (req, res) => {
  res.send("hai");
});

app.listen(`${appConfig.port}`, () => {
  console.log(`[-] Server started on port ${appConfig.port}`);
});
