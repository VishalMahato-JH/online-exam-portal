import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

type Props = {
  title: string;
  labels: string[];
  values: number[];
};

export default function PerformanceBarChart({
  title,
  labels,
  values,
}: Props) {
  const data = labels.map((label, index) => ({
    name: label,
    value: values[index],
  }));

  return (
    <div>
      <h3 className="text-white text-xl font-bold mb-4">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="name" />

          <YAxis />

          <Tooltip />

          <Bar
            dataKey="value"
            fill="#06b6d4"
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}