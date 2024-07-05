"use server";

import { getSlug } from "@/lib/convertData";
import { Quizset } from "@/models/quizset-model";
import { createQuiz } from "@/quries/quizzes";

export const updateQuizSetTitle = async (quizSetId, data) => {
  try {
    await Quizset.findByIdAndUpdate(quizSetId, data);
  } catch (error) {
    throw new Error(error);
  }
};

export const addQuizToQuizSet = async (quizSetId, data) => {
  try {
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
