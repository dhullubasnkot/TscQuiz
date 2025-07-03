import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import quizData from "../Data/QuizData";
import Navbar from "../navbar";
//new quiz
const NewQuiz = () => {
  const { category } = useParams();
  const navigate = useNavigate();

  const questions = React.useMemo(() => quizData[category] || [], [category]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [userAnswer, setUserAnswer] = useState(""); // For text input
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]); // Track user responses

  useEffect(() => {
    console.log("Category:", category);
    if (questions.length === 0) {
      navigate("/");
    } else {
      setCurrentQuestionIndex(0);
      setShuffledOptions(
        [...questions[0].options].sort(() => Math.random() - 0.5)
      );
    }
  }, [category, navigate, questions]);

  if (questions.length === 0)
    return (
      <div className="text-center text-red-500">
        No quiz found for "{category}"!
      </div>
    );

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = () => {
    let newCorrectAnswers = correctAnswers;
    let newWrongAnswers = wrongAnswers;

    let userResponse = "";

    if (currentQuestion.options) {
      // Multiple-choice question
      userResponse = selectedOption;
      if (selectedOption === currentQuestion.answer) {
        newCorrectAnswers += 1;
        setCorrectAnswers(newCorrectAnswers);
      } else {
        newWrongAnswers += 1;
        setWrongAnswers(newWrongAnswers);
        setShowCorrectAnswer(true);
      }
    } else {
      // Text input question
      userResponse = userAnswer.trim();
      if (
        userAnswer.trim().toLowerCase() ===
        currentQuestion.answer.trim().toLowerCase()
      ) {
        newCorrectAnswers += 1;
        setCorrectAnswers(newCorrectAnswers);
      } else {
        newWrongAnswers += 1;
        setWrongAnswers(newWrongAnswers);
        setShowCorrectAnswer(true);
      }
    }

    setUserAnswers([...userAnswers, userResponse]); // Save user response

    setTimeout(() => {
      goToNextQuestion(newCorrectAnswers, newWrongAnswers);
    }, 1000);
  };

  const skipQuestion = () => {
    setUserAnswers([...userAnswers, "Skipped"]); // Track skipped question
    goToNextQuestion(correctAnswers, wrongAnswers);
  };

  const goToNextQuestion = (newCorrectAnswers, newWrongAnswers) => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
      setUserAnswer("");
      setShowCorrectAnswer(false);
      setShuffledOptions(
        [...questions[currentQuestionIndex + 1].options].sort(
          () => Math.random() - 0.5
        )
      );
    } else {
      navigate("/result", {
        state: {
          correctAnswers: newCorrectAnswers,
          wrongAnswers: newWrongAnswers,
          totalQuestions: questions.length,
          userAnswers, // Pass user answers
          questions, // Pass questions
        },
      });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center h-[85vh] justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
        <div className="bg-white h-[500px] shadow-xl rounded-lg p-6 max-w-md w-full text-center relative">
          <h3 className="text-lg font-semibold text-gray-700 mt-2">
            ✅ Correct: {correctAnswers} | ❌ Wrong: {wrongAnswers}
          </h3>
          <h2 className="text-xl font-semibold text-gray-900 mt-4">
            {currentQuestion.question}
          </h2>

          {currentQuestion.options ? (
            // Multiple-choice question
            <div className="mt-4 space-y-2">
              {shuffledOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setSelectedOption(option)}
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
          ) : (
            // Text input question
            <div className="mt-4">
              <input
                type="text"
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                placeholder="Type your answer here"
                className="w-full py-2 px-4 border rounded-md text-black"
                disabled={userAnswer !== ""}
              />
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <button
              onClick={skipQuestion}
              className="px-4 py-2 text-black font-bold text-lg bg-emerald-100 rounded-md hover:bg-emerald-200 transition"
            >
              Skip
            </button>
          </div>

          {currentQuestion.options
            ? selectedOption && (
                <button
                  onClick={handleAnswer}
                  className="absolute bottom-4 right-4 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition"
                >
                  Submit Answer
                </button>
              )
            : userAnswer && (
                <button
                  onClick={handleAnswer}
                  className="absolute bottom-4 right-4 px-4 py-2 text-white bg-green-500 rounded-md hover:bg-green-600 transition"
                >
                  Submit Answer
                </button>
              )}

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

export default NewQuiz;
