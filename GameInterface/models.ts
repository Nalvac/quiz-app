export interface Player {
  id: string;
  username: string;
  score: number;
}

export interface GameRoom {
  roomId: string;
  theme: string;
  players: Player[];
  isPrivate: boolean;
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
  themes: string;
  difficultyLevels: string;
}
