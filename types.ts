export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export enum AppStatus {
  SETUP = 'SETUP',
  LOADING = 'LOADING',
  QUIZ = 'QUIZ',
  RESULTS = 'RESULTS',
  ERROR = 'ERROR'
}

export interface QuizState {
  currentQuestionIndex: number;
  score: number;
  answers: (number | null)[]; // User's selected index for each question
  questions: QuizQuestion[];
}