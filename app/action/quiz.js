"use server";

import { getSlug, replaceMongoIdInObject } from "@/lib/convertData";
import { Quizset } from "@/models/quizset-model";
import { Quiz } from "@/models/quizzes-model";
import { createQuiz } from "@/quries/quizzes";
import { dbConnect } from "@/services/mongo";

export const updateQuizSetTitle = async (quizSetId, data) => {
  try {
    await dbConnect();
    await Quizset.findByIdAndUpdate(quizSetId, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const addQuizToQuizSet = async (quizSetId, data) => {
  try {
    await dbConnect();
    // trans form data
    const payload = {};
    payload["title"] = data["title"];
    payload["description"] = data["description"];
    payload["slug"] = getSlug(data["title"]);
    payload["options"] = [
      {
        text: data.optionA.label,
        is_correct: data.optionA.isTrue,
      },
      {
        text: data.optionB.label,
        is_correct: data.optionB.isTrue,
      },
      {
        text: data.optionC.label,
        is_correct: data.optionC.isTrue,
      },
      {
        text: data.optionD.label,
        is_correct: data.optionD.isTrue,
      },
    ];

    // create quiz
    const quizId = await createQuiz(payload);

    // get the quizset for pushing
    const quizSet = await Quizset.findById(quizSetId);

    quizSet.quizIds.push(quizId);
    quizSet.save();
  } catch (error) {
    throw new Error(error);
  }
};

export const addQuiz = async (data) => {
  try {
    await dbConnect();
    const quizSet = await Quizset.create(data);

    return quizSet._id.toString();
  } catch (error) {
    throw new Error(error);
  }
};

export const updateQuizSetStatus = async (quizSetId) => {
  try {
    await dbConnect();
    const quizSet = await Quizset.findById(quizSetId);
    const res = await Quizset.findByIdAndUpdate(
      quizSetId,
      { active: !quizSet.active },
      { lean: true }
    );

    return res.active;
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteQuizSet = async (quizSetId) => {
  try {
    await dbConnect();
    await Quizset.findByIdAndDelete(quizSetId);
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteQuiz = async (quizId, quizSetId) => {
  try {
    await dbConnect();
    const quizSet = await Quizset.findById(quizSetId);
    quizSet.quizIds.pull(quizId);

    await Quiz.findByIdAndDelete(quizId);

    quizSet.save();
  } catch (error) {
    throw new Error(error);
  }
};

export const getQuizById = async (quizId) => {
  try {
    await dbConnect();
    const quiz = await Quiz.findById(quizId).lean();
    const convertData = replaceMongoIdInObject(quiz);
    return convertData;
  } catch (error) {
    throw new Error(error);
  }
};
