type Result = {
  id: number;
  studentEmail: string;
  score: number;
  status: string;
  submittedAt: string;
  exam: {
    title: string;
  };
};

type Props = {
  results: Result[];
};

export default function RecentResultTable({
  results,
}: Props) {

  return (

    <div className="bg-slate-900 rounded-3xl border border-slate-800 p-6 shadow-lg">

      <h2 className="text-2xl font-bold text-white mb-6">
        Recent Results
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-slate-700">

              <th className="text-left py-3 text-slate-400">
                Student
              </th>

              <th className="text-left py-3 text-slate-400">
                Exam
              </th>

              <th className="text-left py-3 text-slate-400">
                Score
              </th>

              <th className="text-left py-3 text-slate-400">
                Status
              </th>
              <th className="text-left py-3 text-slate-400">
                Date
              </th>

            </tr>

          </thead>

          <tbody>

            {results.map((result, index) => (

              <tr
                key={index}
                className="border-b border-slate-800"
              >

                <td className="py-4 text-white">
                  {result.studentEmail}
                </td>

                <td className="py-4 text-white">
                  {result.exam?.title}
                </td>

                <td className="py-4 text-cyan-400 font-bold">
                  {result.score}
                </td>

                <td
                  className={`py-4 font-bold ${
                    result.status === "PASS"
                      ? "text-green-400"
                      : "text-red-400"
                  }`}
                >
                  {result.status}
                </td>
                <td className="py-4 text-white">
                  {new Date(result.submittedAt).toLocaleDateString()}
                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}