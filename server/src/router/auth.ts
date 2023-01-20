import Express from "express";
import * as Auth from "../services/auth";

// initiate router
const app = Express.Router();

app.get("/", (req, res) => {
  res.send({ status: "good", message: "Auth router is working" });
});

app.post("/signup", async (req, res) => {
  const data = req.body;
  try {
    // creates user
    const userData = await Auth.createUser({ ...data });
    res.send({ error: false, data: userData });
  } catch (error) {
    res.send({ error: true, data: error });
  }
});

// export router
export default app;
