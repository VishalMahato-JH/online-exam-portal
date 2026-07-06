import {
  ResponsiveContainer,
  BarChart,
  Bar,
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

export default function BarAnalyticsChart({
  totalStudents,
  totalExams,
  totalQuestions,
  totalResults,
}: Props) {

  const data = [
    {
      name: "Students",
      value: totalStudents,
    },
    {
      name: "Exams",
      value: totalExams,
    },
    {
      name: "Questions",
      value: totalQuestions,
    },
    {
      name: "Results",
      value: totalResults,
    },
  ];

  return (

    <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        System Analytics
      </h2>

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <BarChart data={data}>

          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            radius={[10,10,0,0]}
            fill="#3b82f6"
          />

        </BarChart>

      </ResponsiveContainer>

    </div>

  );
}