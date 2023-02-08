import React from "react";
// import NavBar from "../../components/NavBar/NavBar";
import "./Quiz.css";

//importing module for code highlighting
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/prism";

function Quiz() {
  //To HighLight the code
  // Add the code questions in the CodeString
  const codeString = `var a = orange; 
let b = apple;      
console.log(this.a,this.b); lorem*100
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
// finds latency of database connection
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
  })
);
// questions
export const questions = db.model(
  "questions",
  new mongoose.Schema({
    qid: String,
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
`;

  return (
    <>
      {/* <NavBar /> */}
      <div className="QuizPageQuestion">
        <div className="quiz">
          <h5 className="quiz-name">7 : Apple orange</h5>
          <p className="timer">00:45</p>
        </div>

        <div className="code-question">
          <SyntaxHighlighter language="javascript" style={dracula}>
            {/*  
                    Specify the Code Language above
                    To HighLight the code 
                    Add the code questions in the CodeString Above  
                    */}
            {codeString}
          </SyntaxHighlighter>
        </div>
        <div className="hashtags">
          <span>#js </span>
          <span>#creativecoding</span>
        </div>
        <div className="question-headline">
          <h4 className="question-h4">Q. What will be the output for the code given above ?</h4>
        </div>
        <span className="choose-option">Choose the correct option</span>

        <div className="answer-options">
          <div className="options">Apple</div>
          <div className="options">Orange</div>
          <div className="options">Apple,Orange</div>
          <div className="options">Error</div>
        </div>

        <span className="how-works">
          <span className="material-symbols-outlined">info</span>Don't know. See how it works{" "}
        </span>
        <div className="nxt_btn_cont">
          <div className="next-question">Next Question</div>
        </div>
      </div>
    </>
  );
}

export default Quiz;
