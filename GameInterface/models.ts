import {Socket} from "socket.io";

export interface Player {
  id: string;
  username: string;
  score: number;
  isAdmin: boolean;
}

export interface GameRoom {
  roomId?: string;
  theme: Array<string>;
  name: string,
  password: string,
  isPrivate: boolean;
  clients?: Socket[];
  themes?: string[];
  createBY?: Socket;
  difficultyLevels: string;
  randomTheme: boolean
}

export interface Question {
  id: string;
  theme: string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export interface PlayerAnswer {
  playerId: string;
  questionId: string;
  chosenOption: string;
  isCorrect: boolean;
}

export interface QuizConfig {
  themes?: string[];
  difficultyLevels: string;
  randomTheme: boolean
}
