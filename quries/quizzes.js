import {
  replaceMongoIdInArray,
  replaceMongoIdInObject,
} from "@/lib/convertData";
import { Quizset } from "@/models/quizset-model";
import { Quiz } from "@/models/quizzes-model";

export const getAllQuizSets = async (onlyActive) => {
  try {
    let quizSets = [];

    if (onlyActive) {
      quizSets = await Quizset.find({ active: true }).lean();
    } else {
      quizSets = await Quizset.find().lean();
    }

    return replaceMongoIdInArray(quizSets);
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuizSetById = async (quizSetId) => {
  try {
    const quizSet = await Quizset.findById(quizSetId)
      .populate({
        path: "quizIds",
        model: Quiz,
      })
      .lean();
    return replaceMongoIdInObject(quizSet);
  } catch (error) {
    throw new Error(error);
  }
};

export const createQuiz = async (data) => {
  try {
    const quiz = await Quiz.create(data);

    return quiz._id.toString();
  } catch (error) {
    throw new Error(error);
  }
};
