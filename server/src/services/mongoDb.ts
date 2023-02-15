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
    provider: String,
    uid: String,
    email: String,
    img: String,
    photoURL: String,
    phone: String,
    disabled: { type: Boolean, default: false },
    admin: { type: Boolean, default: false },
    createdAt: { type: Date, default: new Date() },
    lastLogin: { type: Date, default: new Date() },
    lastRefresh: { type: Date, default: new Date() },
    preferences: {
      type: Object,
      default: {
        languages: [],
        subjects: [],
        difficulty: {
          type: Number,
          default: 0,
        },
        steps: {
          type: Number,
          default: 0,
        },
      },
    },
  })
);

// questions interaction by user
export const userQuestions = db.model(
  "userquestions",
  new mongoose.Schema({
    uid: String,
    questions: [
      {
        qid: String,
        time: [
          {
            start: Date,
            end: Date,
          },
        ],
        isUpdated: {
          type: Object,
          default: {
            date: Date,
            status: false,
          },
        },
        docAttendence: {
          type: Object,
          default: {
            status: false,
            date: Date,
          },
        },
        score: {
          type: Number,
          default: 0,
        },
        status: {
          type: Number,
          default: 0,
        },
      },
    ],
  })
);

// questions
export const questions = db.model(
  "questions",
  new mongoose.Schema({
    qid: String, // question id
    question: String, // actual question to ask e.b.. what is the sum of 1 and 2
    title: String, // a title for question e.g.. apple and orange
    type: String, // type of questin e.b.. choice questions, write answer questions.
    score: Number, // how many score question contians
    language: String, // this question is focusd on which language
    options: [], // options to choose
    answer: [], // answer index or answer itself as the first index
    code: String, // actuial code displayed to user as question
    tags: [String], // tags
    category: [String], // question category e.g.. array, linkedList
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
