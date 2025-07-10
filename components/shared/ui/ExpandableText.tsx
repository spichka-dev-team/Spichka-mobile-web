// components/ExpandableText.tsx
"use client";

import { useState } from "react";

interface ExpandableTextProps {
  text: string | undefined;
  limit?: number; // сколько символов показывать изначально
}

export const ExpandableText: React.FC<ExpandableTextProps> = ({
  text,
  limit = 200,
}) => {
  const [expanded, setExpanded] = useState(false);

  if (!text) return;

  // если текст короче лимита, никакой кнопки не рисуем
  if (text.length <= limit) {
    return (
      <h4 className="z-20 font-geologica font-normal text-base text-center px-4">
        {text}
      </h4>
    );
  }

  const preview = text.slice(0, limit) + "…";

  return (
    <div className="z-20 font-geologica font-normal text-base text-center px-4">
      <h4>{expanded ? text : preview}</h4>
      <button
        onClick={() => setExpanded(!expanded)}
        className="mt-2 text-sm font-extralight text-white/70 underline"
      >
        {expanded ? "Скрыть" : "Читать полностью"}
      </button>
    </div>
  );
};
