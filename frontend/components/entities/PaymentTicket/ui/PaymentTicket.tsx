"use client";

import React from "react";
import { Plus, Minus } from "lucide-react";
import { PaymentTicketType } from "@/components/shared/types/models";
import styles from "./styles.module.scss";

interface Props {
  data: PaymentTicketType;
  title: string;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}

export const PaymentTicket: React.FC<Props> = ({
  data,
  title,
  quantity,
  onIncrement,
  onDecrement,
}) => {
  console.log("то что в билете: ", data);

  return (
    <div className={styles.payment_ticket}>
      <div className="space-y-1">
        <h3 className="font-unbounded font-semibold text-base">{title}</h3>
        <p className="font-geologica font-medium text-base text-[#989494]">
          {data.Tickets_Type_id.name}
        </p>
        <p className="font-geologica font-medium text-base">
          {data.Tickets_Type_id.price} ₸
        </p>
      </div>

      <div className="flex items-center gap-4 justify-between">
        <button
          onClick={onIncrement}
          className="p-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>
        <p>{quantity}</p>
        <button
          onClick={onDecrement}
          className="p-4 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors"
        >
          <Minus className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
