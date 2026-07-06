import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type Props = {
  totalStudents: number;
  totalExams: number;
  totalQuestions: number;
  totalResults: number;
};

export default function LineAnalyticsChart({
  totalStudents,
  totalExams,
  totalQuestions,
  totalResults,
}: Props) {

  const data = [
    {
      month: "Students",
      value: totalStudents,
    },
    {
      month: "Exams",
      value: totalExams,
    },
    {
      month: "Questions",
      value: totalQuestions,
    },
    {
      month: "Results",
      value: totalResults,
    },
  ];

  return (

    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Growth Trend
      </h2>

      <ResponsiveContainer width="100%" height={320}>

        <LineChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="month" />

          <YAxis />

          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#22c55e"
            strokeWidth={4}
          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}