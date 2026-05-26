import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

type Result = {
  id: number;
  studentEmail: string;
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  submittedAt: string;
};

function ResultsPage() {

  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/api/results/leaderboard"
      );

      setResults(response.data);

    } catch (error) {

      console.log(error);
    }
  };

  return (

    <DashboardLayout>

      <div className="text-white">

        <h1 className="text-5xl font-black mb-10 text-cyan-400">
          Results
        </h1>

        <div className="bg-[#1e293b] rounded-3xl overflow-hidden border border-cyan-500/20">

          <table className="w-full">

            <thead className="bg-[#0f172a]">

              <tr>

                <th className="text-left p-6 text-xl">
                  Student
                </th>

                <th className="text-left p-6 text-xl">
                  Score
                </th>

                <th className="text-left p-6 text-xl">
                  Correct
                </th>

                <th className="text-left p-6 text-xl">
                  Total
                </th>

                <th className="text-left p-6 text-xl">
                  Submitted
                </th>

              </tr>

            </thead>

            <tbody>

              {results.map((result) => (

                <tr
                  key={result.id}
                  className="border-t border-gray-700"
                >

                  <td className="p-6">
                    {result.studentEmail}
                  </td>

                  <td className="p-6 text-cyan-400 font-bold">
                    {result.score}
                  </td>

                  <td className="p-6">
                    {result.correctAnswers}
                  </td>

                  <td className="p-6">
                    {result.totalQuestions}
                  </td>

                  <td className="p-6">
                    {result.submittedAt}
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

export default ResultsPage;