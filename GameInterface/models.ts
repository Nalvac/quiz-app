import {Socket} from "socket.io";

export interface Player {
  id: string;
  username: string;
  score: number;
  isAdmin: boolean;
}

export interface GameRoom {
  roomId?: string;
  name?: string,
  password?: string,
  isPrivate: boolean;
  clients?: Socket[];
  themes?: string[];
  createBY?: Socket;
  difficultyLevels: string;
  randomTheme: boolean;
  userName?: string;
  questions?: Array<QuestionGen>;
}

export interface PlayerAnswer {
  playerId: string;
  questionId: string;
  chosenOption: string;
  isCorrect: boolean;
}

export interface QuestionGen {
  question: string,
  possibleResponses: Array<string>,
  correctAnswer: string
}

export interface UserAnswer {
  question: string;
  response: string;
  isCorrect: boolean;
}

export interface Winner {
  clientId: string,
  score: number,
  playerName: string
}
