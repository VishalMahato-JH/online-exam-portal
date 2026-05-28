import { Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ExamsPage from "./pages/ExamsPage";
import QuestionsPage from "./pages/QuestionsPage";
import StudentPage from "./pages/StudentPage";
import ResultsPage from "./pages/ResultsPage";
import ExamAttemptPage from "./pages/ExamAttemptPage";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/exams" element={<ExamsPage />} />
      <Route path="/questions" element={<QuestionsPage />} />
      <Route path="/students" element={<StudentPage />} />
      <Route path="/results" element={<ResultsPage />} />
      <Route path="/exam/:id" element={<ExamAttemptPage />} />
    </Routes>
  );
}

export default App;