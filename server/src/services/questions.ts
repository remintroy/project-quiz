import { questions as QuestionDB } from "./mongoDb";
import { createError } from "./util";
import { QuestionBody } from "../defeniton";
import { availableLanguages, questionTypes } from "../appConfigs";

// #Creates and saves question to db
export const addQuestion = async (body: QuestionBody) => {
  try {
    // checks question type
    const questionTypesKeys = Object.keys(questionTypes);
    const availableLanguagesKeys = Object.keys(availableLanguages);

    try {
      // COMMON CHECK GUARDS
      if (!body.type) throw "A valid type of question is required";
      if (!body.language) throw "A valid language is required";
      if (!questionTypesKeys.includes(body.type.trim().toUpperCase())) throw "Invalid type of question";
      if (!availableLanguagesKeys.includes(body.language.trim().toUpperCase())) throw "A valid language is required";
      if (!body.question) throw "A valid question is required";
      if (!body.answer || body.answer?.length == 0) throw "A valid answer is requierd";
      if (!body.title) throw "A valid title is required";
      if (!body.category || body.category?.length == 0) throw "A valid category is required";

      body.question = body.question.trim();
      body.title = body.title.trim();
      body.language = body.language.trim().toUpperCase();
      body.type = body.type.trim().toUpperCase();
      // TAGS IS OPTIONAL
    } catch (error) {
      throw createError(400, typeof error == "string" ? error : "Invalid data passed");
    }

    try {
      // CHECK DATA REQUIEMENT ACCODING TO QUESTION TYPE
      switch (body.type) {
        case "MC": {
          if (!body.options || body.options?.length < 2)
            throw `At least 2 Options requied for ${questionTypes["MC"]} questions`;
          break;
        }
        case "SC": {
          if (!body.options || body.options?.length < 2)
            throw `At least 2 Options requied for ${questionTypes["SC"]} questions`;
          break;
        }
        default: {
          throw "This question type is currently not addable";
        }
      }
    } catch (error) {
      console.log(error);
      throw createError(400, typeof error == "string" ? error : "Invalid type passed");
    }

    try {
      // CREATES AND SAVES DATA
      const dataToSave = new QuestionDB(body);
      await dataToSave.save();
    } catch (error) {
      throw createError(500, "Faild to save data");
    }
    return `Question created successfully`;
  } catch (error) {
    throw error;
  }
};
