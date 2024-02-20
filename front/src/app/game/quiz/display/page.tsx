'use client';
import React, { useEffect, useState } from 'react';
import { io } from "socket.io-client";
import { Loading } from '@/app/_.components/Loading/Loading';

const socket = io(process.env.BACKEND_URL || "http://localhost:3000")

interface IQuiz {
  question: string;
  possibleResponses: string[];
  correctResponse: string;
  theme: string;
}

interface ITheme {
  content: string;
}

export default function Quiz() {
  const [question, setQuestion] = useState<string>("");
  const [possibleResponses, setPossibleResponses] = useState<string[]>([]);
  const [correctResponse, setCorrectResponse] = useState("");

  useEffect(() => {
    socket.once("connect", () => {
      console.log("connected", socket.id);
      socket.emit("quiz", {
        content: "Mathématique",
      })
    });
    socket.on("quiz", (data) => {
      console.log(data);
      setQuestion(data[0].question);
      setPossibleResponses(data[0].possibleResponses);
      setCorrectResponse(data[0].correctResponse);
    });
  }, []);

  const handleSubmit = () => {
    console.log("submit");
  };

  const handleResponse = (response: string) => {
    if (correctResponse.includes(response) || correctResponse === response) {
      console.log("Correct");
    } else {
      console.log("Incorrect");
    }
  }

	return(
    <div className={`d-flex justify-content-center align-items-center flex-column flex-fill`}>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">Next</button>
      <p>1/5</p>
      <p>chronometre</p>
      <Loading />
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
      </div>
    </div>
  )
}
