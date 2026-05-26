import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import ExamsPage from "./pages/ExamsPage";
import QuestionsPage from "./pages/QuestionsPage";
import StudentPage from "./pages/StudentPage";
import ExamAttemptPage from "./pages/ExamAttemptPage";
import ResultsPage from "./pages/ResultsPage";


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LoginPage />}
        />

        <Route
          path="/dashboard"
          element={<DashboardPage />}
        />

        <Route
          path="/exams"
          element={<ExamsPage />}
        />

        <Route
          path="/questions"
          element={<QuestionsPage />}
        />

        <Route
          path="/student"
          element={<StudentPage />}
        />

        <Route
          path="/exam/:id"
          element={<ExamAttemptPage />}
        />
        
        <Route path="/results" element={<ResultsPage />} />


      </Routes>

    </BrowserRouter>

  );
}

export default App;