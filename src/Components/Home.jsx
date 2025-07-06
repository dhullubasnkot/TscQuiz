import { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "./navbar";

const categories = [
  {
    id: "Teaching Liscense",
    name: "Teaching Liscense",
    imagess: "/teaching.jpg",
  },
  { id: "tsc", name: "TSC Quiz", imagess: "/tsc.png" },
  // { id: "apf-nepal", name: "APF Nepal Tayari" },
  // { id: "nid-nepal", name: "NID Nepal Tayari" },
  // { id: "rastra-bank", name: "Nepal Rastra Bank Tayari" },
  // { id: "banijya-bank", name: "Rastriya Banijya Bank Tayari" },
];

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-gray-200 p-6">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <img
            src="/policelogo.png"
            alt="Exam Banner"
            className="absolute inset-0 w-full h-full object-cover opacity-20"
          />
        </div>

        {/* Hero Section */}
        <div className="relative text-center text-gray-800 z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold drop-shadow-md">
            Lok Sewa Tayari Special!
          </h1>
          <p className="mt-4 text-lg text-gray-700">
            Boost your exam preparation with expert-curated materials.
          </p>
          <Link
            to="/about"
            className="mt-4 inline-block bg-gradient-to-r from-blue-400 to-lime-400 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
          >
            Learn More
          </Link>
        </div>
        <div className="relative mt-8 w-full max-w-md z-10">
          <input
            type="text"
            placeholder="Search categories..."
            className="w-full p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8 z-10">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category) => (
              <Link
                key={category.id}
                to={`/exam/${category.id}`}
                className="w-full"
              >
                <div className="bg-white backdrop-blur-md bg-opacity-80 shadow-lg rounded-lg p-6 flex flex-col items-center transition transform hover:scale-105 hover:shadow-xl cursor-pointer">
                  <img
                    src={category.imagess}
                    alt={category.name}
                    className="w-[250px] h-[130px] mb-4"
                  />
                  <h2 className="text-lg font-semibold text-gray-900">
                    {category.name}
                  </h2>
                </div>
              </Link>
            ))
          ) : (
            <p className="text-gray-600">No categories found.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
//home