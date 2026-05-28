import type { ReactNode } from "react"

import { useNavigate } from "react-router-dom"

type Props = {
  children: ReactNode
}

function DashboardLayout({
  children
}: Props) {

  const navigate = useNavigate()

  const role =
    localStorage.getItem("role")

  const handleLogout = () => {

    localStorage.removeItem("token")

    localStorage.removeItem("role")

    localStorage.removeItem("email")

    navigate("/")
  }

  return (

    <div className="flex min-h-screen bg-[#020617] text-white">

      {/* SIDEBAR */}

      <aside className="w-72 bg-[#111827] border-r border-gray-800 p-6">

        <h1
          className="text-4xl font-black text-cyan-400 mb-12 cursor-pointer"
          onClick={() => {

            if (role === "ADMIN") {

              navigate("/dashboard")

            } else {

              navigate("/student")
            }
          }}
        >
          Exam Portal
        </h1>

        <nav className="space-y-4">

          {/* ADMIN MENU */}

          {
            role === "ADMIN" && (

              <>

                <div
                  onClick={() =>
                    navigate("/dashboard")
                  }
                  className="
                    px-5 py-4 rounded-2xl cursor-pointer
                    hover:bg-cyan-500/20
                    hover:text-cyan-400
                    transition
                  "
                >
                  Dashboard
                </div>

                <div
                  onClick={() =>
                    navigate("/exams")
                  }
                  className="
                    px-5 py-4 rounded-2xl cursor-pointer
                    hover:bg-cyan-500/20
                    hover:text-cyan-400
                    transition
                  "
                >
                  Exams
                </div>

                <div
                  onClick={() =>
                    navigate("/questions")
                  }
                  className="
                    px-5 py-4 rounded-2xl cursor-pointer
                    hover:bg-cyan-500/20
                    hover:text-cyan-400
                    transition
                  "
                >
                  Questions
                </div>

                <div
                  onClick={() =>
                    navigate("/results")
                  }
                  className="
                    px-5 py-4 rounded-2xl cursor-pointer
                    hover:bg-cyan-500/20
                    hover:text-cyan-400
                    transition
                  "
                >
                  Results
                </div>

              </>
            )
          }

          {/* STUDENT MENU */}

          {
            role === "STUDENT" && (

              <>

                <div
                  onClick={() =>
                    navigate("/student")
                  }
                  className="
                    px-5 py-4 rounded-2xl cursor-pointer
                    hover:bg-cyan-500/20
                    hover:text-cyan-400
                    transition
                  "
                >
                  Available Exams
                </div>

                <div
                  onClick={() =>
                    navigate("/results")
                  }
                  className="
                    px-5 py-4 rounded-2xl cursor-pointer
                    hover:bg-cyan-500/20
                    hover:text-cyan-400
                    transition
                  "
                >
                  My Results
                </div>

              </>
            )
          }

        </nav>

      </aside>

      {/* MAIN */}

      <main className="flex-1 p-8 overflow-auto">

        {/* TOPBAR */}

        <div className="flex items-center justify-between mb-10">

          <div>

            <h2 className="text-2xl font-bold">
              Welcome
            </h2>

            <p className="text-gray-400">
              {
                localStorage.getItem("email")
              }
            </p>

          </div>

          <button
            onClick={handleLogout}
            className="
              bg-red-500
              hover:bg-red-600
              transition
              px-6 py-3
              rounded-2xl
              font-bold
            "
          >
            Logout
          </button>

        </div>

        {/* CONTENT */}

        {children}

      </main>

    </div>
  )
}

export default DashboardLayout