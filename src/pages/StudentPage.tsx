import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

type Exam = {
  id: number;
  title: string;
  duration: number;
  totalMarks: number;
};

function StudentPage() {

  const [exams, setExams] = useState<Exam[]>([]);


  useEffect(() => {

    fetchExams();

  }, []);

  const fetchExams = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/exams"
      );

      setExams(response.data);

    } catch (error) {

      console.log(error);

    }
  };

 const handleStartExam = (examId: number) => {

  window.open(
    `/exam/${examId}`,
    "_blank"
  );

};

  return (

    <DashboardLayout>

      <div className="min-h-screen text-white">

        {/* HEADER */}

        <div className="mb-14">

          <h1
            className="
              text-6xl
              font-extrabold
              tracking-tight
              mb-4
              bg-gradient-to-r
              from-cyan-400
              to-blue-500
              bg-clip-text
              text-transparent
            "
          >
            Available Exams
          </h1>

          <p className="text-gray-400 text-lg">
            Start your online assessment and test your skills.
          </p>

        </div>

        {/* EXAMS */}

        {exams.length === 0 ? (

          <div
            className="
              bg-[#111827]
              border
              border-red-500/30
              rounded-3xl
              p-10
              text-center
              text-red-400
              text-2xl
              font-semibold
              shadow-lg
            "
          >
            No Exams Available
          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              xl:grid-cols-3
              gap-10
            "
          >

            {exams.map((exam) => (

              <div
                key={exam.id}
                className="
                  relative
                  overflow-hidden
                  bg-gradient-to-br
                  from-[#1e293b]
                  to-[#0f172a]
                  border
                  border-cyan-500/20
                  rounded-3xl
                  p-8
                  shadow-2xl
                  hover:scale-105
                  hover:border-cyan-400
                  transition-all
                  duration-300
                  group
                "
              >

                <h2
                  className="
                    text-4xl
                    font-bold
                    mb-8
                    text-cyan-400
                  "
                >
                  {exam.title}
                </h2>

                <div className="space-y-5 mb-10">

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-[#0f172a]/60
                      px-5
                      py-4
                      rounded-2xl
                      border
                      border-gray-700
                    "
                  >

                    <span className="text-gray-400 text-lg">
                      Duration
                    </span>

                    <span className="font-bold text-xl">
                      {exam.duration} mins
                    </span>

                  </div>

                  <div
                    className="
                      flex
                      items-center
                      justify-between
                      bg-[#0f172a]/60
                      px-5
                      py-4
                      rounded-2xl
                      border
                      border-gray-700
                    "
                  >

                    <span className="text-gray-400 text-lg">
                      Total Marks
                    </span>

                    <span className="font-bold text-xl text-cyan-400">
                      {exam.totalMarks}
                    </span>

                  </div>

                </div>

                <button
                  onClick={() => handleStartExam(exam.id)}
                  className="
                    w-full
                    py-4
                    rounded-2xl
                    text-xl
                    font-bold
                    bg-gradient-to-r
                    from-cyan-500
                    to-blue-600
                    hover:from-cyan-400
                    hover:to-blue-500
                    shadow-lg
                    shadow-cyan-500/20
                    transition-all
                    duration-300
                  "
                >
                  Start Exam
                </button>

              </div>

            ))}

          </div>

        )}

      </div>

    </DashboardLayout>

  );
}

export default StudentPage;