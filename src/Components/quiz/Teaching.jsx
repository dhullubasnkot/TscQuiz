import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import quizData from "../Data/QuizData"; // Adjust the path as necessary
import Navbar from "../navbar";

const Teaching = () => {
  const navigate = useNavigate();
  const { part } = useParams();
  const location = useLocation();

  // Detect quiz type from the route
  const pathSegments = location.pathname.split("/");
  const quizType = pathSegments[1]; // 'teaching' or 'tsc'
  const quizKey = `${quizType}-${part}`;

  const gkQuestions = quizData[quizKey] || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);

  const [userName, setUserName] = useState("");
  const [nameInput, setNameInput] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("quizUserName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  useEffect(() => {
    if (gkQuestions.length === 0) {
      navigate("/");
    } else {
      shuffleOptions();
    }
  }, [currentQuestionIndex, gkQuestions, navigate]);

  if (gkQuestions.length === 0)
    return <div>No quiz data available for part {part}</div>;

  const currentQuestion = gkQuestions[currentQuestionIndex];

  const shuffleOptions = () => {
    setShuffledOptions(
      [...currentQuestion.options].sort(() => Math.random() - 0.5)
    );
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    setUserAnswers((prev) => [...prev, option]);

    const isCorrect = option === currentQuestion.answer;
    setShowCorrectAnswer(!isCorrect);

    setTimeout(() => {
      goToNextQuestion(isCorrect);
    }, 1000);
  };

  const skipQuestion = () => {
    setUserAnswers((prev) => [...prev, "Skipped"]);
    goToNextQuestion(null);
  };
// updated next question
  const goToNextQuestion = (isCorrect = null) => {
    if (isCorrect !== null) {
      if (isCorrect) {
        setCorrectAnswers((prev) => prev + 1);
      } else {
        setWrongAnswers((prev) => prev + 1);
      }
    }

    if (currentQuestionIndex + 1 < gkQuestions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setShowCorrectAnswer(false);
      shuffleOptions();
    } else {
      setTimeout(() => {
        navigate("/result", {
          state: {
            correctAnswers:
              isCorrect === true ? correctAnswers + 1 : correctAnswers,
            wrongAnswers: isCorrect === false ? wrongAnswers + 1 : wrongAnswers,
            totalQuestions: gkQuestions.length,
            userAnswers,
            questions: gkQuestions,
            quizType,
          },
        });
      }, 100);
    }
  };//finished

  const handleStart = () => {
    if (nameInput.trim() !== "") {
      localStorage.setItem("quizUserName", nameInput.trim());
      setUserName(nameInput.trim());
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-[85vh] bg-gradient-to-br from-blue-400 to-purple-600 p-4">
        {userName === "" ? (
          <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
            <h2 className="text-2xl font-semibold mb-4">
              Enter your name to start
            </h2>
            <input
              type="text"
              className="w-full px-4 py-2 border rounded-md mb-4"
              placeholder="Your Name"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <button
              onClick={handleStart}
              className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Start Quiz
            </button>
          </div>
        ) : (
          <div className="bg-white shadow-xl h-[580px] rounded-lg p-6 max-w-md w-full text-center relative">
            <h1 className="text-md font-bold text-purple-600 mb-2">
              👤 {userName}
            </h1>
            <h3 className="text-lg font-semibold text-gray-700">
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
                  className={`block w-full py-2 rounded-md text-white font-semibold transition ${
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
        )}
      </div>
    </>
  );
};

export default Teaching;
