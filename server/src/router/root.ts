import Express from "express";
import { RequestDefention } from "../defeniton";
import * as Auth from "../services/auth";

const app = Express.Router();

app.get("/user_data", Auth.mustLoginAsUser, (req: RequestDefention, res) => {
  res.send({ error: false, data: req.user });
});

export default app;
