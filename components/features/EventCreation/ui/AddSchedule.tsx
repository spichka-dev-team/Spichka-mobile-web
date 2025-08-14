"use client";

import type React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/Input";
import type { ScheduleItem } from "@/components/shared/types/event";

interface AddScheduleProps {
  schedule: ScheduleItem[];
  onScheduleChange: (index: number, field: string, value: string) => void;
  onAddScheduleItem: () => void;
  onRemoveScheduleItem: (index: number) => void;
  onDurationChange: (duration: string) => void;
}

const calculateDuration = (schedule: ScheduleItem[]): string => {
  if (schedule.length < 2) return "";

  const validItems = schedule.filter((item) => item.time && item.title.trim());
  if (validItems.length < 2) return "";

  // Sort by time, handling midnight crossing
  const sortedItems = validItems.sort((a, b) => {
    const timeA = a.time.split(":").map(Number);
    const timeB = b.time.split(":").map(Number);

    const minutesA = timeA[0] * 60 + timeA[1];
    let minutesB = timeB[0] * 60 + timeB[1];

    // If start time is late (after 20:00) and end time is early (before 10:00), assume next day
    if (minutesA > 20 * 60 && minutesB < 10 * 60) {
      minutesB += 24 * 60; // Add 24 hours to end time
    }

    return minutesA - minutesB;
  });

  const startTime = sortedItems[0].time.split(":").map(Number);
  const endTime = sortedItems[sortedItems.length - 1].time
    .split(":")
    .map(Number);

  const startMinutes = startTime[0] * 60 + startTime[1];
  let endMinutes = endTime[0] * 60 + endTime[1];

  // Handle midnight crossing
  if (startMinutes > 20 * 60 && endMinutes < 10 * 60) {
    endMinutes += 24 * 60;
  }

  const durationMinutes = endMinutes - startMinutes;
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;

  if (hours === 0) {
    return "<1 часа";
  } else if (minutes === 0) {
    return `${hours} ${hours === 1 ? "час" : hours < 5 ? "часа" : "часов"}`;
  } else {
    return `~${hours + 1} ${
      hours + 1 === 1 ? "час" : hours + 1 < 5 ? "часа" : "часов"
    }`;
  }
};

export const AddSchedule: React.FC<AddScheduleProps> = ({
  schedule,
  onScheduleChange,
  onAddScheduleItem,
  onRemoveScheduleItem,
  onDurationChange,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const duration = calculateDuration(schedule);
    onDurationChange(duration);
  }, [schedule]);

  if (!isFormOpen) {
    return (
      <button
        onClick={() => setIsFormOpen(true)}
        className="w-full bg-white/20 rounded-xl h-24 flex items-center justify-center text-white font-medium font-geologica transition-all duration-200 hover:bg-white/30"
      >
        <div className="w-8 h-8 flex items-center justify-center text-white/20 font-thin text-[100px]">
          +
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h3 className="text-white font-medium font-geologica">
          Расписание события
        </h3>
        <button
          onClick={() => setIsFormOpen(false)}
          className="text-white/70 hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-4">
        {schedule.map((item, index) => (
          <div key={index} className="flex gap-3">
            <Input
              placeholder="Название активности"
              value={item.title}
              onChange={(e) => onScheduleChange(index, "title", e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-white/70 rounded-xl h-12 focus:border-white/40 focus:ring-white/20"
            />
            <Input
              type="time"
              placeholder="Время"
              value={item.time}
              onChange={(e) => onScheduleChange(index, "time", e.target.value)}
              className="bg-black/20 border-white/20 text-white placeholder:text-white/70 rounded-xl h-12 focus:border-white/40 focus:ring-white/20 min-w-[140px]"
            />
            {schedule.length > 1 && (
              <button
                type="button"
                onClick={() => onRemoveScheduleItem(index)}
                className="text-red-500 hover:text-red-600 text-lg font-bold"
              >
                ×
              </button>
            )}
          </div>
        ))}
        {schedule.length < 10 && (
          <Button
            onClick={onAddScheduleItem}
            className="w-full bg-white text-black font-medium font-geologica rounded-full h-12 shadow-md transition-all duration-200 hover:shadow-lg border-0"
          >
            Добавить пункт расписания
          </Button>
        )}
      </div>
    </div>
  );
};
