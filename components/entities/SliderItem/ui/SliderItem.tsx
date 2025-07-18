import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { EventCardType } from "@/components/shared/types/models";

export const SliderItem: React.FC<EventCardType> = ({
  id,
  title,
  preview,
  eventDate,
}) => {
  const formattedDate = new Date(eventDate).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
  });

  return (
    <div
      className={cn(
        "w-44 h-72 rounded-2xl bg-white relative shadow-md overflow-hidden"
      )}
    >
      <Link className="w-full h-full" href={`/event/${id}`}>
        <div className="w-full h-full relative">
          <Image src={preview} alt={title} fill className="object-cover" />
        </div>
        <div className="absolute top-1 left-1 bg-black/25 rounded-2xl backdrop-blur-sm px-3 py-2 flex items-end">
          <h3 className="text-sm font-semibold text-white">{formattedDate}</h3>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/80 via-black/50 to-transparent p-2 flex items-end">
          <h3 className="text-sm font-semibold text-white">{title}</h3>
        </div>
      </Link>
    </div>
  );
};
