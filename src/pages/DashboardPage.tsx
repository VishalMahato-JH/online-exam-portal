import { useEffect, useState } from "react"
import DashboardLayout from "../layouts/DashboardLayout"
import PerformanceChart from "../components/PerformanceChart"
import { getAnalytics } from "../services/analyticsService"
import type { AnalyticsData } from "../types/analytics"

function DashboardPage() {

  const [analytics, setAnalytics] =
    useState<AnalyticsData | null>(null)

  useEffect(() => {

    fetchAnalytics()

  }, [])

  const fetchAnalytics = async () => {

    try {

      const data = await getAnalytics()

      setAnalytics(data)

    } catch (error) {

      console.log(error)

    }
  }

  return (

    <DashboardLayout>

      {/* Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">

        {/* Card 1 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-800">

          <p className="text-gray-400 mb-2">
            Total Students
          </p>

          <h2 className="text-4xl font-bold text-cyan-400">
            {analytics?.totalStudents ?? 0}
          </h2>

        </div>

        {/* Card 2 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-800">

          <p className="text-gray-400 mb-2">
            Total Exams
          </p>

          <h2 className="text-4xl font-bold text-green-400">
            {analytics?.totalExams ?? 0}
          </h2>

        </div>

        {/* Card 3 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-800">

          <p className="text-gray-400 mb-2">
            Total Results
          </p>

          <h2 className="text-4xl font-bold text-pink-400">
            {analytics?.totalResults ?? 0}
          </h2>

        </div>
        {/* Card 4 */}
<div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-800">

  <p className="text-gray-400 mb-2">
    Total Questions
  </p>

  <h2 className="text-4xl font-bold text-orange-400">
    {analytics?.totalQuestions ?? 0}
  </h2>

</div>

        {/* Card 4 */}
        <div className="bg-[#1e293b] p-6 rounded-2xl shadow-lg border border-gray-800">

          <p className="text-gray-400 mb-2">
            Average Score
          </p>

          <h2 className="text-4xl font-bold text-yellow-400">
            {analytics?.averageScore ?? 0}%
          </h2>

        </div>

      </div>

      <PerformanceChart />

    </DashboardLayout>
  )
}

export default DashboardPage