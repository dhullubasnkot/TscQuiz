import React from "react";
import { useParams } from "react-router-dom";
import examData from "../Components/Data/CatDetails"; // Assuming this is your data
import Navbar from "./navbar";
import { Link } from "react-router-dom";

const QuizPage = () => {
  const { type } = useParams();
  const quizKey = {
    "teaching liscense": "teaching",
    tsc: "tsc",
  }[type?.toLowerCase()];

  const pageData = examData[quizKey]?.pageData;

  if (!pageData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="px-6 py-4 bg-white rounded-md shadow-md">
          <h2 className="text-2xl font-semibold text-red-500">Error</h2>
          <p className="text-gray-700">Invalid quiz type: "{type}"</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 min-h-screen py-12">
        <div className="container mx-auto px-4">
          {/* Header Section */}
          <header className="text-center mb-10">
            <h1 className="text-4xl font-bold text-gray-900">
              {pageData.title}
            </h1>
            <p className="mt-3 text-lg text-gray-700">{pageData.description}</p>
            <div className="inline-block w-24 h-1 bg-gradient-to-r from-green-400 to-lime-400 rounded-full mt-4"></div>
          </header>

          {/* Grid Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {pageData.items.map((item, index) => (
              <article
                key={index}
                className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="p-6 space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-gray-600">{item.description}</p>
                  <div className="text-center mt-6">
                    <Link
                      to={item.link}
                      className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-green-400 to-lime-500 rounded-md hover:bg-gradient-to-l focus:ring-4 focus:ring-lime-200"
                    >
                      {item.linkText}
                      <svg
                        className="w-4 h-4 ml-2 -mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        </div>
      </div>
    </>
  );
};

export default QuizPage;
