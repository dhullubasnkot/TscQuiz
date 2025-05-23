import GkQuiz from "../Components/quiz/page";
import NewQuiz from "../Components/quiz/QuizByID";
import Home from "../Components/Home";
import Result from "../Components/Result";
import { Routes, Route } from "react-router-dom";
import ExamDetails from "../Components/ExamDetails";
import Teaching from "../Components/quiz/Teaching";
import QuizPage from "../Components/ExamDetails";
import Profile from "../Components/profile";

const Linking = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/quiz/" element={<GkQuiz />} />
      <Route path="/quiz/:category" element={<NewQuiz />} />
      <Route path="/exam/:type" element={<QuizPage />} />
      <Route path="/result" element={<Result />} />
      <Route path="/teaching/:part" element={<Teaching />} />
      <Route path="/profile" element={<Profile />} />

      {/* <Route path="/quiz/:type" element={<QuizPage />} /> */}
      <Route path="/tsc/:part" element={<Teaching />} />
      <Route
        path="/Components/quiz/Teaching.jsx"
        element={<Teaching negativeMarking={true} />}
      ></Route>
    </Routes>
  );
};

export default Linking;
