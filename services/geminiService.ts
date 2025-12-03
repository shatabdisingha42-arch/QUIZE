import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion } from "../types";

const apiKey = process.env.API_KEY;

// Initialize the Gemini client
const ai = new GoogleGenAI({ apiKey: apiKey });

export const generateQuizQuestions = async (subject: string): Promise<QuizQuestion[]> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const prompt = `Generate a challenging and engaging multiple-choice quiz about "${subject}".
  Create exactly 5 questions.
  For each question, provide 4 options, the index of the correct option (0-3), and a brief interesting explanation of why that answer is correct.
  Ensure the tone is fun and educational.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The text of the question"
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "A list of 4 possible answers"
              },
              correctIndex: {
                type: Type.INTEGER,
                description: "The zero-based index of the correct answer (0-3)"
              },
              explanation: {
                type: Type.STRING,
                description: "A short explanation of the correct answer"
              }
            },
            required: ["question", "options", "correctIndex", "explanation"]
          }
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response received from Gemini.");
    }

    const quizData = JSON.parse(text) as QuizQuestion[];
    return quizData;

  } catch (error) {
    console.error("Failed to generate quiz:", error);
    throw error;
  }
};