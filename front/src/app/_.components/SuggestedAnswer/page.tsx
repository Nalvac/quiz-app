'use client'


import React, {useState} from "react";

export default function SuggestedAnswerDisplay ({questions}){

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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

	return (
    <>
      <h2 className={`text-center text-2xl text-white p-30`}>
        {currentQuestion.question}
      </h2>
      <div className="grid grid-cols-2 gap-4">
        {currentQuestion.possibleResponses.map((option, index) => (
          <button
            key={index}
            className="bg-white	text-black px-4 py-2 rounded hover:bg-primary"
          >
            {option}
          </button>
        ))}
      </div>
      <div
        className={'d-flex mt-5 w-600 space-between'}
      >
        <button className={'btn btn-primary'} onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
          Précédent
        </button>
        <button className={'btn btn-primary'} onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
          Suivant
        </button>
      </div>
    </>
	)
}
