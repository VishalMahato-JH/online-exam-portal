import { useNavigate } from "react-router-dom";

export default function LandingPage() {

  const navigate = useNavigate();

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="max-w-5xl w-full">

        <div className="text-center mb-16">

          <h1 className="text-5xl font-bold text-white">
            Online Examination Platform
          </h1>

          <p className="text-slate-400 mt-4 text-lg">
            Secure • Scalable • Real-Time Assessment
          </p>

        </div>

        <div className="grid md:grid-cols-2 gap-8">

          {/* ADMIN */}

          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-10
            "
          >

            <h2 className="text-3xl font-bold text-white text-center">
              ADMIN
            </h2>

            <button
              onClick={() =>
                navigate("/admin-login")
              }
              className="
                mt-10
                w-full
                py-4
                rounded-xl
                bg-white
                text-black
                font-semibold
                hover:bg-slate-200
                transition
              "
            >
              Login →
            </button>

          </div>

          {/* STUDENT */}

          <div
            className="
              bg-slate-900
              border
              border-slate-800
              rounded-3xl
              p-10
            "
          >

            <h2 className="text-3xl font-bold text-white text-center">
              STUDENT
            </h2>

            <button
              onClick={() =>
                navigate("/student-login")
              }
              className="
                mt-10
                w-full
                py-4
                rounded-xl
                bg-white
                text-black
                font-semibold
                hover:bg-slate-200
                transition
              "
            >
              Login →
            </button>

          </div>

        </div>

      </div>

    </div>

  );
}