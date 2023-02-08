import Express from "express";
import * as Auth from "../services/auth";
import { createError } from "../services/util";
import validator from "validator";

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
    const resData = await Auth.signInUser(req.body);

    // sending response
    res.send({ error: false, ...resData });
  } catch (error) {
    res.status(error.code);
    res.send({ error: true, ...error });
  }
});

app.post("/generate_refresh_token", async (req, res) => {
  try {
    const refreshToken = req.headers["authorization"]?.split(" ")[1];

    if (!validator.isJWT(refreshToken + "")) throw createError(400, "Invalid refresh token");

    const NewAccessTocken = await Auth.getNewAccessTockenFromRefreshToken(refreshToken);

    // sending new access token
    res.send({ error: false, data: { accessToken: NewAccessTocken } });
  } catch (error) {
    res.status(error.code);
    res.send({ error: true, ...error });
  }
});

// export router
export default app;
