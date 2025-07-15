import React from "react";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  title: string;
}

export const ChipTag: React.FC<Props> = ({ className, title }) => {
  return (
    <div className={cn(className, " rounded-full flex items-center")}>
      <h5 className="font-geologica px-4 py-2 text-base">{title}</h5>
    </div>
  );
};
