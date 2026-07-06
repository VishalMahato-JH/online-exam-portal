type Props = {
  title: string;
  value: number | string;
  color: string;
  icon: string;
};

export default function AnalyticsCards({
  title,
  value,
  color,
  icon,
}: Props) {

  return (

    <div
      className={`
        rounded-3xl
        p-6
        shadow-lg
        border
        border-slate-700
        ${color}
        hover:scale-105
        transition-all
        duration-300
      `}
    >

      <div className="flex items-center justify-between">

        <div>

          <p className="text-slate-300 text-sm">
            {title}
          </p>

          <h2 className="text-4xl font-bold mt-3 text-white">
            {value}
          </h2>

        </div>

        <div className="text-5xl">
          {icon}
        </div>

      </div>

    </div>

  );
}