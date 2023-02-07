import * as db from "./mongoDb";

// #Creates and saves question to db
export const addQuestion = async (data) => {
  // { question, code, title, language, tags, category, type, score, option, answer } 
  console.log(data)
  return data;
};
