import Express from "express";
import { addQuestion } from "../services/questions";

const app = Express.Router();

const baseUrl = process.env.BASE_URL ?? "";

app.get(baseUrl + "/", (req, res) => {
  res.send({ error: false, data: "admin router is working" });
});

app.post(baseUrl + "/questions/add", async (req, res) => {
  try {
    const data = await addQuestion(req.body);
    res.send({ error: false, data });
  } catch (error) {
    res.send({ error: true, data: error });
  }
});

export default app;
