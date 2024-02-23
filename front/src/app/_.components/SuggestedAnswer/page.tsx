'use client'


import React, { useState, useEffect } from "react";
import { QuestionGen, UserAnswer } from "gameinterface/models";
import {useUser} from "@/context/userContext";

const SuggestedAnswerDisplay: React.FC<{ questions: QuestionGen[] , onGameEnd: (score: number, playerName: string) => void}> = ({ questions, onGameEnd}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<UserAnswer>>([]);
  const [isCorrectAnswerSelected, setIsCorrectAnswerSelected] =  useState<boolean | null>(null);
  const {userContextName} = useUser();

  useEffect(() => {
    setIsCorrectAnswerSelected(null);
  }, [currentQuestionIndex]);

  const currentQuestion = questions[currentQuestionIndex];
  const isQuestionAnswered = userAnswers.some(
    (answer) => answer.question === currentQuestion.question
  );

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }else {
      const score = userAnswers.filter((answer) => answer.isCorrect).length;
      onGameEnd(score, userContextName);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerClick = (response: string, correctAnswer: string) => {
    if (isQuestionAnswered) {
      return;
    }

    const isCorrect = response === correctAnswer;
    const userAnswer = {
      question: currentQuestion.question,
      response: response,
      isCorrect: isCorrect,
    };
    setUserAnswers([...userAnswers, userAnswer]);
    setIsCorrectAnswerSelected(isCorrect);
  };

  return (
    <>
      <h2 className={`text-center text-2xl text-white p-30`}>
        {currentQuestion.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.possibleResponses.map(
          (response: string, index: number) => {
            const formattedResponse = response.toLowerCase().trim();
            const formattedCorrectAnswer = currentQuestion.correctAnswer.toLowerCase().trim();

            return (
              <button
                key={index}
                className={`${
                  isCorrectAnswerSelected !== null &&
                  formattedResponse === formattedCorrectAnswer
                    ? "bg-green-500"
                    : isCorrectAnswerSelected === false &&
                    formattedResponse === formattedCorrectAnswer
                      ? "bg-red-500"
                      : isQuestionAnswered && formattedResponse === formattedCorrectAnswer
                        ? "bg-green-500"
                        : isQuestionAnswered
                          ? "bg-red-500"
                          : "bg-white"
                } text-black px-4 py-2 rounded hover:bg-primary`}
                onClick={() =>
                  handleAnswerClick(formattedResponse, formattedCorrectAnswer)
                }
                disabled={isCorrectAnswerSelected !== null || isQuestionAnswered}
              >
                {response}
              </button>
            );
          }
        )}

      </div>
      <div className={"d-flex mt-5 w-600 space-between"}>
        <button
          className={"btn btn-primary"}
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
        >
          Précédent
        </button>
        <button
          className={"btn btn-primary"}
          onClick={handleNextQuestion}
        >
          Suivant
        </button>
      </div>
    </>
  );
};

export default SuggestedAnswerDisplay;


