import { useEffect, useState } from "react";

import DashboardLayout
  from "../layouts/DashboardLayout";

import {
  getAllExams,
  createExam,
  deleteExam,
  updateExam,
} from "../services/examService";

function ExamsPage() {

  const [exams, setExams] =
    useState<any[]>([]);

  const [title, setTitle] =
    useState("");

  const [duration, setDuration] =
    useState("");

  const [totalMarks, setTotalMarks] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const fetchExams = async () => {

    const data =
      await getAllExams();

    setExams(data);
  };

  useEffect(() => {

    fetchExams();

  }, []);

  const clearForm = () => {

    setTitle("");
    setDuration("");
    setTotalMarks("");
    setEditingId(null);

  };

  const handleSubmit =
    async () => {

      const examData = {

        title,

        duration:
          Number(duration),

        totalMarks:
          Number(totalMarks),
      };

      if (editingId) {

        await updateExam(
          editingId,
          examData
        );

        alert(
          "Exam Updated"
        );

      } else {

        await createExam(
          examData
        );

        alert(
          "Exam Created"
        );
      }

      clearForm();

      fetchExams();
    };

  const handleDelete =
    async (id: number) => {

      try {

        await deleteExam(id);

        alert(
          "Exam Deleted"
        );

        fetchExams();

      } catch {

        alert(
          "Delete Failed. Questions/Results linked."
        );
      }
    };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-5xl font-bold text-white">
            Exams Management
          </h1>

          <p className="text-slate-400 text-lg mt-3">
            Create and manage examination schedules.
          </p>

        </div>

        {/* FORM */}

        <div
          className="
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            border
            border-slate-700
            rounded-3xl
            p-8
            mb-8
          "
        >

          <div
            className="
              grid
              md:grid-cols-3
              gap-4
            "
          >

            <input
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) =>
                setTitle(
                  e.target.value
                )
              }
              className="
                bg-slate-800
                border
                border-slate-700
                p-4
                rounded-xl
                text-white
                focus:outline-none
                focus:border-cyan-400
                transition-all
              "
            />

            <input
              type="number"
              placeholder="Duration (Minutes)"
              value={duration}
              onChange={(e) =>
                setDuration(
                  e.target.value
                )
              }
              className="
                bg-slate-800
                border
                border-slate-700
                p-4
                focus:outline-none
                focus:border-cyan-400
                transition-all
                rounded-xl
                text-white
              "
            />

            <input
              type="number"
              placeholder="Total Marks"
              value={totalMarks}
              onChange={(e) =>
                setTotalMarks(
                  e.target.value
                )
              }
              className="
                bg-slate-800
                border
                border-slate-700
                p-4
                focus:outline-none
                focus:border-cyan-400
                transition-all
                rounded-xl
                text-white
              "
            />

          </div>

          <button

            onClick={handleSubmit}

            className="
              mt-5
              px-6
              py-3
              rounded-xl
              bg-cyan-500
              text-white
              font-semibold
              hover:bg-cyan-600
              shadow-lg
            "
          >

            {editingId
              ? "Update Exam"
              : "Create Exam"}

          </button>

        </div>

        {/* TABLE */}

        <div
          className="
            bg-gradient-to-br
            from-slate-900
            to-slate-800
            border
            border-slate-700
            rounded-3xl
            overflow-hidden
          "
        >

          <table className="w-full">

            <thead className="bg-slate-800">

              <tr>

                <th className="p-4 text-left">
                  Title
                </th>

                <th className="p-4 text-left">
                  Duration
                </th>

                <th className="p-4 text-left">
                  Total Marks
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {exams.map((exam) => (

                <tr
                  key={exam.id}
                  className="
                    border-t
                    border-slate-700
                  "
                >

                  <td className="p-4">
                    {exam.title}
                  </td>

                  <td className="p-4">
                    {exam.duration} mins
                  </td>

                  <td className="p-4">
                    {exam.totalMarks}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button

                      onClick={() => {

                        setEditingId(
                          exam.id
                        );

                        setTitle(
                          exam.title
                        );

                        setDuration(
                          exam.duration
                        );

                        setTotalMarks(
                          exam.totalMarks
                        );
                      }}

                      className="
                        px-4
                        py-2
                        rounded-lg
                        border
                        border-slate-700
                        hover:bg-slate-800
                      "
                    >

                      Edit

                    </button>

                    <button

                      onClick={() =>
                        handleDelete(
                          exam.id
                        )
                      }

                      className="
                        px-4
                        py-2
                        rounded-lg
                        bg-red-500
                        hover:bg-red-600
                        text-white
                      "
                    >

                      Delete

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  );
}

export default ExamsPage;