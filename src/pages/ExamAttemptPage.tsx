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
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<{ [key: number]: string }>({});
  const [loading, setLoading] = useState(true);

  const [examDuration, setExamDuration] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);

  const [currentQuestion, setCurrentQuestion] =
    useState(0);

  const [reviewQuestions, setReviewQuestions] =
    useState<number[]>([]);

  useEffect(() => {
    fetchQuestions();
  }, []);

  useEffect(() => {

  if (
    loading ||
    questions.length === 0 ||
    timeLeft <= 0
  ) {
    return;
  }

  const timer = setInterval(() => {

    setTimeLeft((prev) => {

      if (prev <= 1) {

        clearInterval(timer);

        submitExam();

        return 0;
      }

      return prev - 1;
    });

  }, 1000);

  return () => clearInterval(timer);

}, [loading, questions]);

  const fetchQuestions = async () => {

  try {

    const email =
      localStorage.getItem("email");

    const attemptCheck =
      await axios.get(
        `https://online-exam-backend-production-89c9.up.railway.app/api/results/attempted/${email}/${id}`
      );

    if (attemptCheck.data === true) {

      toast.error(
        "You have already attempted this exam"
      );

      navigate("/my-results");

      return;
    }

    const res = await axios.get(
      `https://online-exam-backend-production-89c9.up.railway.app/api/questions/exam/${id}`
    );

    if (Array.isArray(res.data)) {

      setQuestions(res.data);

      if (res.data.length > 0) {

        const duration =
          res.data[0].exam.duration;

        setExamDuration(duration);

        setTimeLeft(duration * 60);
      }

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

  let correctOption = "";

  if (q.correctAnswer === "A")
    correctOption = q.option1;

  else if (q.correctAnswer === "B")
    correctOption = q.option2;

  else if (q.correctAnswer === "C")
    correctOption = q.option3;

  else if (q.correctAnswer === "D")
    correctOption = q.option4;

  if (answers[q.id] === correctOption) {
    score++;
  }
});

    const percentage =
      (score * 100) /
      questions.length;
    const status =
      percentage >= 40 ? "PASS" : "FAIL";

     await axios.post("https://online-exam-backend-production-89c9.up.railway.app/api/results/submit", {
      studentEmail:
        localStorage.getItem("email") ||
        "student@gmail.com",

      totalQuestions: questions.length,

      correctAnswers: score,

      score: score,

      percentage: percentage,

      status: status,

      submittedAt: new Date(),

      exam: {
        id: Number(id),
      },
    });

      toast.success(
        "Exam Submitted Successfully!"
      )

      navigate("/my-results");
    } catch (error) {
      console.log(error);
      toast.error(
        "Failed to submit result"
      )
    }
  };
  
  const currentQ =
  questions[currentQuestion];

  const candidateName =
    localStorage.getItem("name");

  const answeredCount =
    Object.keys(answers).length;

  const reviewCount =
    reviewQuestions.length;

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
      <div className="max-w-[1400px] mx-auto">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            Online Exam
          </h1>

          <div className="flex items-center gap-4">

            <div className="bg-red-600 shadow-lg shadow-red-900/40 px-6 py-3 rounded-lg text-white text-2xl font-bold">
              ⏳ {formatTime()}
            </div>

            <div className="text-white text-lg font-semibold">
              Duration: {examDuration} mins
            </div>

          </div>
        </div>

        {questions.length > 0 && (

        <div className="grid lg:grid-cols-[1fr_260px] gap-8 px-6">

          <div>

            <div className="bg-slate-800 px-10 py-8 rounded-2xl shadow-lg border border-slate-700 min-h-[650px] mx-6 mt-2">

              <div className="flex justify-between items-start mb-8">

                <div>

                  <div className="flex items-center gap-4 mb-6">

                    <div className="
                      h-10
                      w-10
                      rounded-full
                      bg-cyan-500
                      flex
                      items-center
                      justify-center
                      text-black
                      font-bold
                    ">
                      {candidateName?.charAt(0)}
                    </div>

                    <div>
                      <p className="text-white font-semibold">
                        {candidateName}
                      </p>

                      <p className="text-slate-400 text-sm">
                        {localStorage.getItem("email")}
                      </p>
                    </div>

                  </div>

                  <h2 className="text-2xl font-bold text-white mt-2">

                    Question {currentQuestion + 1}
                    / {questions.length}

                  </h2>

                </div>

                <div>

                  <p className="text-cyan-400 font-bold">
                    Section
                  </p>

                  <p>
                    {(currentQ as any)
                      ?.sectionName || "GENERAL"}
                  </p>

                </div>

              </div>

              <p className="text-lg font-semibold text-white mb-5">
                {currentQ.questionText}
              </p>

              <div className="space-y-4">

                {[
                  currentQ.option1,
                  currentQ.option2,
                  currentQ.option3,
                  currentQ.option4,
                ].map((option, idx) => (

                  <button
                    key={idx}
                    onClick={() =>
                      selectAnswer(
                        currentQ.id,
                        option
                      )
                    }
                    className={`

                      w-full
                      text-left
                      py-4 px-6
                      rounded-lg
                      border
                      border-slate-700
                      transition-all
                      duration-200

                      ${
                        answers[currentQ.id] === option

                          ? "bg-cyan-500 text-black font-bold"

                          : "bg-slate-900 hover:bg-slate-700 hover:border-cyan-400 hover:scale-[1.01]"
                      }

                    `}
                  >

                    {String.fromCharCode(
                      65 + idx
                    )}. {option}

                  </button>

                ))}

        </div>

      <div className="grid grid-cols-4 gap-5 px-2 mt-8">

        <button
          onClick={() =>
            setCurrentQuestion(
              Math.max(
                currentQuestion - 1,
                0
              )
            )
          }
          className="
          h-12
          rounded-lg
          bg-slate-700
          font-semibold
          "
        >
          Previous
        </button>

        <button
          onClick={() => {

            if (
              !reviewQuestions.includes(
                currentQ.id
              )
            ) {

              setReviewQuestions([
                ...reviewQuestions,
                currentQ.id,
              ]);
            }

          }}
          className="
          h-12
          rounded-lg
          bg-yellow-500
          text-black
          font-semibold
          "
        >
          Mark Review
        </button>

        <button
          onClick={() =>
            setCurrentQuestion(
              Math.min(
                currentQuestion + 1,
                questions.length - 1
              )
            )
          }
         className="
        h-12
        rounded-lg
        bg-cyan-500
        text-black
        font-semibold
        "
        >
          Save & Next
        </button>

        <button
          onClick={() => {

            const ok = window.confirm(
              `Answered : ${answeredCount}

        Review : ${reviewCount}

        Submit Exam ?`
            );

            if (ok) {
              submitExam();
            }

          }}
          className=" 
          w-full h-12
          rounded-lg
          bg-green-500
          hover:bg-green-600
          text-white
          font-bold
          text-lg
          shadow-lg
          "
        >
          Submit Exam
        </button>

      </div>

      <div className="mt-6">

        

      </div>

    </div>

  </div>

  <div className="ml-3 mr-3">

    <div className="bg-slate-800 ml-6 px-6 py-6 rounded-2xl border border-slate-700 sticky top-4">

      <h3 className="font-bold mb-4">
        Question Palette
      </h3>

      <div className="mt-6 text-xs space-y-2">

        <p>
          🟩 Answered
        </p>

        <p>
          🟨 Review
        </p>

        <p>
          🟦 Current
        </p>

        <p>
          ⬜ Not Visited
        </p>

      </div>

      <div className="flex gap-2 mt-4">

        {questions.map(
          (q, index) => (

            <button
              key={q.id}
              onClick={() =>
                setCurrentQuestion(
                  index
                )
              }
              className={`
                h-12
                w-12
                rounded-lg
                font-bold

                ${
                  index === currentQuestion

                    ? "bg-blue-500"

                    : answers[q.id]

                    ? "bg-green-500"

                    : reviewQuestions.includes(
                        q.id
                      )

                    ? "bg-yellow-500"

                    : "bg-slate-700"
                }
              `}
            >

              {index + 1}

            </button>

          )
        )}

      </div>

      <div className="mt-5 space-y-2">

        <p>
          Answered :
          {answeredCount}
        </p>

        <p>
          Review :
          {reviewCount}
        </p>

        <p>
          Not Answered :
          {
            questions.length -
            answeredCount
          }
        </p>

      </div>

    </div>

  </div>

</div>

)}

        
      </div>
    </DashboardLayout>
  );
}