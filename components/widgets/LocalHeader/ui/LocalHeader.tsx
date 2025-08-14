"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export const LocalHeader = ({ title }: { title: string }) => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
        {/* Кнопка назад */}
        <button
          onClick={handleBackClick}
          className="  text-white hover:bg-black/90 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <h2 className="font-unbounded font-medium text-xl text-center">
          {title.toLowerCase()}
        </h2>

        <div className="w-6 h-6"></div>
      </div>
    </header>
  );
};
