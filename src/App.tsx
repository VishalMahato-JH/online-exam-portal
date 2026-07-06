import { Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";

import DashboardPage from "./pages/DashboardPage";
import ExamsPage from "./pages/ExamsPage";
import QuestionsPage from "./pages/QuestionsPage";
import StudentPage from "./pages/StudentPage";
import ResultsPage from "./pages/ResultsPage";
import MyResultsPage from "./pages/MyResultsPage";
import ExamAttemptPage from "./pages/ExamAttemptPage";

import ProtectedRoute from "./routes/ProtectedRoute";

import "./App.css";

function App() {
  return (
    <Routes>

      <Route
        path="/"
        element={<LandingPage />}
      />

      <Route
        path="/admin-login"
        element={<LoginPage />}
      />

      <Route
        path="/student-login"
        element={<LoginPage />}
      />

      {/* ADMIN */}

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <DashboardPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/exams"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ExamsPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/questions"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <QuestionsPage />
          </ProtectedRoute>
        }
      />

      {/* STUDENT */}

      <Route
        path="/students"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <StudentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/results"
        element={
          <ProtectedRoute allowedRole="ADMIN">
            <ResultsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-results"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <MyResultsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/exam/:id"
        element={
          <ProtectedRoute allowedRole="STUDENT">
            <ExamAttemptPage />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;