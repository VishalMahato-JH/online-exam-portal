import { useEffect, useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { getAnalytics } from "../services/analyticsService";
import type { AnalyticsData } from "../types/analytics";
import PerformanceChart from "../components/PerformanceChart";
import { getRecentResults, getLeaderboard } from "../services/resultService";
import PerformanceBarChart from "../components/PerformanceBarChart";
import RecentResultTable from "../components/RecentResultTable";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";


export default function DashboardPage() {

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null);

  const [setTopPerformer] = useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [recentResults, setRecentResults] =
    useState([]);

  const [leaderboard, setLeaderboard] = useState([]);
  const exportToExcel = () => {

  const excelData = recentResults.map((item: any) => ({
    Student: item.studentEmail,
    Exam: item.exam?.title,
    Score: item.score,
    Percentage: item.percentage,
    Status: item.status,
    Date: new Date(item.submittedAt).toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Results");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(file, "Results_Report.xlsx");
};

  const averageScore =
    analytics?.totalResults && analytics.totalResults > 0
      ? Math.round(
          (analytics.passed / analytics.totalResults) * 100
        )
      : 0;

  useEffect(() => {

    fetchAnalytics();

    fetchRecentResults();

  }, []);

  const fetchAnalytics = async () => {

    try {

      const data =
        await getAnalytics();

      setAnalytics(data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);
    }
  };

  const fetchRecentResults = async () => {

    try {

      const data =
        await getRecentResults();

      setRecentResults(data);

      const rankData = await getLeaderboard();

      setLeaderboard(rankData);

      if (data.length > 0) {

        const top = [...data].sort(
          (a, b) => b.percentage - a.percentage
        )[0];

        setTopPerformer(top);

      }

    } catch (error) {

      console.log(error);

    }

  };

  if (loading) {

    return (
      <DashboardLayout>

        <div className="text-white text-xl">
          Loading Dashboard...
        </div>

      </DashboardLayout>
    );
  }

  return (

    <DashboardLayout>

      <div className="max-w-7xl mx-auto">

        <div className="mb-10">

          <h1 className="text-4xl font-bold text-white">
            Dashboard
          </h1>

          <p className="text-slate-400 mt-2">
            Monitor exams, students and assessment results.
          </p>

        </div>

        <button
            onClick={exportToExcel}
            className="mt-4 mb-6 px-5 py-3 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold"
        >
            📥 Export Results to Excel
        </button>

        <div
          className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-4
            xl:grid-cols-3
            gap-7
            mb-8
          "
        >

          <div
          className="
          bg-gradient-to-br
          from-slate-800
          to-slate-900
          border
          border-slate-700
          rounded-3xl
          p-5
          min-h-[170px]
          flex
          flex-col
          justify-between
          shadow-xl
          hover:shadow-cyan-500/20
          hover:-translate-y-1
          transition-all
          duration-300
          ">
            
            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">📄</div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
              Total Exams
            </p>

            <h2 className="mt-auto text-6xl font-bold text-white">
              {analytics?.totalExams}
            </h2>

          </div>

          <div className="
          bg-gradient-to-br
          from-slate-800
          to-slate-900
          border
          border-slate-700
          rounded-3xl
          p-5
          shadow-xl
          hover:shadow-cyan-500/20
          hover:-translate-y-1
          transition-all
          duration-300
          ">


            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">👨‍🎓</div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
              Students
            </p>

            <h2 className="mt-auto text-6xl font-bold text-white">
              {analytics?.totalStudents}
            </h2>

          </div>

          <div className="
          bg-gradient-to-br
          from-slate-800
          to-slate-900
          border
          border-slate-700
          rounded-3xl
          p-5
          min-h-[170px]
          flex
          flex-col
          justify-between
          shadow-xl
          hover:shadow-cyan-500/20
          hover:-translate-y-1
          transition-all
          duration-300
          ">

            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">❓</div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
              Questions
            </p>

            <h2 className="mt-auto text-6xl font-bold text-white">
              {analytics?.totalQuestions}
            </h2>

          </div>

          <div className="
          bg-gradient-to-br
          from-slate-800
          to-slate-900
          border
          border-slate-700
          rounded-3xl
          p-5
          min-h-[170px]
          flex
          flex-col
          justify-between
          shadow-xl
          hover:shadow-cyan-500/20
          hover:-translate-y-1
          transition-all
          duration-300
          ">

            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">📊</div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
              Results
            </p>

            <h2 className="mt-auto text-6xl font-bold text-white">
              {analytics?.totalResults}
            </h2>

          </div>
          <div className="
          bg-gradient-to-br
          from-slate-800
          to-slate-900
          border
          border-slate-700
          rounded-3xl
          p-5
          min-h-[170px]
          flex
          flex-col
          justify-between
          shadow-xl
          hover:shadow-cyan-500/20
          hover:-translate-y-1
          transition-all
          duration-300
          ">

            <div className="w-12 h-12 rounded-xl bg-slate-700 flex items-center justify-center text-2xl">⭐</div>
            <p className="text-slate-400 text-xs font-semibold uppercase tracking-wide">
              Average Score
            </p>

            <h2 className="text-5xl font-extrabold text-white">
              {averageScore}%
            </h2>

          </div>

        </div>
        <PerformanceChart
          passed={analytics?.passed || 0}
          failed={analytics?.failed || 0}
        />
        <div className="mt-10">
      

          <h2 className="text-3xl font-bold text-white mb-6">
            System Analytics
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            <div className="bg-slate-900 rounded-2xl p-6">
              <PerformanceBarChart
                title="Students vs Exams"
                labels={["Students", "Exams"]}
                values={[
                  analytics?.totalStudents || 0,
                  analytics?.totalExams || 0,
                ]}
              />
            </div>

            <div className="bg-slate-900 rounded-2xl p-6">
              <PerformanceBarChart
                title="Questions vs Results"
                labels={["Questions", "Results"]}
                values={[
                  analytics?.totalQuestions || 0,
                  analytics?.totalResults || 0,
                ]}
              />
            </div>

          </div>

        </div>

        <div className="mt-10 bg-slate-900 rounded-2xl p-6">

          <h2 className="text-3xl font-bold text-white mb-6">
            🏆 Leaderboard
          </h2>

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b border-slate-700">

                  <th className="py-3 text-slate-300">Rank</th>
                  <th className="py-3 text-slate-300">Student</th>
                  <th className="py-3 text-slate-300">Exam</th>
                  <th className="py-3 text-slate-300">Score</th>
                  <th className="py-3 text-slate-300">Percentage</th>
                  <th className="py-3 text-slate-300">Status</th>

                </tr>

              </thead>

              <tbody>

                {leaderboard.map((item: any, index: number) => (

                  <tr
                    key={item.id}
                    className="border-b border-slate-800 hover:bg-slate-800"
                  >

                    <td className="py-3 text-yellow-400 font-bold">
                      #{index + 1}
                    </td>

                    <td className="py-3 text-white">
                      {item.studentEmail}
                    </td>

                    <td className="py-3 text-cyan-400">
                      {item.exam?.title}
                    </td>

                    <td className="py-3 text-green-400 font-bold">
                      {item.score}
                    </td>

                    <td className="py-3 text-yellow-300">
                      {Number(item.percentage ?? 0).toFixed(2)}%
                    </td>

                    <td
                      className={`py-3 font-bold ${
                        item.status === "PASS"
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {item.status}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        </div>

        <div className="mt-8">

          <RecentResultTable
            results={recentResults}
          />

        </div>
        

      </div>

    </DashboardLayout>

  );
}