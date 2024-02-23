'use client'


import React, { useState } from "react";
import {QuestionGen, UserAnswer} from 'gameinterface/models'

const SuggestedAnswerDisplay: React.FC<{ questions: QuestionGen[] }> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Array<UserAnswer>>([]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleAnswerClick = (response: string) => {
    const userAnswer = {
      question: currentQuestion.question,
      response: response,
    };
    setUserAnswers([...userAnswers, userAnswer]);
    handleNextQuestion();
  };

  return (
    <>
      <h2 className={`text-center text-2xl text-white p-30`}>
        {currentQuestion.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.possibleResponses.map((response: string, index: number) => (
          <button
            key={index}
            className="bg-white	text-black px-4 py-2 rounded hover:bg-primary"
            onClick={() => handleAnswerClick(response)}
          >
            {response}
          </button>
        ))}
      </div>
      <div className={'d-flex mt-5 w-600 space-between'}>
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
          disabled={currentQuestionIndex === questions.length - 1}
        >
          Suivant
        </button>
      </div>
    </>
  );
}

export default SuggestedAnswerDisplay;

