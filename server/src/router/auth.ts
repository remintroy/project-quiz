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

app.post("/signin", async (req, res) => {
  try {
    // creates user
    const resData = {
      error: false,
      data: await Auth.signInUser(req.body),
    };

    // sending response
    res.send(resData);
  } catch (error) {
    res.send({ error: true, data: error });
  }
});

// export router
export default app;
