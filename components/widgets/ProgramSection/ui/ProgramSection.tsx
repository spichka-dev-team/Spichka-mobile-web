import { Clock } from "lucide-react";

export const ProgramSection = () => {
  const scheduleItems = [
    { time: "18:00", activity: "open mic" },
    { time: "18:30", activity: "лекция" },
    { time: "19:20", activity: "показ фильма" },
    { time: "20:30", activity: "обсуждение" },
  ];

  return (
    <div className="w-full bg-white/20 backdrop-blur-sm p-4 rounded-lg">
      <div className="flex justify-around items-center gap-8">
        {/* Left side - Clock and duration */}
        <div className="flex flex-col items-center text-white min-w-fit">
          <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <Clock className="w-14 h-14" />
          </div>
          <span className="text-xl font-unbounded font-medium whitespace-nowrap">
            3.5 часа
          </span>
        </div>

        {/* Right side - Schedule */}
        <div className="space-y-4">
          {scheduleItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center font-geologica text-white"
            >
              <div className="w-2 h-2 bg-white rounded-full mr-4 flex-shrink-0"></div>
              <span className="flex flex-wrap text-sm">
                <span className="">{item.time}</span>
                <span className="mx-2">-</span>
                <span>{item.activity}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
