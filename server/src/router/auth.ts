import Express from "express";
import * as Auth from "../services/auth";
import { createError } from "../services/util";

// initiate router
const app = Express.Router();

app.get("/", async (req, res) => {
  try {
    res.send({ error: false, data: "Auth router is working" });
  } catch (error) {
    res.send(createError(500, error));
  }
});

app.post("/signup", async (req, res) => {
  try {
    // type of signup
    const { type } = req.query;

    // validation...
    if (!type) throw createError(400, "Type of login is not specified");

    // creates user
    const resData = {
      error: false,
      data: await Auth.signUpUser(req.body, type + ""),
    };

    // sending response
    res.send(resData);
  } catch (error) {
    res.send({ error: true, data: error });
  }
});

// export router
export default app;
