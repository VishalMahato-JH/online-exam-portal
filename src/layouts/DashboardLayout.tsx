import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function DashboardLayout({
  children,
}: Props) {

  const location = useLocation();

  const role =
    localStorage.getItem("role");

  const name =
    localStorage.getItem("name");

  const email =
    localStorage.getItem("email");

  const adminMenu = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Exams", path: "/exams" },
    { name: "Questions", path: "/questions" },
    { name: "Results", path: "/results" },
  ];

  const studentMenu = [
    { name: "My Exams", path: "/students" },
    { name: "My Results", path: "/my-results" },
  ];

  const menu =
    role === "ADMIN"
      ? adminMenu
      : studentMenu;

  return (
    <div className="min-h-screen bg-slate-950 text-white flex">

      <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col">

        <div className="p-6 border-b border-slate-800">

          <h1 className="text-3xl font-extrabold tracking-wide text-cyan-400">
            🎓 Exam Admin
          </h1>

          <p className="text-slate-400 text-sm">
            {role === "ADMIN"
              ? "Administration"
              : "Student Portal"}
          </p>

          <div className="mt-6 rounded-2xl bg-slate-800/70 border border-slate-700 px-5 py-5 shadow-lg">

            <p className="font-semibold text-white">
              {name}
            </p>

            <p className="text-xs text-slate-400">
              {email}
            </p>

          </div>

        </div>

        <nav className="flex-1 px-5 py-4 space-y-5">

          {menu.map((item) => (

            <Link
              key={item.path}
              to={item.path}
              className={`
                block
                px-4
                py-3
                rounded-xl
                transition
                ${
                  location.pathname === item.path
                    ? "bg-cyan-500 text-white font-bold shadow-lg shadow-cyan-500/20"
                    : "text-slate-300 hover:bg-slate-800 hover:text-cyan-300  "
                }
              `}
            >
              {item.name}
            </Link>

          ))}

        </nav>

        <div className="p-4 border-t border-slate-800">

          <button
            onClick={() => {

              localStorage.clear();
              window.location.href = "/";

            }}
            className="
              w-full
              py-3
              rounded-xl
              bg-gradient-to-r
              from-red-500
              to-red-600
              hover:scale-105
              transition-all
              duration-300
              font-medium
            "
          >
            Logout
          </button>

        </div>

      </aside>

      <main className="flex-1 overflow-y-auto bg-slate-950 px-12 py-10">
        {children}
      </main>

    </div>
  );
}