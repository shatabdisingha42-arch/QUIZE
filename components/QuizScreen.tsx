import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { Button } from './Button';
import { CheckCircle2, XCircle, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizScreenProps {
  questions: QuizQuestion[];
  onFinish: (score: number) => void;
}

export const QuizScreen: React.FC<QuizScreenProps> = ({ questions, onFinish }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIdx];

  const handleOptionSelect = (index: number) => {
    if (isAnswerRevealed) return;
    setSelectedOption(index);
    setIsAnswerRevealed(true);
    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswerRevealed(false);
    } else {
      // Score is already updated in state by the time we click finish
      onFinish(score);
    }
  };

  const letterLabels = ['A', 'B', 'C', 'D'];

  return (
    <div className="w-full max-w-3xl mx-auto p-4 md:p-6 animate-fade-in-up">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <span className="text-indigo-200 text-sm font-bold tracking-wider uppercase">Question {currentQuestionIdx + 1} / {questions.length}</span>
          <span className="bg-indigo-900/50 text-indigo-200 px-3 py-1 rounded-lg text-sm font-mono border border-indigo-500/30">
            Score: {score}
          </span>
        </div>
        <div className="w-full bg-indigo-950 rounded-full h-3 overflow-hidden border border-indigo-900">
          <div 
            className="bg-gradient-to-r from-indigo-500 to-purple-500 h-full rounded-full transition-all duration-700 ease-out shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
            style={{ width: `${((currentQuestionIdx + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question Card */}
      <div className="bg-indigo-900/20 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 md:p-10 shadow-2xl mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-snug">
          {currentQuestion.question}
        </h2>

        <div className="space-y-4">
          {currentQuestion.options.map((option, idx) => {
            let containerStyle = "border-indigo-800/50 bg-indigo-900/30 text-indigo-100 hover:bg-indigo-800/50 hover:border-indigo-600";
            let labelStyle = "bg-indigo-800 text-indigo-300";

            if (isAnswerRevealed) {
              if (idx === currentQuestion.correctIndex) {
                containerStyle = "border-green-500/50 bg-green-500/10 text-green-100";
                labelStyle = "bg-green-500 text-white";
              } else if (idx === selectedOption) {
                containerStyle = "border-red-500/50 bg-red-500/10 text-red-100";
                labelStyle = "bg-red-500 text-white";
              } else {
                containerStyle = "border-transparent bg-indigo-900/10 text-indigo-500 opacity-50";
                labelStyle = "bg-indigo-900/50 text-indigo-600";
              }
            } else if (selectedOption === idx) {
              containerStyle = "border-indigo-500 bg-indigo-600 text-white ring-2 ring-indigo-400/50";
              labelStyle = "bg-white text-indigo-600";
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswerRevealed}
                className={`w-full group relative flex items-center p-4 rounded-xl border-2 transition-all duration-300 ${containerStyle}`}
              >
                <span className={`flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-lg font-bold mr-4 transition-colors ${labelStyle}`}>
                  {letterLabels[idx]}
                </span>
                <span className="font-medium text-lg text-left flex-grow">{option}</span>
                
                {/* Status Icons */}
                <div className="ml-3">
                  {isAnswerRevealed && idx === currentQuestion.correctIndex && (
                    <CheckCircle2 className="w-6 h-6 text-green-400 animate-bounce-short" />
                  )}
                  {isAnswerRevealed && idx === selectedOption && idx !== currentQuestion.correctIndex && (
                    <XCircle className="w-6 h-6 text-red-400" />
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Explanation Area */}
      {isAnswerRevealed && (
        <div className="animate-slide-up space-y-6">
          <div className="bg-indigo-950/50 border border-indigo-500/30 rounded-2xl p-6 flex gap-4 shadow-lg">
            <div className="bg-indigo-500/20 p-2 rounded-full h-fit">
              <HelpCircle className="w-6 h-6 text-indigo-300" />
            </div>
            <div>
              <h4 className="font-bold text-indigo-200 mb-2 text-sm uppercase tracking-wider">Why is this correct?</h4>
              <p className="text-indigo-50 text-lg leading-relaxed">{currentQuestion.explanation}</p>
            </div>
          </div>
          
          <div className="flex justify-end">
            <Button onClick={handleNext} className="w-full md:w-auto px-10 text-lg py-4 shadow-xl shadow-indigo-900/30">
              {currentQuestionIdx === questions.length - 1 ? 'See Results' : 'Next Question'}
              <ArrowRight className="w-6 h-6 ml-2" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};