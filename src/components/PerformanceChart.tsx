import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts"

const data = [
  {
    name: "Java",
    students: 120,
  },
  {
    name: "Python",
    students: 98,
  },
  {
    name: "React",
    students: 150,
  },
  {
    name: "DSA",
    students: 80,
  },
]

function PerformanceChart() {

  return (

    <div className="bg-[#1e293b] p-6 rounded-2xl border border-gray-800 mt-8">

      <h2 className="text-2xl font-bold mb-6">
        Exam Performance
      </h2>

      <div className="h-[350px]">

        <ResponsiveContainer width="100%" height="100%">

          <BarChart data={data}>

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
              dataKey="students"
              radius={[10, 10, 0, 0]}
            />

          </BarChart>

        </ResponsiveContainer>

      </div>

    </div>
  )
}

export default PerformanceChart