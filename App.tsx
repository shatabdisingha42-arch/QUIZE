import React, { useState } from 'react';
import { SetupScreen } from './components/SetupScreen';
import { QuizScreen } from './components/QuizScreen';
import { ResultsScreen } from './components/ResultsScreen';
import { generateQuizQuestions } from './services/geminiService';
import { AppStatus, QuizQuestion } from './types';

function App() {
  const [status, setStatus] = useState<AppStatus>(AppStatus.SETUP);
  const [subject, setSubject] = useState('');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const handleStartQuiz = async (inputSubject: string) => {
    setSubject(inputSubject);
    setStatus(AppStatus.LOADING);
    setError(null);

    try {
      const generatedQuestions = await generateQuizQuestions(inputSubject);
      setQuestions(generatedQuestions);
      setStatus(AppStatus.QUIZ);
    } catch (err: any) {
      console.error(err);
      setError("Failed to generate quiz. Please check your connection and try again.");
      setStatus(AppStatus.SETUP);
    }
  };

  const handleFinishQuiz = (finalScore: number) => {
    setScore(finalScore);
    setStatus(AppStatus.RESULTS);
  };

  const handleRestart = () => {
    setSubject('');
    setQuestions([]);
    setScore(0);
    setError(null);
    setStatus(AppStatus.SETUP);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 md:p-8 overflow-hidden relative font-sans">
      
      {/* Dynamic Background */}
      <div className="fixed inset-0 -z-20 bg-[#0f0c29] bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e]"></div>
      
      {/* Ambient Orbs */}
      <div className="fixed top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-indigo-600/20 rounded-full blur-[100px] animate-pulse-slow"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-purple-600/20 rounded-full blur-[100px] animate-pulse-slow delay-1000"></div>

      <div className="w-full max-w-4xl relative z-10">
        {status === AppStatus.SETUP && (
          <SetupScreen 
            onStartQuiz={handleStartQuiz} 
            isLoading={false}
            error={error} 
          />
        )}

        {status === AppStatus.LOADING && (
          <div className="flex flex-col items-center justify-center animate-fade-in text-center p-12 bg-indigo-950/30 backdrop-blur-lg rounded-3xl border border-indigo-500/20 shadow-2xl">
            <div className="relative w-24 h-24 mb-8">
                <div className="absolute inset-0 border-4 border-indigo-500/20 rounded-full"></div>
                <div className="absolute inset-0 border-4 border-t-indigo-400 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <div className="absolute inset-4 bg-indigo-500/20 blur-md rounded-full animate-pulse"></div>
            </div>
            <h2 className="text-3xl font-bold text-white mb-3">Generating Quiz...</h2>
            <p className="text-indigo-200 text-lg max-w-sm">
              Our AI is crafting challenging questions about <span className="text-white font-semibold">"{subject}"</span>
            </p>
          </div>
        )}

        {status === AppStatus.QUIZ && (
          <QuizScreen 
            questions={questions} 
            onFinish={handleFinishQuiz} 
          />
        )}

        {status === AppStatus.RESULTS && (
          <ResultsScreen 
            score={score} 
            totalQuestions={questions.length} 
            subject={subject}
            onRestart={handleRestart} 
          />
        )}
      </div>
    </div>
  );
}

export default App;