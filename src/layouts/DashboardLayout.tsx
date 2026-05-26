import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};

function DashboardLayout({ children }: Props) {

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">

      {/* SIDEBAR */}
      <aside className="w-64 bg-[#111827] border-r border-gray-800 p-6">

        <h1
          className="text-3xl font-bold text-cyan-400 mb-12 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          Exam Admin
        </h1>

        <nav className="space-y-3">

          {/* DASHBOARD */}
          <div
            onClick={() => navigate("/dashboard")}
            className="px-4 py-3 rounded-xl cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition"
          >
            Dashboard
          </div>

          {/* EXAMS */}
          <div
            onClick={() => navigate("/exams")}
            className="px-4 py-3 rounded-xl cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition"
          >
            Exams
          </div>

          {/* QUESTIONS */}
          <div
            onClick={() => navigate("/questions")}
            className="px-4 py-3 rounded-xl cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition"
          >
            Questions
          </div>

          {/* STUDENTS */}
          <div
            onClick={() => navigate("/student")}
            className="px-4 py-3 rounded-xl cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition"
          >
            Students
          </div>

          {/* RESULTS */}
          <div
            onClick={() => navigate("/results")}
            className="px-4 py-3 rounded-xl cursor-pointer hover:bg-cyan-500/20 hover:text-cyan-400 transition"
          >
            Results
          </div>

        </nav>

      </aside>

      {/* MAIN CONTENT */}
      <main className="flex-1 p-8 overflow-auto">

        {/* TOPBAR */}
        <div className="flex items-center justify-end mb-8">

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 transition px-5 py-3 rounded-xl font-semibold"
          >
            Logout
          </button>

        </div>

        {/* PAGE CONTENT */}
        {children}

      </main>

    </div>
  );
}

export default DashboardLayout;