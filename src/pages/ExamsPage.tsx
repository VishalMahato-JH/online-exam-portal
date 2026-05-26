import {
  useEffect,
  useState
} from "react"

import DashboardLayout
  from "../layouts/DashboardLayout"

import {
  getAllExams,
  createExam,
  deleteExam,
  updateExam
} from "../services/examService"

function ExamsPage() {

  const [exams, setExams] =
    useState<any[]>([])

  const [title, setTitle] =
    useState("")

  const [duration, setDuration] =
    useState("")

  const [totalMarks, setTotalMarks] =
    useState("")

  const [editingId, setEditingId] =
    useState<number | null>(null)

  const fetchExams = async () => {

    const data =
      await getAllExams()

    setExams(data)
  }

  useEffect(() => {

    fetchExams()

  }, [])

  const handleSubmit =
    async () => {

      const examData = {

        title,

        duration:
          Number(duration),

        totalMarks:
          Number(totalMarks)
      }

      if (editingId) {

        await updateExam(
          editingId,
          examData
        )

        alert("Exam Updated")

        setEditingId(null)

      } else {

        await createExam(
          examData
        )

        alert("Exam Created")
      }

      setTitle("")
      setDuration("")
      setTotalMarks("")

      fetchExams()
    }

  const handleDelete =
    async (id: number) => {

      try {

        await deleteExam(id)

        alert("Exam Deleted")

        fetchExams()

      } catch {

        alert(
          "Delete Failed. Questions/Results linked."
        )
      }
    }

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-6 text-white">
          Exams
        </h1>

        <div className="bg-slate-800 p-4 rounded-xl mb-6">

          <div className="grid grid-cols-3 gap-4">

            <input
              type="text"
              placeholder="Exam Title"
              value={title}
              onChange={(e) =>
                setTitle(e.target.value)
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="number"
              placeholder="Duration"
              value={duration}
              onChange={(e) =>
                setDuration(e.target.value)
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="number"
              placeholder="Total Marks"
              value={totalMarks}
              onChange={(e) =>
                setTotalMarks(e.target.value)
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

          </div>

          <button

            onClick={handleSubmit}

            className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-black font-semibold"
          >

            {
              editingId
                ? "Update Exam"
                : "Create Exam"
            }

          </button>

        </div>

        <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

          <thead className="bg-slate-900">

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

            {
              exams.map((exam) => (

                <tr
                  key={exam.id}
                  className="border-t border-slate-700"
                >

                  <td className="p-4">
                    {exam.title}
                  </td>

                  <td className="p-4">
                    {exam.duration}
                  </td>

                  <td className="p-4">
                    {exam.totalMarks}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button

                      onClick={() => {

                        setEditingId(
                          exam.id
                        )

                        setTitle(
                          exam.title
                        )

                        setDuration(
                          exam.duration
                        )

                        setTotalMarks(
                          exam.totalMarks
                        )
                      }}

                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-black"
                    >

                      Edit

                    </button>

                    <button

                      onClick={() =>
                        handleDelete(
                          exam.id
                        )
                      }

                      className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white"
                    >

                      Delete

                    </button>

                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </DashboardLayout>
  )
}

export default ExamsPage