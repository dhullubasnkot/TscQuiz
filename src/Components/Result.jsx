import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./navbar";

const Result = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const storedName = localStorage.getItem("quizUserName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  // Retrieve state values passed from the quiz
  const {
    correctAnswers,
    wrongAnswers,
    totalQuestions,
    userAnswers,
    questions,
    quizType,
    skipQuestion, // Get quiz type from location.state
  } = location.state || {};

  // Apply negative marking ONLY if quiz type is exactly 'tsc'
  const negativeMarks =
    quizType?.toLowerCase() === "tsc"
      ? parseFloat((wrongAnswers * 0.5).toFixed(2))
      : 0;

  const finalScore = Math.max(
    0,
    parseFloat((correctAnswers * 2 - negativeMarks).toFixed(2))
  );

  // Check if the final score is less than half of total questions
  const scoreThreshold = totalQuestions / 2;
  const isSuccess = finalScore > scoreThreshold;

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-400 to-purple-600 p-4">
        <div className="bg-white shadow-xl rounded-lg p-6 max-w-2xl w-full text-center">
          <h1 className="text-md font-bold text-purple-600 mb-2">
            👤 {userName}
          </h1>
          <h2 className="text-2xl font-bold text-gray-800">Quiz Completed!</h2>
          <p className="text-lg text-gray-600 mt-2">
            Total Questions:{" "}
            <span className="text-blue-500 font-semibold">
              {totalQuestions}
            </span>
          </p>

          <p className="text-lg text-gray-600 mt-2">
            Correct Answers:{" "}
            <span className="text-green-500 font-semibold">
              {correctAnswers}
            </span>
          </p>
          <p className="text-lg text-gray-600 mt-2">
            Wrong Answers:{" "}
            <span className="text-red-500 font-semibold">{wrongAnswers}</span>
          </p>

          {/* Show Negative Marks only if applicable */}
          {negativeMarks > 0 && (
            <p className="text-lg text-gray-600 mt-2">
              Negative Marks:{" "}
              <span className="text-red-500 font-semibold">
                -{negativeMarks}
              </span>
            </p>
          )}

          <p className="text-lg text-gray-600 mt-2">
            Final Score:{" "}
            <span className="text-blue-500 font-semibold">
              {finalScore} / {totalQuestions * 2}
            </span>
          </p>

          {/* Conditional Success or Hard Work Message */}
          <p className="text-xl mt-4 text-gray-700">
            {isSuccess
              ? "🎉 Congratulations! You've successfully passed!"
              : "💪 Keep working hard! You'll do better next time!"}
          </p>

          {/* Display Quiz Questions with User Answers */}
          <div className="mt-6 text-left">
            {questions?.map((q, index) => (
              <div
                key={index}
                className="mb-4 p-4 border rounded-lg bg-gray-100"
              >
                <p className="font-semibold text-gray-800">
                  Q{index + 1}: {q.question}
                </p>
                <ul className="mt-2">
                  {q.options.map((option, i) => (
                    <li
                      key={i}
                      className={`p-2 rounded-md ${
                        userAnswers[index] === option
                          ? userAnswers[index] === q.answer
                            ? "bg-green-300"
                            : "bg-red-300"
                          : ""
                      }`}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
                <p className="mt-2 text-blue-600">
                  Correct Answer: <strong>{q.answer}</strong>
                </p>
              </div>
            ))}
          </div>

          <button
            onClick={() => navigate("/")}
            className="mt-4 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
          >
            Restart Quiz
          </button>
        </div>
      </div>
    </>
  );
};

export default Result;
