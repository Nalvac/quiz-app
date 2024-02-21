'use client'

import React, { useState } from 'react';

const QuizComponent = ({ questions }) => {
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
    <div>
      <h3>{currentQuestion.question}</h3>
      <ul>
        {currentQuestion.possibleResponses.map((response, index) => (
          <li key={index}>{response}</li>
        ))}
      </ul>
      <button onClick={handlePrevQuestion} disabled={currentQuestionIndex === 0}>
        Précédent
      </button>
      <button onClick={handleNextQuestion} disabled={currentQuestionIndex === questions.length - 1}>
        Suivant
      </button>
    </div>
  );
};

export default QuizComponent;
