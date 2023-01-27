import jwt from "jsonwebtoken";
import dotEnv from "dotenv";
import { RequestDefention } from "../defeniton";
import { NextFunction, Response } from "express";
import { createError } from "./util";
import * as db from "./mongoDb";
import validator from "validator";
import { verifyIdToken } from "./Firebase";

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

export const generateAccessToken = (payload: { uid: string }) => {
  return jwt.sign({ uid: payload.uid, access: true }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1m",
  });
};

export const generateRefreshToken = (payload: object) => {
  return jwt.sign({ ...payload, refresh: true }, process.env.REFRESH_TOKEN_SECRET);
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
    // console.log(error);
    throw createError(400, error);
  }
};

// function that runs on every request
export const authInit = async (req: RequestDefention, res: Response, next: NextFunction) => {
  try {
    const payload: any = await validateAccessToken(req.headers["authorization"]?.split(" ")[1]);

    // check if its an access token and not refresh token
    if (!payload?.access) throw "Invalid access tocken";

    // gets curresponding user data from server if user exist's
    req.user = await db.users.findOne({ uid: payload?.uid }, { password: 0, _id: 0 });

    // check for blocked user
    if (req.user.isBlocked) throw "This user is blocked user";
    // check if this is an admin account
    if (req.user?.admin) req.admin = req.user;
  } catch (error) {
    // error handling
    req.user = null;
    // console.log(error);
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
    // validating idToken
    if (!validator.isJWT(idToken + "")) throw createError(400, "Invalid idToken");

    // verfy idToken and retrive userData from firebase
    const userDataFromFirebase = await verifyIdToken({ idToken });

    let existingData: object;
    try {
      // check for existing data
      existingData = await db.users.findOne({ uid: userDataFromFirebase.uid });
    } catch (error) {
      // error
      throw createError(500, "Faild to fetch user data");
    }

    if (!existingData) {
      // if user not exist create new user
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

      // user object
      const newUser = new db.users(newUserData);

      try {
        // saves new user data to db
        await newUser.save();
      } catch (error) {
        throw createError(500, "Error creating user");
      }
    }

    // ----- TOKENS -----
    const tokensForUser: { accessToken: string; refreshToken: string } = { accessToken: null, refreshToken: null };
    try {
      // creates token's for new user
      tokensForUser.accessToken = generateAccessToken({ uid: userDataFromFirebase.uid });
      tokensForUser.refreshToken = generateRefreshToken({ uid: userDataFromFirebase.uid });
    } catch (error) {
      throw createError(
        500,
        `${existingData ? "" : "User created but "}Faild to login. Try to login after some time`
      );
    }

    try {
      // saves refresh token to db
      await new db.refreshTockens({ value: tokensForUser.refreshToken, uid: userDataFromFirebase.uid }).save();
    } catch (error) {
      throw createError(
        500,
        `${existingData ? "" : "User created but "}Faild to login. Try to login after some time`
      );
    }

    // user data and tokes successfully created
    return tokensForUser;
  } catch (error) {
    // error signup user
    throw error;
  }
};
