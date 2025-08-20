import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface Props {
  className?: string;
}

export const Ticket: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex py-2 px-4 gap-2 bg-[#333333] text-white rounded-2xl",
        className
      )}
    >
      <Image src="/images/ticket.svg" width={20} height={16} alt="ticket" />
      <p className="font-jost font-bold text-base">0</p>
    </div>
  );
};
