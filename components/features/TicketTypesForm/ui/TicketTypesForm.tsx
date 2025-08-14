"use client";

import type React from "react";
import { Button } from "@/components/shared/ui/button";
import { Input } from "@/components/shared/ui/Input";
import type { TicketType } from "@/components/shared/types/event";

interface TicketTypesFormProps {
  ticketTypes: TicketType[];
  onTicketTypeChange: (index: number, field: string, value: string) => void;
  onAddTicketType: () => void;
  onRemoveTicketType: (index: number) => void;
}

export const TicketTypesForm: React.FC<TicketTypesFormProps> = ({
  ticketTypes,
  onTicketTypeChange,
  onAddTicketType,
  onRemoveTicketType,
}) => {
  return (
    <div className="p-6 space-y-4">
      {ticketTypes.map((ticket, index) => (
        <div key={index} className="flex gap-3">
          <Input
            placeholder="Название билета"
            value={ticket.name}
            onChange={(e) => onTicketTypeChange(index, "name", e.target.value)}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/70 rounded-xl h-12 focus:border-white/40 focus:ring-white/20"
          />
          <Input
            type="number"
            placeholder="Цена"
            value={ticket.price}
            onChange={(e) => onTicketTypeChange(index, "price", e.target.value)}
            className="bg-black/20 border-white/20 text-white placeholder:text-white/70 rounded-xl h-12 focus:border-white/40 focus:ring-white/20 min-w-[120px]"
          />
          {ticketTypes.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveTicketType(index)}
              className="text-red-500 hover:text-red-600 text-lg font-bold"
            >
              ×
            </button>
          )}
        </div>
      ))}
      {ticketTypes.length < 5 && (
        <Button
          onClick={onAddTicketType}
          className="w-full bg-white text-black font-medium font-geologica rounded-full h-12 shadow-md transition-all duration-200 hover:shadow-lg border-0"
        >
          Добавить тип билета
        </Button>
      )}
    </div>
  );
};
