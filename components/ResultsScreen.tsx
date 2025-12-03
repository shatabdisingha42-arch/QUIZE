import React from 'react';
import { Trophy, RefreshCw, Star, BookOpen } from 'lucide-react';
import { Button } from './Button';

interface ResultsScreenProps {
  score: number;
  totalQuestions: number;
  subject: string;
  onRestart: () => void;
}

export const ResultsScreen: React.FC<ResultsScreenProps> = ({ score, totalQuestions, subject, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message = "";
  let subMessage = "";
  let colorClass = "";
  
  if (percentage === 100) {
    message = "Quiz Master!";
    subMessage = "Flawless victory. You're an expert.";
    colorClass = "text-yellow-400";
  } else if (percentage >= 80) {
    message = "Excellent!";
    subMessage = "You have a strong grasp of this topic.";
    colorClass = "text-green-400";
  } else if (percentage >= 60) {
    message = "Good Effort!";
    subMessage = "You're on the right track.";
    colorClass = "text-blue-400";
  } else {
    message = "Keep Learning!";
    subMessage = "Every mistake is a lesson learned.";
    colorClass = "text-indigo-300";
  }

  return (
    <div className="w-full max-w-lg mx-auto p-8 text-center animate-fade-in">
      
      <div className="relative inline-block mb-10 group">
        <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-orange-500 blur-2xl opacity-40 rounded-full animate-pulse-slow"></div>
        <div className="relative bg-gradient-to-br from-indigo-800 to-indigo-950 p-8 rounded-full shadow-2xl border-4 border-indigo-700/50 group-hover:scale-110 transition-transform duration-300">
          {percentage >= 80 ? (
            <Trophy className="w-20 h-20 text-yellow-400" />
          ) : (
            <Star className="w-20 h-20 text-indigo-300" />
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className={`text-5xl font-black mb-2 ${colorClass} drop-shadow-md`}>
          {score}/{totalQuestions}
        </h2>
        <p className="text-indigo-400 uppercase tracking-widest font-bold text-sm">Score</p>
      </div>

      <div className="bg-indigo-900/30 backdrop-blur-md rounded-2xl p-8 mb-8 border border-indigo-500/20 shadow-xl">
        <h3 className="text-2xl font-bold text-white mb-2">{message}</h3>
        <p className="text-indigo-200 mb-6 text-lg">{subMessage}</p>
        
        <div className="h-px w-full bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent my-6"></div>

        <div className="flex items-center justify-center gap-2 text-indigo-300 bg-indigo-950/50 py-3 px-6 rounded-xl mx-auto w-fit">
          <BookOpen className="w-4 h-4" />
          <span className="text-sm">Subject: <span className="font-semibold text-white ml-1">{subject}</span></span>
        </div>
      </div>

      <div className="space-y-4">
        <Button onClick={onRestart} className="w-full py-4 text-lg font-semibold shadow-lg shadow-indigo-600/20 hover:shadow-indigo-600/40">
          <RefreshCw className="w-5 h-5 mr-2" />
          Create New Quiz
        </Button>
      </div>
    </div>
  );
};