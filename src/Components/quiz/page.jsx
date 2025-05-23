import React, { useState, useEffect } from "react";
import quizData from "../Data/QuizData";
import { useNavigate } from "react-router-dom";
import Navbar from "../navbar";

const GkQuiz = () => {
  const navigate = useNavigate();
  const gkQuestions = React.useMemo(() => quizData["gk"] || [], []);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]); // Track user answers

  useEffect(() => {
    if (gkQuestions.length === 0) {
      navigate("/");
    } else {
      setShuffledOptions(
        [...gkQuestions[currentQuestionIndex].options].sort(
          () => Math.random() - 0.5
        )
      );
    }
  }, [currentQuestionIndex, gkQuestions, navigate]);

  useEffect(() => {
    const preventExit = (event) => {
      event.preventDefault();
      event.returnValue =
        "Are you sure you want to leave? Your progress will be lost!";
    };
    window.addEventListener("beforeunload", preventExit);

    return () => {
      window.removeEventListener("beforeunload", preventExit);
    };
  }, []);

  if (gkQuestions.length === 0) return null;

  const currentQuestion = gkQuestions[currentQuestionIndex];

  const handleAnswer = (option) => {
    setSelectedOption(option);

    let newCorrectAnswers = correctAnswers;
    let newWrongAnswers = wrongAnswers;

    if (option === currentQuestion.answer) {
      newCorrectAnswers += 1;
      setCorrectAnswers(newCorrectAnswers);
    } else {
      newWrongAnswers += 1;
      setWrongAnswers(newWrongAnswers);
      setShowCorrectAnswer(true);
    }

    setUserAnswers([...userAnswers, option]); // Store user answer

    setTimeout(() => {
      goToNextQuestion(newCorrectAnswers, newWrongAnswers);
    }, 1000);
  };

  const skipQuestion = () => {
    setUserAnswers([...userAnswers, "Skipped"]); // Mark skipped
    goToNextQuestion(correctAnswers, wrongAnswers);
  };

  const goToNextQuestion = (newCorrectAnswers, newWrongAnswers) => {
    if (currentQuestionIndex + 1 < gkQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowCorrectAnswer(false);
      setShuffledOptions(
        [...gkQuestions[currentQuestionIndex + 1].options].sort(
          () => Math.random() - 0.5
        )
      );
    } else {
      navigate("/result", {
        state: {
          correctAnswers: newCorrectAnswers,
          wrongAnswers: newWrongAnswers,
          totalQuestions: gkQuestions.length,
          userAnswers, // Pass user answers
          questions: gkQuestions, // Pass questions
        },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-[85vh] justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
        <div className="bg-white shadow-xl h-[550px] rounded-lg p-6 max-w-md w-full text-center relative">
          <h3 className="text-lg font-semibold text-gray-700 mt-2">
            ✅ Correct: {correctAnswers} | ❌ Wrong: {wrongAnswers}
          </h3>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            {currentQuestion.question}
          </h2>
          <div className="mt-4 space-y-2">
            {shuffledOptions.map((option) => (
              <button
                key={option}
                onClick={() => handleAnswer(option)}
                className={`block w-full py-2 rounded-md text-white font-semibold transition 
                  ${
                    selectedOption === option
                      ? option === currentQuestion.answer
                        ? "bg-green-500"
                        : "bg-red-500"
                      : "bg-blue-500 hover:bg-blue-600"
                  }`}
                disabled={selectedOption !== null}
              >
                {option}
              </button>
            ))}
          </div>
          <div className="absolute bottom-4 right-4">
            <button
              onClick={skipQuestion}
              className="px-4 py-2 text-black font-bold text-lg bg-emerald-100 rounded-md hover:bg-emerald-200 transition"
            >
              Skip
            </button>
          </div>
          {showCorrectAnswer && (
            <p className="mt-4 text-lg font-semibold text-green-500">
              ✅ Correct answer: {currentQuestion.answer}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default GkQuiz;
