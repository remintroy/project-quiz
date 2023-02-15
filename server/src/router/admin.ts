import Express from "express";
import { addQuestion } from "../services/questions";

const app = Express.Router();

const baseUrl = process.env.BASE_URL ?? "";

app.get(baseUrl + "/", (req, res) => {
  res.send({ error: false, data: "admin router is working" });
});

app.post(baseUrl + "/question/add", async (req, res) => {
  let data: any;
  let isError = false;
  try {
    data = await addQuestion(req.body);
  } catch (err) {
    isError = true;
    data = err;
  }
  res.send({ error: isError, data: data });
});

export default app;
