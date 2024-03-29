'use client';

import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { SuccessSnackBar } from '@/app/_.components/Snackbar/Success';
import { ErrorSnackBar } from '@/app/_.components/Snackbar/Error';
import { LoadingQuiz } from '@/app/_.components/LoadingQuiz/LoadingQuiz';

interface IQuiz {
  question: string;
  possibleResponses: string[];
  correctResponse: string;
  theme: string;
}

interface ITheme {
  content: string;
}

const socket = io(process.env.BACKEND_URL || "http://localhost:3000");


export default function Quiz() {
  const [question, setQuestion] = useState<string>("");
  const [possibleResponses, setPossibleResponses] = useState<string[]>([]);
  const [correctResponse, setCorrectResponse] = useState("");
  const [score, setScore] = useState(0);
  const [isCorrect, setIsCorrect] = useState(false);
  const [optionSelected, setOptionSelected] = useState(false);
  const [time, setTime] = useState(0);
  const [questionNumber, setQuestionNumber] = useState(0);
  const [totalQuestions] = useState(10);
  const [theme] = useState("Mathématique");
  let [timer] = useState<NodeJS.Timeout | null>(null);


  //const {socket} = useUser();

  localStorage.setItem("questionNumber", questionNumber.toString());
  localStorage.setItem("score", score.toString());

  useEffect(() => {
    socket.once("connect", () => {
      console.log("connected", socket.id);
      socket.emit("quiz", {
        content: theme,
      })
    });

    socket.once("quiz", (data) => {
      let questionNumber = localStorage.getItem('questionNumber');
      setQuestion(data[questionNumber].question);
      setPossibleResponses(data[questionNumber].possibleResponses);
      setCorrectResponse(data[questionNumber].correctResponse);
    });

    if (question != "") {
      if (time < 20) {
        timer = setTimeout(() => {
          setTime(time + 1);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }

  }, [questionNumber, socket, theme, time]);

  const handleResponse = (response: string) => {
    if (correctResponse.includes(response) || correctResponse === response || response.includes(correctResponse)) {
      setIsCorrect(true);
      setScore(score + 1);
      if (timer) {
        clearTimeout(timer);
      }
    }
    setOptionSelected(true);
    if (timer) {
      clearTimeout(timer);
    }
  }

  const handleSubmit = () => {
    setQuestionNumber(questionNumber + 1);
    setOptionSelected(false);
    setIsCorrect(false);
    if (timer) {
      clearTimeout(timer);
    }
    setTime(0);
    socket.emit("quiz", {
      content: theme,
    });
    localStorage.setItem("score", score.toString());
    localStorage.setItem("questionNumber", questionNumber.toString());
  }

  if (questionNumber === totalQuestions) {
    return (
      <div className={`d-flex justify-content-center align-items-center flex-column flex-fill`}>
        <h1 className={`text-2xl text-black p-30`}>Votre score est de {score} / {totalQuestions}</h1>
      </div>
    )

  }

  return(
    <div className={`d-flex justify-content-center align-items-center flex-column flex-fill`}>
      <div className={`grid grid-cols-2`}>
        <h1 className={`text-2xl text-black p-30`}>
          {time}
        </h1>

        <h1 className={`text-2xl text-black p-30`}>
          {questionNumber + 1} / {totalQuestions}
        </h1>
      </div>

      {optionSelected ? (isCorrect ? <SuccessSnackBar /> : <ErrorSnackBar />) : null}

      {question ? null : <LoadingQuiz/>}


      <div className={` w-800 h-50`}>
        <h1 className={`text-center text-2xl text-white p-30`}>
          {question}
        </h1>
        <div className="grid grid-cols-2 gap-4">
          {possibleResponses.map((option, index) => (
            <button
              key={index}
              className="bg-white	text-black px-4 py-2 rounded hover:bg-primary"
              onClick={() => handleResponse(option)}
            >
              {option}
            </button>
          ))}
        </div>
        {optionSelected ? <div className={`mt-4 flex justify-end`}>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={() => handleSubmit()}>Next</button>
        </div> : null}
      </div>
    </div>
  )
}
