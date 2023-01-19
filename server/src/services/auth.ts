import jwt from "jsonwebtoken";
import bCrypt from "bcryptjs";
import randomID from "random-id";
import dotEnv from "dotenv";
import { RequestDefention } from "../defeniton";
import { NextFunction, Response } from "express";
import * as db from "./mongoDb";

// config env
dotEnv.config();


// verify access token 
export const validateAccessToken = (accessTocken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessTocken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(data);
    });
  });
};

// verify refresh token
export const validateRefreshToken = (accessTocken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessTocken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) {
        reject(err.message);
        return;
      }
      resolve(data);
    });
  });
};

export const generateAccessToken = (payload: object) => {
  return jwt.sign(
    { ...payload, access: true },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 1000, // 1 expires in hour
    }
  );
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign(
    { ...payload, refresh: true },
    process.env.REFRESH_TOKEN_SECRET
  );
};

export const getNewAccessTocken = async (refreshToken: string) => {
  try {
    const tockenSavedInDB = await db.refreshTockens.findOne({
      value: refreshToken,
    });

    // checks if token is in db
    if (!tockenSavedInDB) throw "Invalid refresh token";

    // gets payload from refresh tocken
    const payload: any = await validateRefreshToken(refreshToken);
    // return newly created access tocken
    if (!payload.refresh) throw "Invalid refresh token";

    return generateAccessToken(payload);
  } catch (error) {
    // error handling
    throw error;
  }
};

export const authInit = async (
  req: RequestDefention,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload: any = await validateAccessToken(
      req.headers["authorization"]?.split(" ")[1]
    );

    // check if its an access token and not refresh token
    if (!payload?.access) throw "Invalid access tocken";

    // gets curresponding user data from server if user exist's
    req.user = await db.users.findOne(
      { user: payload?.uid },
      { password: 0, _id: 0 }
    );

    // check if this is an admin account
    if (req.user?.admin) req.admin = req.user;
  } catch (error) {
    // error handling
    req.user = null;
    console.log(error);
  }
  next();
};

// check and make sure admin is logged in
export const mustLoginAsAdmin = async (
  req: RequestDefention,
  res: Response,
  next: NextFunction
) => {
  if (req.admin) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

// check and maker sure user is logged in
export const mustLoginAsUser = async (
  req: RequestDefention,
  res: Response,
  next: NextFunction
) => {
  if (req.user) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

// create user id
const createUserID = async () => {
  try {
    let userID = "";

    do {
      userID = randomID(20, "A0");
      // check for existing user with new user id
    } while ((await db.users.find({ uid: userID })).length > 0);

    // return newely created user id;
    return userID;
  } catch (error) {
    throw error;
  }
};
