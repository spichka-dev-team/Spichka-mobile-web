"use client";

import type React from "react";
import { useState } from "react";
import { ChevronRight } from "lucide-react";

interface DateTimePickerProps {
  date: string;
  time: string;
  formattedDate: string;
  onDateTimeChange: (dateStr: string, timeStr: string) => void;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  date,
  time,
  formattedDate,
  onDateTimeChange,
}) => {
  const [showPicker, setShowPicker] = useState(false);

  const handleDateTimeChange = (dateStr: string, timeStr: string) => {
    onDateTimeChange(dateStr, timeStr);
    setShowPicker(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!showPicker && (
        <button
          onClick={() => setShowPicker(true)}
          className="flex items-center max-w-max bg-white rounded-full px-4 py-2 text-[16px] font-geologica font-medium text-black"
        >
          <span>{formattedDate || "выберите дату и время"}</span>
          <ChevronRight size={20} className="ml-2" />
        </button>
      )}

      {showPicker && (
        <div className="w-full flex flex-col items-center justify-center gap-2">
          <div className="space-x-2">
            <input
              type="date"
              value={date}
              onChange={(e) =>
                handleDateTimeChange(e.target.value, time || "00:00")
              }
              className="border rounded p-2"
            />
            <input
              type="time"
              value={time}
              onChange={(e) => handleDateTimeChange(date, e.target.value)}
              className="border rounded p-2"
            />
          </div>

          <button
            onClick={() => setShowPicker(false)}
            className="px-4 py-2 bg-white rounded-full text-black text-sm font-medium"
          >
            Отменить
          </button>
        </div>
      )}
    </div>
  );
};
