import jwt from "jsonwebtoken";
import bCrypt from "bcryptjs";
import randomID from "random-id";
import dotEnv from "dotenv";
import { RequestDefention } from "../defeniton";
import { NextFunction, Response } from "express";
import { createError } from "./util";
import * as db from "./mongoDb";
import validator from "validator";

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
  return jwt.sign({ ...payload, access: true }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 60 * 60 * 1000 });
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
    req.user = await db.users.findOne({ user: payload?.uid }, { password: 0, _id: 0 });

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
    throw createError(500, "Error creating user id");
  }
};

const createUserWithEmail = async ({ email, password, name }: { email: string; password: string; name: string }) => {
  //
  try {
    name = name.trim();
    email = email.trim();
    password = password.trim();

    // validating inputs
    if (!validator.isEmail(email)) throw createError(400, "Invalid email");
    if (password.length == 0) throw createError(400, "Password is requied");
    if (password.length < 6) throw createError(400, "Password must contain 6 character's");
    if (!/^[a-zA-Z]+ [a-zA-Z]+$/.test(name) || /^[a-zA-Z]+[a-zA-Z]$/.test(name))
      throw createError(400, "Enter a valid name");

    // ---- CREATING USER -----
    let existingData: object;
    try {
      // check for existing data
      existingData = await db.users.findOne({ email: email });
    } catch (error) {
      // error
      throw createError(500, "Faild to fetch nessory data");
    }

    // user exist
    if (existingData) throw createError(400, "Account with this email already exists");

    try {
      // creating passowrd hash
      password = await bCrypt.hash(password, 10);
    } catch (error) {
      throw createError(500, "Error creating account");
    }

    const newUserData = {
      name,
      email,
      password,
      uid: await createUserID(),
    };

    // user object
    const newUser = new db.users(newUserData);

    try {
      // saves new user data to db
      await newUser.save();
    } catch (error) {
      throw createError(500, "Error creating user");
    }

    // ----- TOKENS -----
    const tokensForUser: { accessToken: string; refreshToken: string } = { accessToken: null, refreshToken: null };
    try {
      // creates token's for new user
      tokensForUser.accessToken = generateAccessToken({ uid: newUser.uid });
      tokensForUser.refreshToken = generateRefreshToken({ uid: newUser.uid });
    } catch (error) {
      throw createError(500, "User created but faild to login. Try to login after some time");
    }

    try {
      // saves refresh token to db
      await new db.refreshTockens({ value: tokensForUser.refreshToken, uid: newUser.uid }).save();
    } catch (error) {
      throw createError(500, "User created but faild to login. Try to login after some time");
    }

    // user data and tokes successfully created
    return tokensForUser;
    //..
  } catch (error) {
    // handling error
    throw error;
  }
};

// TODO: 
const signInUserWithGoogle = async ({ tokenId: string }) => {
  console.log("google");
};

// TODO:
const signInUserWithGithub = async ({ tokenId: string }) => {
  console.log("github");
};

// signup user with email and password
export const signUpUser = async (body: any, type: string) => {
  try {
    // type of login adn curresponding actions
    const actions = {
      email: createUserWithEmail,
      google: signInUserWithGoogle,
      github: signInUserWithGithub,
    };

    // getting curresponding funciton
    const currentAction = actions[type.trim()];

    if (!currentAction) throw createError(400, "Invaid authentication type");

    return currentAction(body);
    //...
  } catch (error) {
    throw error;
  }
};

const test = async () => {
  try {
    const data = await signUpUser(
      {
        name: "sample Name",
        email: "abc@gmail.com",
        password: "samplePsw",
      },
      "email"
    );
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

// test();
