import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";
import jsPDF from "jspdf";

type Result = {
  id: number;
  studentEmail: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  submittedAt: string;
};

export default function MyResultsPage() {

  const [results, setResults] =
    useState<Result[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {

    try {

      const email =
        localStorage.getItem("email");

      const response =
        await axios.get(
          `https://online-exam-backend-rs3l.onrender.com/api/results/my-results/${email}`
        );

      setResults(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const downloadCertificate = (result: Result) => {

    const percentage =
      (result.correctAnswers / result.totalQuestions) * 100;

    const doc = new jsPDF("landscape");

    doc.setFontSize(28);
    doc.text("CERTIFICATE OF ACHIEVEMENT", 105, 30, { align: "center" });

    doc.setFontSize(18);
    doc.text(
      "This is to certify that",
      105,
      55,
      { align: "center" }
    );

    doc.setFontSize(24);
    doc.text(
      localStorage.getItem("name") || "Student",
      105,
      75,
      { align: "center" }
    );

    doc.setFontSize(16);
    doc.text(
      "has successfully passed the online assessment",
      105,
      95,
      { align: "center" }
    );

    doc.text(
      `Score: ${result.score}`,
      105,
      115,
      { align: "center" }
    );

    doc.text(
      `Percentage: ${percentage.toFixed(2)}%`,
      105,
      130,
      { align: "center" }
    );

    doc.text(
      `Date: ${new Date().toLocaleDateString()}`,
      105,
      150,
      { align: "center" }
    );

    doc.text("Online Examination System", 230, 180);

    doc.save(`Certificate_${result.id}.pdf`);
  };

  return (

    <DashboardLayout>

      <div>

        <h1 className="text-5xl font-black text-green-400 mb-10">
          My Results
        </h1>

        {loading ? (

          <div className="text-white text-2xl">
            Loading...
          </div>

        ) : results.length === 0 ? (

          <div className="bg-slate-800 p-8 rounded-3xl text-center text-red-400 text-2xl">
            No Results Found
          </div>

        ) : (

          <div className="grid md:grid-cols-2 gap-8">

            {results.map((result) => {

              const percentage =
                (result.correctAnswers / result.totalQuestions) * 100;

              return (

                <div
                  key={result.id}
                  className="
                    bg-slate-900
                    border
                    border-green-500/20
                    rounded-3xl
                    p-8
                  "
                >

                  <h2 className="text-2xl font-bold text-green-400 mb-5">
                    Attempt #{result.id}
                  </h2>

                  <div className="space-y-3">

                    <p>
                      Score :
                      <span className="font-bold text-green-400 ml-2">
                        {result.score}
                      </span>
                    </p>

                    <p>
                      Percentage :
                      <span className="font-bold text-cyan-400 ml-2">
                        {percentage.toFixed(2)}%
                      </span>
                    </p>

                    <p>
                      Status :
                      <span
                        className={
                          percentage >= 40
                            ? "font-bold text-green-400 ml-2"
                            : "font-bold text-red-400 ml-2"
                        }
                      >
                        {percentage >= 40 ? "PASS" : "FAIL"}
                      </span>
                    </p>

                    {percentage >= 40 && (
                      <button
                        onClick={() => downloadCertificate(result)}
                        className="mt-3 px-4 py-2 bg-green-500 text-white rounded-xl font-bold"
                      >
                        Download Certificate
                      </button>
                    )}

                    <p>
                      Correct :
                      <span className="font-bold ml-2">
                        {result.correctAnswers}
                      </span>
                    </p>

                    <p>
                      Total :
                      <span className="font-bold ml-2">
                        {result.totalQuestions}
                      </span>
                    </p>

                    <p>
                      Submitted :
                      <span className="ml-2">
                        {new Date(result.submittedAt).toLocaleString()}
                      </span>
                    </p>

                  </div>

                </div>

              );

            })}

          </div>

        )}

      </div>

    </DashboardLayout>

  );
}