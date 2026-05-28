import { useEffect, useState } from "react"
import axios from "axios"
import DashboardLayout from "../layouts/DashboardLayout"

type Result = {
  id: number
  studentEmail: string
  score: number
  totalQuestions: number
  correctAnswers: number
  submittedAt: string
}

function ResultsPage() {

  const [results, setResults] =
    useState<Result[]>([])

  const role =
    localStorage.getItem("role")

  const email =
    localStorage.getItem("email")

  useEffect(() => {

    fetchResults()

  }, [])

  const fetchResults = async () => {

    try {

      let response

      // ADMIN → ALL RESULTS

      if (role === "ADMIN") {

        response = await axios.get(
          "http://localhost:8080/api/results/leaderboard"
        )

      } else {

        // STUDENT → ONLY OWN RESULT

        response = await axios.get(
          `http://localhost:8080/api/results/my-results/${email}`
        )
      }

      setResults(response.data)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <DashboardLayout>

      <div>

        <h1 className="text-5xl font-black text-cyan-400 mb-10">

          {
            role === "ADMIN"
              ? "All Results"
              : "My Results"
          }

        </h1>

        <div className="overflow-x-auto rounded-3xl border border-cyan-500/20">

          <table className="w-full">

            <thead className="bg-[#111827]">

              <tr>

                <th className="text-left p-5">
                  Student
                </th>

                <th className="text-left p-5">
                  Score
                </th>

                <th className="text-left p-5">
                  Correct
                </th>

                <th className="text-left p-5">
                  Total
                </th>

                <th className="text-left p-5">
                  Submitted
                </th>

              </tr>

            </thead>

            <tbody>

              {
                results.map((result) => (

                  <tr
                    key={result.id}
                    className="
                      border-t border-gray-800
                      hover:bg-cyan-500/5
                      transition
                    "
                  >

                    <td className="p-5">
                      {result.studentEmail}
                    </td>

                    <td className="p-5 text-cyan-400 font-bold">
                      {result.score}
                    </td>

                    <td className="p-5">
                      {result.correctAnswers}
                    </td>

                    <td className="p-5">
                      {result.totalQuestions}
                    </td>

                    <td className="p-5">
                      {
                        new Date(
                          result.submittedAt
                        ).toLocaleString()
                      }
                    </td>

                  </tr>
                ))
              }

            </tbody>

          </table>

        </div>

      </div>

    </DashboardLayout>
  )
}

export default ResultsPage