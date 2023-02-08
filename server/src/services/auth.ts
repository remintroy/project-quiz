import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import validator from "validator";
import { NextFunction, Response } from "express";
import * as db from "./mongoDb";
import { RequestDefention } from "../defeniton";
import { createError } from "./util";
import { verifyIdToken } from "./Firebase";

// config env
dotEnv.config();

// verify access token
export const getAccessTokenData = (accessTocken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessTocken, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
};

// verify refresh token
export const getRefreshTokenData = (accessTocken: string) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessTocken, process.env.REFRESH_TOKEN_SECRET, (err, data) => {
      if (err) reject(err.message);
      else resolve(data);
    });
  });
};

export const newRefreshToken = (payload: object) => jwt.sign({ ...payload }, process.env.REFRESH_TOKEN_SECRET);
export const newAccessToken = (payload: { uid: string }) =>
  jwt.sign({ uid: payload.uid }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });

export const getNewAccessTockenFromRefreshToken = async (refreshToken: string) => {
  try {
    const tockenSavedInDB = await db.refreshTockens.findOne({ value: refreshToken });
    if (!tockenSavedInDB) throw "Invalid refresh token";
    const payload: any = await getRefreshTokenData(refreshToken);
    return newAccessToken(payload);
  } catch (error) {
    throw createError(400, error);
  }
};

// function that runs on every request
export const authInit = async (req: RequestDefention, res: Response, next: NextFunction) => {
  try {
    const payload: any = await getAccessTokenData(req.headers["authorization"]?.split(" ")[1]);
    // gets curresponding user data from server if user exist's
    req.user = await db.users.findOne({ uid: payload?.uid }, { password: 0, _id: 0 });
    // check for blocked user
    if (req.user.disabled) throw "This user is blocked user";
    // check if this is an admin account
    if (req.user?.admin) req.admin = req.user;
  } catch (error) {
    req.user = null;
  }
  next();
};

// check and make sure admin is logged in
export const mustLoginAsAdmin = async (req: RequestDefention, res: Response, next: NextFunction) => {
  if (req.admin) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

// check and maker sure user is logged in
export const mustLoginAsUser = async (req: RequestDefention, res: Response, next: NextFunction) => {
  if (req.user) next();
  else {
    res.status(401);
    res.send({ status: "error", message: "Unauthorized action" });
  }
};

// login user if exist or create new user
export const signInUser = async ({ idToken }: { idToken: string }) => {
  try {
    if (!validator.isJWT(idToken + "")) throw createError(400, "Invalid idToken");

    // verfy idToken and retrive userData from firebase
    const userDataFromFirebase = await verifyIdToken({ idToken });

    // check for existing data
    let existingData: object;
    try {
      existingData = await db.users.findOne({ uid: userDataFromFirebase.uid });
    } catch (error) {
      throw createError(500, "Faild to fetch user data");
    }

    if (!existingData) {
      // creates and saves new user
      const newUserData = {
        uid: userDataFromFirebase.uid,
        name: userDataFromFirebase.displayName,
        email: userDataFromFirebase.email,
        provider: userDataFromFirebase.providerData[0].providerId,
        createdAt: userDataFromFirebase.metadata.creationTime,
        lastLogin: userDataFromFirebase.metadata.lastSignInTime,
        lastRefresh: userDataFromFirebase.metadata.lastRefreshTime,
        photoURL: userDataFromFirebase.photoURL,
        phone: userDataFromFirebase.phoneNumber,
        disabled: userDataFromFirebase.disabled,
      };
      const newUser = new db.users(newUserData);
      try {
        await newUser.save();
      } catch (error) {
        throw createError(500, "Error creating user");
      }
    }

    // ----- TOKENS -----
    const tokensForUser: { accessToken: string; refreshToken: string } = { accessToken: null, refreshToken: null };
    // creates token's for new user
    try {
      tokensForUser.accessToken = newAccessToken({ uid: userDataFromFirebase.uid });
      tokensForUser.refreshToken = newRefreshToken({ uid: userDataFromFirebase.uid });
    } catch (error) {
      throw createError(500, `${existingData ? "" : "User created but "}Faild to login. Try to login after some time`);
    }

    // saves refresh token to db
    try {
      await new db.refreshTockens({ value: tokensForUser.refreshToken, uid: userDataFromFirebase.uid }).save();
    } catch (error) {
      throw createError(500, `${existingData ? "" : "User created but "}Faild to login. Try to login after some time`);
    }

    // user data and tokes successfully created
    return tokensForUser;
  } catch (error) {
    throw error;
  }
};
