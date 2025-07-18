"use client";

import { useRouter } from "next/navigation";
import { Plus, Share, ChevronLeft } from "lucide-react";

export const PlatformHeader = () => {
  const router = useRouter();

  const handleBackClick = () => {
    router.back();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        {/* Кнопка назад */}
        <button
          onClick={handleBackClick}
          className="p-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Правые кнопки */}
        <div className="flex gap-3">
          {/* Кнопка добавить */}
          <button className="p-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
            <Plus className="w-5 h-5" />
          </button>

          {/* Кнопка поделиться */}
          <button className="p-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
            <Share className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
