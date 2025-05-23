import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [submenuOpen, setSubmenuOpen] = useState(false);
  const [teachingSubmenuOpen, setTeachingSubmenuOpen] = useState(false);
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("quizUserName");
    if (storedName) {
      setUserName(storedName);
    }
  }, []);
  return (
    <nav className="bg-gradient-to-r from-blue-400 to-lime-400 py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src="/1.png" alt="Logo" className="h-16 w-auto" />
        </Link>
        {userName && (
          <div className="text-white text-lg font-semibold bg-black/30 px-4 py-1 lg:xl:ml-40 sm:md:ml-9 rounded-full shadow">
            Hey, <span className="text-yellow-300">{userName}</span>
          </div>
        )}
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 items-center">
          {/* Test1 Dropdown */}
          <div className="relative">
            <button
              onClick={() => setSubmenuOpen(!submenuOpen)}
              className="text-white hover:text-white focus:outline-none flex items-center gap-1"
            >
              Test1 <ChevronDown size={16} />
            </button>
            {submenuOpen && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50">
                <Link
                  to="/test1/sub1"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setSubmenuOpen(false)}
                >
                  Submenu 1
                </Link>
                <Link
                  to="/test1/sub2"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setSubmenuOpen(false)}
                >
                  Submenu 2
                </Link>
                <Link
                  to="/test1/sub3"
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  onClick={() => setSubmenuOpen(false)}
                >
                  Submenu 3
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/quiz"
            className="text-white hover:text-white focus:outline-none"
          >
            Start Quiz
          </Link>

          {/* Teaching Quiz Dropdown */}
          <div className="relative">
            <button
              onClick={() => setTeachingSubmenuOpen(!teachingSubmenuOpen)}
              className="text-white hover:text-white focus:outline-none flex items-center gap-1"
            >
              Teaching Quiz <ChevronDown size={16} />
            </button>
            {teachingSubmenuOpen && (
              <div className="absolute left-0 mt-2 py-2 w-48 bg-white rounded-md shadow-lg z-50">
                {/* Dynamically generated links - adjust as needed */}
                {Array.from({ length: 12 }, (_, i) => (
                  <Link
                    key={i + 1}
                    to={`/teaching/part${i + 1}`}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                    onClick={() => setTeachingSubmenuOpen(false)}
                  >
                    Part {i + 1}
                  </Link>
                ))}
              </div>
            )}
          </div>
          <Link
            to="/profile"
            className="text-white hover:text-white focus:outline-none"
          >
            Profile
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="text-white md:hidden focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } md:hidden bg-gradient-to-r from-blue-400 to-lime-400 text-white py-4 px-6 space-y-4`}
      >
        <Link to="/quiz" className="block hover:text-gray-200">
          Start Quiz
        </Link>

        <button
          onClick={() => setTeachingSubmenuOpen(!teachingSubmenuOpen)}
          className="flex items-center justify-between w-full hover:text-gray-200 focus:outline-none"
        >
          Teaching Quiz <ChevronDown size={16} />
        </button>
        {teachingSubmenuOpen && (
          <div className="ml-4 space-y-2">
            {Array.from({ length: 12 }, (_, i) => (
              <Link
                key={i + 1}
                to={`/teaching/part${i + 1}`}
                className="block py-2 hover:text-gray-200"
                onClick={() => setTeachingSubmenuOpen(false)}
              >
                Part {i + 1}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
