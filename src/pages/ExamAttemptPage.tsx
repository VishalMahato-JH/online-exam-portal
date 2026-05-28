import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import toast from "react-hot-toast"


type Question = {
  id: number;
  questionText: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
};

export default function ExamAttemptPage() {
  const { examId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  const [timeLeft, setTimeLeft] = useState(300);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) {
      submitExam();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/question/exam/${examId}`
      );

      console.log("API RESPONSE:", res.data);

      if (Array.isArray(res.data)) {
        setQuestions(res.data);
      } else if (res.data.data) {
        setQuestions(res.data.data);
      } else {
        setQuestions([]);
      }
    } catch (error) {
      console.log(error);
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const selectAnswer = (questionId: number, answer: string) => {
    setAnswers({
      ...answers,
      [questionId]: answer,
    });
  };

  const submitExam = async () => {
    try {
      let score = 0;

      questions.forEach((q) => {
        if (answers[q.id] === q.correctAnswer) {
          score++;
        }
      });

      await axios.post("http://localhost:8080/api/results/submit", {
        studentEmail: "student@gmail.com",
        examId: Number(examId),
        score,
        totalQuestions: questions.length,
        correctAnswers: score,
      });

      toast.success(
        "Exam Submitted Successfully!"
      )

      navigate("/results");
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to submit result"
      )
    }
  };

  const formatTime = () => {
    const mins = Math.floor(timeLeft / 60);
    const secs = timeLeft % 60;

    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  if (loading) {
    return (
      <DashboardLayout>
        <h1 className="text-white text-3xl">
          Loading Questions...
        </h1>
      </DashboardLayout>
    );
  }

  if (!loading && questions.length === 0) {
    return (
      <DashboardLayout>
        <h1 className="text-red-500 text-3xl">
          No Questions Found
        </h1>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-5xl mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-5xl font-bold text-cyan-400">
            Online Exam
          </h1>

          <div className="bg-red-500 px-6 py-3 rounded-xl text-white text-2xl font-bold">
            ⏳ {formatTime()}
          </div>
        </div>

        {questions.map((q, index) => (
          <div
            key={q.id}
            className="bg-slate-800 p-8 rounded-3xl mb-8 shadow-2xl"
          >
            <h2 className="text-3xl text-white font-bold mb-6">
              Question {index + 1}
            </h2>

            <p className="text-2xl text-slate-200 mb-8">
              {q.questionText}
            </p>

            <div className="grid gap-5">
              {[q.option1, q.option2, q.option3, q.option4].map(
                (option, idx) => (
                  <button
                    key={idx}
                    onClick={() => selectAnswer(q.id, option)}
                    className={`p-5 rounded-2xl text-left text-xl transition-all duration-300
                    ${
                      answers[q.id] === option
                        ? "bg-cyan-500 text-black font-bold"
                        : "bg-slate-900 text-white hover:bg-cyan-700"
                    }`}
                  >
                    {String.fromCharCode(65 + idx)}. {option}
                  </button>
                )
              )}
            </div>
          </div>
        ))}

        <button
          onClick={submitExam}
          className="bg-green-500 hover:bg-green-600 text-white px-10 py-4 rounded-2xl text-2xl font-bold"
        >
          Submit Exam
        </button>
      </div>
    </DashboardLayout>
  );
}