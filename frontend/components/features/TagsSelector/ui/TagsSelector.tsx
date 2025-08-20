/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import { ChipTag } from "@/components/entities/ChipTag";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";

const mockTags = [
  "Музыка",
  "Театр",
  "Спорт",
  "Выставка",
  "Кино",
  "Образование",
  "IT",
  "Бизнес",
];

export const TagsSelector = ({ eventData, setEventData }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMenu = () => setIsOpen((prev) => !prev);

  const handleTagClick = (tag: string) => {
    setEventData((prev: any) => {
      const exists = prev.tags.includes(tag);
      return {
        ...prev,
        tags: exists
          ? prev.tags.filter((t: string) => t !== tag)
          : [...prev.tags, tag],
      };
    });
  };

  const filteredTags = mockTags.filter((tag) =>
    tag.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full relative">
      <div className="flex flex-wrap justify-center gap-2 w-full">
        {eventData.tags.length === 0 ? (
          <div onClick={toggleMenu} className="cursor-pointer">
            <ChipTag className="bg-white/20" title="выберите теги" />
          </div>
        ) : (
          <>
            {eventData.tags.map((tag: string) => (
              <ChipTag key={tag} className="bg-white/20" title={tag} />
            ))}
            <div onClick={toggleMenu} className="cursor-pointer">
              <ChipTag
                className="bg-white/20 flex items-center gap-2"
                title={"еще..."}
              />
            </div>
          </>
        )}
      </div>

      {isOpen && (
        <div className="absolute mt-2 w-full max-h-60 bg-white rounded-xl shadow-lg p-3 overflow-y-auto z-50">
          {/* Поле поиска */}
          <div className="flex items-center gap-2 border-b border-gray-300 pb-2 mb-2">
            <Search className="text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Поиск тегов..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white text-black outline-none text-sm"
            />
          </div>

          {/* Список тегов */}
          <div className="flex flex-wrap gap-2 text-black">
            {filteredTags.length > 0 ? (
              filteredTags.map((tag) => {
                const selected = eventData.tags.includes(tag);
                return (
                  <div key={tag} onClick={() => handleTagClick(tag)}>
                    <ChipTag
                      className={cn(
                        "cursor-pointer transition-colors",
                        selected ? "bg-pink-400 text-white" : "bg-white/20"
                      )}
                      title={tag}
                    />
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-gray-500">Ничего не найдено</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
