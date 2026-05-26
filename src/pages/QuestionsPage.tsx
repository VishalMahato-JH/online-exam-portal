import {
  useEffect,
  useState
} from "react"

import DashboardLayout
  from "../layouts/DashboardLayout"

import {
  createQuestion,
  getQuestionsByExam,
  deleteQuestion,
  updateQuestion
} from "../services/questionService"

import {
  getAllExams
} from "../services/examService"

function QuestionsPage() {

  const [exams, setExams] =
    useState<any[]>([])

  const [questions, setQuestions] =
    useState<any[]>([])

  const [selectedExam,
    setSelectedExam] =
    useState("")

  const [question,
    setQuestion] =
    useState("")

  const [option1,
    setOption1] =
    useState("")

  const [option2,
    setOption2] =
    useState("")

  const [option3,
    setOption3] =
    useState("")

  const [option4,
    setOption4] =
    useState("")

  const [correctAnswer,
    setCorrectAnswer] =
    useState("")

  const [sectionName,
    setSectionName] =
    useState("")

  const [marks,
    setMarks] =
    useState("")

  const [editingId,
    setEditingId] =
    useState<number | null>(null)

  const fetchExams = async () => {

    const data =
      await getAllExams()

    setExams(data)
  }

  const fetchQuestions =
    async (examId: number) => {

      const data =
        await getQuestionsByExam(
          examId
        )

      setQuestions(data)
    }

  useEffect(() => {

    fetchExams()

  }, [])

  const handleCreateQuestion =
    async () => {

      const questionData = {

  questionText: question,

  option1,
  option2,
  option3,
  option4,

  correctAnswer,

  sectionName,

  marks: Number(marks),

  exam: {
    id: Number(selectedExam)
  }
}

      if (editingId) {

        await updateQuestion(
          editingId,
          questionData
        )

        alert("Question Updated")

        setEditingId(null)

      } else {

       await createQuestion(
  questionData
)

        alert("Question Created")
      }

      fetchQuestions(
        Number(selectedExam)
      )

      setQuestion("")
      setOption1("")
      setOption2("")
      setOption3("")
      setOption4("")
      setCorrectAnswer("")
      setSectionName("")
      setMarks("")
    }

  const handleDelete =
    async (id: number) => {

      await deleteQuestion(id)

      fetchQuestions(
        Number(selectedExam)
      )
    }

  return (

    <DashboardLayout>

      <div className="p-6">

        <h1 className="text-4xl font-bold mb-6">
          Questions Management
        </h1>

        <div className="bg-slate-800 p-4 rounded-xl mb-6">

          <div className="grid grid-cols-2 gap-4">

            <select

              value={selectedExam}

              onChange={(e) => {

                setSelectedExam(
                  e.target.value
                )

                fetchQuestions(
                  Number(
                    e.target.value
                  )
                )
              }}

              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            >

              <option value="">
                Select Exam
              </option>

              {
                exams.map((exam) => (

                  <option
                    key={exam.id}
                    value={exam.id}
                  >

                    {exam.title}

                  </option>
                ))
              }

            </select>

            <input
              type="text"
              placeholder="Question"
              value={question}
              onChange={(e) =>
                setQuestion(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Option 1"
              value={option1}
              onChange={(e) =>
                setOption1(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Option 2"
              value={option2}
              onChange={(e) =>
                setOption2(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Option 3"
              value={option3}
              onChange={(e) =>
                setOption3(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Option 4"
              value={option4}
              onChange={(e) =>
                setOption4(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Correct Answer"
              value={correctAnswer}
              onChange={(e) =>
                setCorrectAnswer(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="text"
              placeholder="Section"
              value={sectionName}
              onChange={(e) =>
                setSectionName(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

            <input
              type="number"
              placeholder="Marks"
              value={marks}
              onChange={(e) =>
                setMarks(
                  e.target.value
                )
              }
              className="bg-slate-900 border border-slate-700 p-3 rounded-lg text-white"
            />

          </div>

          <button

            onClick={
              handleCreateQuestion
            }

            className="mt-4 bg-cyan-500 hover:bg-cyan-600 px-6 py-3 rounded-lg text-black font-semibold"
          >

            {
              editingId
                ? "Update Question"
                : "Create Question"
            }

          </button>

        </div>

        <table className="w-full bg-slate-800 rounded-xl overflow-hidden">

          <thead className="bg-slate-900">

            <tr>

              <th className="p-4 text-left">
                Question
              </th>

              <th className="p-4 text-left">
                Correct Answer
              </th>

              <th className="p-4 text-left">
                Marks
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {
              questions.map((q) => (

                <tr
                  key={q.id}
                  className="border-t border-slate-700"
                >

                  <td className="p-4">
                    {q.questionText}
                  </td>

                  <td className="p-4">
                    {q.correctAnswer}
                  </td>

                  <td className="p-4">
                    {q.marks}
                  </td>

                  <td className="p-4 flex gap-2">

                    <button

                      onClick={() => {

                        setEditingId(q.id)

                        setQuestion(
                          q.questionText
                        )

                        setOption1(
                          q.option1
                        )

                        setOption2(
                          q.option2
                        )

                        setOption3(
                          q.option3
                        )

                        setOption4(
                          q.option4
                        )

                        setCorrectAnswer(
                          q.correctAnswer
                        )

                        setSectionName(
                          q.sectionName
                        )

                        setMarks(
                          q.marks
                        )
                      }}

                      className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-lg text-black"
                    >

                      Edit

                    </button>

                    <button

                      onClick={() =>
                        handleDelete(q.id)
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

export default QuestionsPage