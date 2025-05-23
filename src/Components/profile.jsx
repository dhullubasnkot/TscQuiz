import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

const Profile = () => {
  const [userName, setUserName] = useState("");
  const [results, setResults] = useState([]);
  const [summary, setSummary] = useState({
    highest: null,
    lowest: null,
    latest: null,
  });

  useEffect(() => {
    const storedName = localStorage.getItem("quizUserName");
    if (storedName) setUserName(storedName);

    const quizResults = [];
    for (let key in localStorage) {
      if (key.startsWith("result-")) {
        try {
          const data = JSON.parse(localStorage.getItem(key));
          if (data) {
            data.key = key;
            quizResults.push(data);
          }
        } catch (e) {
          console.error("Error parsing result:", key);
        }
      }
    }

    // Sort by saved order (most recent last)
    quizResults.sort((a, b) => {
      const aTime = localStorage.getItem(`time-${a.key}`) || 0;
      const bTime = localStorage.getItem(`time-${b.key}`) || 0;
      return aTime - bTime;
    });

    // Store timestamp if not present
    quizResults.forEach((res) => {
      if (!localStorage.getItem(`time-${res.key}`)) {
        localStorage.setItem(`time-${res.key}`, Date.now());
      }
    });

    setResults(quizResults);

    if (quizResults.length > 0) {
      const highest = quizResults.reduce((max, curr) =>
        curr.correctAnswers > max.correctAnswers ? curr : max
      );
      const lowest = quizResults.reduce((min, curr) =>
        curr.correctAnswers < min.correctAnswers ? curr : min
      );
      const latest = quizResults[quizResults.length - 1];

      setSummary({ highest, lowest, latest });
    }
  }, []);

  const clearResults = () => {
    for (let key in localStorage) {
      if (key.startsWith("result-") || key.startsWith("time-")) {
        localStorage.removeItem(key);
      }
    }
    setResults([]);
    setSummary({ highest: null, lowest: null, latest: null });
  };

  const ScoreCard = ({ title, data }) => {
    if (!data) return null;
    return (
      <div className="bg-white shadow-md rounded-lg p-5 text-center">
        <h4 className="text-xl font-semibold text-purple-600 mb-3">{title}</h4>
        <p className="text-gray-700 capitalize">
          <span role="img" aria-label="book" className="mr-1">
            📚
          </span>{" "}
          {data.quizType} - {data.part}
        </p>
        <p className="text-green-500 font-medium">
          <span role="img" aria-label="check mark" className="mr-1">
            ✅
          </span>{" "}
          Correct: {data.correctAnswers}
        </p>
        <p className="text-red-500 font-medium">
          <span role="img" aria-label="cross mark" className="mr-1">
            ❌
          </span>{" "}
          Wrong: {data.wrongAnswers}
        </p>
        <p className="text-blue-500 font-medium">
          <span role="img" aria-label="bar chart" className="mr-1">
            📊
          </span>{" "}
          Total: {data.totalQuestions}
        </p>
      </div>
    );
  };

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen py-8">
        <div className="container mx-auto px-4 max-w-4xl bg-white shadow-lg rounded-lg p-6 mt-8">
          <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            <span role="img" aria-label="user icon" className="mr-2">
              👤
            </span>{" "}
            {userName}'s Quiz Journey
          </h2>

          {results.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-lg text-gray-600 italic">
                <span role="img" aria-label="magnifying glass" className="mr-2">
                  🔎
                </span>{" "}
                No quiz results found yet. Take a quiz to see your history here!
              </p>
            </div>
          ) : (
            <>
              <div className="flex justify-center mb-6">
                <button
                  className="px-5 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 font-semibold transition duration-200"
                  onClick={clearResults}
                >
                  <span role="img" aria-label="trash can" className="mr-2">
                    🗑️
                  </span>{" "}
                  Clear All Records
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <ScoreCard title="🏆 Top Performance" data={summary.highest} />
                <ScoreCard
                  title="⏱️ Most Recent Attempt"
                  data={summary.latest}
                />
                {summary.lowest && (
                  <ScoreCard title="📉 Initial Steps" data={summary.lowest} />
                )}
              </div>

              <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                Past Attempts
              </h3>
              <div className="space-y-4">
                {results.map((result, index) => (
                  <div
                    key={index}
                    className="bg-white shadow-md rounded-md border-l-4 border-purple-500 p-5 transition duration-200 hover:shadow-lg"
                  >
                    <h4 className="text-xl font-semibold capitalize text-gray-800 mb-2">
                      <span role="img" aria-label="pencil" className="mr-1">
                        ✏️
                      </span>{" "}
                      {result.quizType} - {result.part}
                    </h4>
                    <p className="text-green-600 font-medium">
                      <span role="img" aria-label="check" className="mr-1">
                        ✅
                      </span>{" "}
                      Correct Answers: {result.correctAnswers}
                    </p>
                    <p className="text-red-600 font-medium">
                      <span role="img" aria-label="x" className="mr-1">
                        ❌
                      </span>{" "}
                      Incorrect Answers: {result.wrongAnswers}
                    </p>
                    <p className="text-blue-600 font-medium">
                      <span
                        role="img"
                        aria-label="question mark"
                        className="mr-1"
                      >
                        ❓
                      </span>{" "}
                      Total Questions: {result.totalQuestions}
                    </p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
