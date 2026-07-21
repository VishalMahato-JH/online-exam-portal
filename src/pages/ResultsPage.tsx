import { useEffect, useState } from "react";
import axios from "axios";
import DashboardLayout from "../layouts/DashboardLayout";

type Result = {
  id: number;
  studentEmail: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  submittedAt: string;
};

export default function ResultsPage() {

  const [results, setResults] =
    useState<Result[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {

    try {

      const response =
        await axios.get(
          "https://online-exam-backend-production-24cd.up.railway.app/api/results/leaderboard"
        );

      setResults(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const filteredResults =
    results.filter((result) =>
      result.studentEmail
        .toLowerCase()
        .includes(search.toLowerCase())
    );

  const highestScore =
    results.length > 0
      ? Math.max(
          ...results.map((r) => r.score)
        )
      : 0;

  const averageScore =
    results.length > 0
      ? (
          results.reduce(
            (sum, r) => sum + r.score,
            0
          ) / results.length
        ).toFixed(1)
      : "0";

  const topPerformer =
    results.length > 0
      ? [...results].sort(
          (a, b) => b.score - a.score
        )[0]
      : null;

  return (

    <DashboardLayout>

      <div className="space-y-8">

        <div>

          <h1
            className="
              text-5xl
              font-black
              text-cyan-400
              mb-2
            "
          >
            Results Dashboard
          </h1>

          <p className="text-slate-400">
            Track student performance and rankings
          </p>

        </div>

        {/* STATS */}

        <div
          className="
            grid
            grid-cols-1
            md:grid-cols-2
            xl:grid-cols-4
            gap-6
          "
        >

          <div className="bg-slate-900 p-6 rounded-3xl border border-cyan-500/20">
            <p className="text-slate-400">
              Total Results
            </p>
            <h2 className="text-4xl font-black text-cyan-400 mt-2">
              {results.length}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-green-500/20">
            <p className="text-slate-400">
              Highest Score
            </p>
            <h2 className="text-4xl font-black text-green-400 mt-2">
              {highestScore}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-purple-500/20">
            <p className="text-slate-400">
              Average Score
            </p>
            <h2 className="text-4xl font-black text-purple-400 mt-2">
              {averageScore}
            </h2>
          </div>

          <div className="bg-slate-900 p-6 rounded-3xl border border-yellow-500/20">
            <p className="text-slate-400">
              Students
            </p>
            <h2 className="text-4xl font-black text-yellow-400 mt-2">
              {
                new Set(
                  results.map(
                    (r) => r.studentEmail
                  )
                ).size
              }
            </h2>
          </div>

        </div>

        {/* TOPPER */}

        {topPerformer && (

          <div
            className="
              bg-gradient-to-r
              from-yellow-500/10
              to-orange-500/10
              border
              border-yellow-500/20
              rounded-3xl
              p-6
            "
          >

            <h2 className="text-2xl font-bold text-yellow-400">
              🏆 Top Performer
            </h2>

            <p className="text-white mt-2 text-lg">
              {topPerformer.studentEmail}
            </p>

            <p className="text-slate-300">
              Score : {topPerformer.score}
            </p>

          </div>

        )}

        {/* SEARCH */}

        <input
          type="text"
          placeholder="Search student email..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          className="
            w-full
            md:w-96
            bg-slate-900
            border
            border-slate-700
            rounded-2xl
            px-5
            py-3
            text-white
            outline-none
          "
        />

        {/* TABLE */}

        {loading ? (

          <div className="text-white text-2xl">
            Loading Results...
          </div>

        ) : (

          <div
            className="
              overflow-x-auto
              rounded-3xl
              border
              border-slate-800
              bg-slate-900
            "
          >

            <table className="w-full text-white">

              <thead className="bg-slate-800">

                <tr>

                  <th className="p-5 text-left">
                    Rank
                  </th>

                  <th className="p-5 text-left">
                    Student
                  </th>

                  <th className="p-5 text-left">
                    Score
                  </th>

                  <th className="p-5 text-left">
                    Correct
                  </th>

                  <th className="p-5 text-left">
                    Total
                  </th>

                  <th className="p-5 text-left">
                    Submitted
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredResults.map(
                  (result, index) => (

                    <tr
                      key={result.id}
                      className="
                        border-t
                        border-slate-800
                        hover:bg-slate-800
                      "
                    >

                      <td className="p-5 font-bold text-yellow-400">
                        #{index + 1}
                      </td>

                      <td className="p-5">
                        {result.studentEmail}
                      </td>

                      <td className="p-5">

                        <span
                          className="
                            px-3
                            py-1
                            rounded-full
                            bg-green-500/20
                            text-green-400
                            font-bold
                          "
                        >
                          {result.score}
                        </span>

                      </td>

                      <td className="p-5">
                        {result.correctAnswers}
                      </td>

                      <td className="p-5">
                        {result.totalQuestions}
                      </td>

                      <td className="p-5">
                        {new Date(
                          result.submittedAt
                        ).toLocaleString()}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </DashboardLayout>

  );
}