import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// finds latency of database connection
const dbLatencyLoggerTime: any = new Date();
const dbLatencyLogger = () => {
  const currentTime: any = new Date();
  console.log(`[-] Database connected in : ${currentTime - dbLatencyLoggerTime}ms`);
};

const db = mongoose.createConnection(process.env.DB_URL);

db.on("error", (error) => console.error(error));
db.once("open", () => dbLatencyLogger());

// users schema
export const users = db.model(
  "users",
  new mongoose.Schema({
    name: String,
    password: String,
    uid: String,
    email: String,
    img: String,
    admin: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: new Date(),
    },
    preferences: {
      type: Object,
      default: {
        languages: [],
      },
    },
  })
);

// to save refresh tokens
export const refreshTockens = db.model(
  "refreshTockens",
  new mongoose.Schema({
    value: String,
    uid: String,
    createdAt: {
      type: Date,
      default: new Date(),
    },
  })
);
