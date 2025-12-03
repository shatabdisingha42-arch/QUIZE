import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Search, BarChart3 } from 'lucide-react';
import { Button } from './Button';
import { Difficulty } from '../types';

interface SetupScreenProps {
  onStartQuiz: (subject: string, difficulty: Difficulty) => void;
  isLoading: boolean;
  error: string | null;
}

export const SetupScreen: React.FC<SetupScreenProps> = ({ onStartQuiz, isLoading, error }) => {
  const [subject, setSubject] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (subject.trim()) {
      onStartQuiz(subject, difficulty);
    }
  };

  const suggestions = [
    "Space Exploration", 
    "History of Jazz", 
    "React JS Patterns", 
    "Marine Biology",
    "Cybersecurity Basics",
    "Ancient Rome"
  ];

  const difficulties: Difficulty[] = ['Easy', 'Medium', 'Hard'];

  return (
    <div className="w-full max-w-2xl mx-auto p-8 flex flex-col items-center animate-fade-in relative z-10">
      
      {/* Hero Section */}
      <div className="mb-10 text-center transform transition-all hover:scale-105 duration-500">
        <div className="relative inline-flex items-center justify-center w-24 h-24 mb-6">
          <div className="absolute inset-0 bg-indigo-500 blur-xl opacity-50 rounded-full animate-pulse-slow"></div>
          <div className="relative bg-gradient-to-tr from-indigo-600 to-purple-600 w-full h-full rounded-full flex items-center justify-center shadow-2xl ring-4 ring-indigo-500/30">
            <BrainCircuit className="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-indigo-100 drop-shadow-sm">
          QUIZE
        </h1>
        <p className="text-indigo-200 text-lg md:text-xl max-w-md mx-auto leading-relaxed">
          Challenge yourself. Master any topic.
          <br/>
          <span className="text-indigo-400 text-sm font-medium uppercase tracking-wider">Powered by Gemini AI</span>
        </p>
      </div>

      {/* Input Form */}
      <div className="w-full bg-indigo-950/40 backdrop-blur-xl border border-indigo-500/20 rounded-3xl p-6 md:p-8 shadow-2xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Subject Input */}
          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-violet-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
            <div className="relative flex items-center bg-indigo-900/90 rounded-xl border border-indigo-700/50 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/50 transition-all overflow-hidden">
              <Search className="w-6 h-6 text-indigo-400 ml-4" />
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Ex: Quantum Physics, 90s Pop Music..."
                className="w-full p-4 md:p-5 bg-transparent text-white placeholder-indigo-400/70 outline-none text-lg font-medium"
                disabled={isLoading}
                autoFocus
              />
            </div>
          </div>

          {/* Difficulty Selection */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 ml-1">
              <BarChart3 className="w-4 h-4" />
              <p className="text-xs font-semibold uppercase tracking-widest">Select Difficulty</p>
            </div>
            <div className="grid grid-cols-3 gap-3">
              {difficulties.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => setDifficulty(level)}
                  disabled={isLoading}
                  className={`py-3 rounded-xl font-semibold transition-all duration-200 border relative overflow-hidden ${
                    difficulty === level
                      ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                      : 'bg-indigo-900/40 border-indigo-700/50 text-indigo-300 hover:bg-indigo-800/60'
                  }`}
                >
                  {difficulty === level && (
                    <div className="absolute inset-0 bg-white/10 animate-pulse-fast"></div>
                  )}
                  {level}
                </button>
              ))}
            </div>
          </div>

          {/* Suggestions */}
          <div className="space-y-3">
            <p className="text-xs font-semibold text-indigo-300 uppercase tracking-widest text-center">Popular Topics</p>
            <div className="flex flex-wrap gap-2 justify-center">
                {suggestions.map((s) => (
                    <button
                        key={s}
                        type="button"
                        onClick={() => setSubject(s)}
                        disabled={isLoading}
                        className="text-sm px-4 py-2 rounded-full bg-indigo-800/40 hover:bg-indigo-700 hover:text-white hover:scale-105 active:scale-95 text-indigo-200 border border-indigo-700/50 transition-all duration-200 font-medium"
                    >
                        {s}
                    </button>
                ))}
            </div>
          </div>

          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/30 text-red-200 rounded-xl text-sm text-center flex items-center justify-center gap-2 animate-shake">
              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            disabled={!subject.trim()} 
            isLoading={isLoading} 
            className="w-full text-lg py-4 font-bold shadow-xl shadow-indigo-900/20"
          >
            {isLoading ? 'Crafting your Quiz...' : 'Generate Quiz'}
            {!isLoading && <Sparkles className="w-5 h-5 ml-2" />}
          </Button>
        </form>
      </div>
    </div>
  );
};