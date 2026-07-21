import { useEffect, useState } from "react";
import axios from "axios";

import DashboardLayout from "../layouts/DashboardLayout";

import {
  createQuestion,
  getQuestionsByExam,
  deleteQuestion,
  updateQuestion,
} from "../services/questionService";

import {
  getAllExams,
} from "../services/examService";

function QuestionsPage() {

  const [exams, setExams] = useState<any[]>([]);
  const [questions, setQuestions] = useState<any[]>([]);

  const [selectedExam, setSelectedExam] =
    useState("");

  const [question, setQuestion] =
    useState("");

  const [option1, setOption1] =
    useState("");

  const [option2, setOption2] =
    useState("");

  const [option3, setOption3] =
    useState("");

  const [option4, setOption4] =
    useState("");

  const [correctAnswer, setCorrectAnswer] =
    useState("");

  const [sectionName, setSectionName] =
    useState("");

  const [marks, setMarks] =
    useState("");

  const [editingId, setEditingId] =
    useState<number | null>(null);

  const [selectedFile, setSelectedFile] =
  useState<File | null>(null);

  const fetchExams = async () => {

    const data =
      await getAllExams();

    setExams(data);
  };

  const fetchQuestions =
    async (examId: number) => {

      const data =
        await getQuestionsByExam(
          examId
        );

      setQuestions(data);
    };

  useEffect(() => {

    fetchExams();

  }, []);

  const clearForm = () => {

    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setCorrectAnswer("");
    setSectionName("");
    setMarks("");
    setEditingId(null);

  };

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
          id: Number(selectedExam),
        },
      };

      if (editingId) {

        await updateQuestion(
          editingId,
          questionData
        );

        alert("Question Updated");

      } else {

        await createQuestion(
          questionData
        );

        alert("Question Created");
      }

      fetchQuestions(
        Number(selectedExam)
      );

      clearForm();
    };

  const uploadExcel = async () => {

    if (!selectedExam) {
      alert("Select Exam First");
      return;
    }

    if (!selectedFile) {
      alert("Select Excel File");
      return;
    }

    const formData = new FormData();

    formData.append(
      "file",
      selectedFile
    );

    try {

      await axios.post(
        `https://online-exam-backend-production-24cd.up.railway.app/api/questions/upload/${selectedExam}`,
        formData
      );

      alert(
        "Questions Uploaded Successfully"
      );

      fetchQuestions(
        Number(selectedExam)
      );

    } catch (error) {

      console.error(error);

      alert("Upload Failed");
    }
  };

  const handleDelete =
    async (id: number) => {

      await deleteQuestion(id);

      fetchQuestions(
        Number(selectedExam)
      );
    };

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}

        <div className="mb-8">

          <h1 className="text-3xl font-bold text-white">
            Questions Management
          </h1>

          <p className="text-slate-400 mt-2">
            Create and manage examination questions.
          </p>

        </div>

        {/* FORM */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            p-6
            mb-8
          "
        >

          <div className="grid md:grid-cols-2 gap-4">

            <select
              value={selectedExam}
              onChange={(e) => {

                setSelectedExam(
                  e.target.value
                );

                fetchQuestions(
                  Number(
                    e.target.value
                  )
                );
              }}
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
            >

              <option value="">
                Select Exam
              </option>

              {exams.map((exam) => (

                <option
                  key={exam.id}
                  value={exam.id}
                >
                  {exam.title}
                </option>

              ))}

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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
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
              className="
                bg-slate-950
                border
                border-slate-800
                p-3
                rounded-xl
                text-white
              "
            />

          </div>

          <button
            onClick={
              handleCreateQuestion
            }
            className="
              mt-5
              px-6
              py-3
              rounded-xl
              bg-white
              text-black
              font-semibold
              hover:bg-slate-200
            "
          >

            {editingId
              ? "Update Question"
              : "Create Question"}

          </button>

        </div>

        <div className="mt-5 flex gap-3 items-center">

          <input
            type="file"
            accept=".xlsx"
            onChange={(e) =>
              setSelectedFile(
                e.target.files?.[0] || null
              )
            }
            className="
              bg-slate-950
              border
              border-slate-800
              p-2
              rounded-xl
              text-white
            "
          />

          <button
            onClick={uploadExcel}
            className="
              px-6
              py-3
              rounded-xl
              bg-green-600
              text-white
              font-semibold
              hover:bg-green-700
            "
          >
            Upload Excel
          </button>

        </div>

        {/* TABLE */}

        <div
          className="
            bg-slate-900
            border
            border-slate-800
            rounded-2xl
            overflow-hidden
          "
        >

          <table className="w-full">

            <thead className="bg-slate-950">

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

              {questions.map((q) => (

                <tr
                  key={q.id}
                  className="
                    border-t
                    border-slate-800
                  "
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

                        setEditingId(
                          q.id
                        );

                        setQuestion(
                          q.questionText
                        );

                        setOption1(
                          q.option1
                        );

                        setOption2(
                          q.option2
                        );

                        setOption3(
                          q.option3
                        );

                        setOption4(
                          q.option4
                        );

                        setCorrectAnswer(
                          q.correctAnswer
                        );

                        setSectionName(
                          q.sectionName
                        );

                        setMarks(
                          q.marks
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
                          q.id
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

export default QuestionsPage;