"use client";

import { getQuizById } from "@/app/action/quiz";
import { createContext, useState } from "react";

const QuizEditContext = createContext();

export const QuizEditProvider = ({ children }) => {
  const [editQuiz, setEditQuiz] = useState({});

  const editQuizData = async (id) => {
    try {
      const response = await getQuizById(id);
      setEditQuiz(response);
    } catch (error) {
      console.error("Failed to fetch quiz data:", error);
    }
  };

  return (
    <QuizEditContext.Provider value={{ editQuiz, setEditQuiz, editQuizData }}>
      {children}
    </QuizEditContext.Provider>
  );
};

export default QuizEditContext;
