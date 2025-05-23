import React from "react";
import { Link } from "react-router-dom";

const QuizCardPage = ({ quizParts }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">Quiz Sections</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {quizParts.map((part, index) => (
          <Link
            key={index}
            to={`/quiz/${part.id}`}
            className="bg-white shadow-lg rounded-lg p-6 hover:bg-blue-100 transition"
          >
            <h2 className="text-xl font-semibold">{part.title}</h2>
            <p className="text-gray-600">{part.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default QuizCardPage;
