/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { useMemo, useState } from "react";

import { Button } from "@/components/shared/ui/button";
import { useSession } from "next-auth/react";
import { PaymentTicket } from "@/components/entities";
import { PaymentTicketType } from "@/components/shared/types/models";
import { Loader2 } from "lucide-react";

import { apiUrl } from "@/lib/apiUrl";

interface Props {
  className?: string;
  eventId: string;
  tickets: PaymentTicketType[];
  title: string;
}

type SelectedMap = Record<string, number>;

export const PaymentSection: React.FC<Props> = ({
  className,
  eventId,
  tickets,
  title,
}) => {
  // Храним выбранные билеты по ключу Tickets_Type_id.id
  const [selected, setSelected] = useState<SelectedMap>({}); // { [Tickets_Type_id.id]: qty }
  const [pending, setPending] = useState(false);
  const { data: session } = useSession();
  // Подстройте под вашу форму сессии (session?.accessToken или session?.user?.accessToken)
  const accessToken =
    (session as any)?.accessToken ??
    (session as any)?.user?.accessToken ??
    null;

  // Подсчёт итогов
  const totals = useMemo(() => {
    let count = 0;
    let amount = 0;
    for (const t of tickets) {
      const id = t.Tickets_Type_id.id;
      const qty = selected[id] ?? 0;
      count += qty;
      amount += qty * t.Tickets_Type_id.price;
    }
    return { count, amount };
  }, [tickets, selected]);

  // Обработчики изменения количества
  const changeQty = (ticketTypeId: string, delta: number) => {
    setSelected((prev) => {
      const next = { ...prev };
      const current = next[ticketTypeId] ?? 0;
      const revised = Math.max(0, current + delta);
      if (revised === 0) delete next[ticketTypeId];
      else next[ticketTypeId] = revised;
      return next;
    });
  };

  // Отправляем по одному POST на каждую единицу билета с Tickets_Type_id.id и event -> event_id
  // Отправляем по одному POST на каждую единицу билета
  const handlePay = async () => {
    if (!totals.count) {
      console.log(
        "Ничего не выбрано: Добавьте хотя бы один билет перед оплатой."
      );
      return;
    }
    if (!accessToken) {
      console.error(
        "Нет токена: Не найден accessToken в сессии. Пожалуйста, авторизуйтесь."
      );
      return;
    }

    setPending(true);
    const endpoint = `${apiUrl}/items/Tickets_History_List`;

    // Преобразуем { id: qty } в массив id-ов по одной записи на каждый билет
    const units: string[] = [];
    for (const [ticketTypeId, qty] of Object.entries(selected)) {
      for (let i = 0; i < qty; i++) units.push(ticketTypeId);
    }

    let success = 0;
    let failed = 0;
    const errors: string[] = [];

    for (const ticketTypeId of units) {
      try {
        // Поля должны быть с точным названием, как в Insomnia
        const body = {
          tickets_type: [{ Tickets_Type_id: ticketTypeId }],
          event: [{ Event_id: eventId }], // исправлено на Event_id
        };

        const res = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(body),
        });

        if (!res.ok) {
          failed++;
          const text = await res.text().catch(() => "");
          errors.push(
            `HTTP ${res.status} ${res.statusText} ${text ? `- ${text}` : ""}`
          );
        } else {
          success++;
        }
      } catch (e: any) {
        failed++;
        errors.push(e?.message ?? "Network error");
      }
    }

    setPending(false);

    if (failed === 0) {
      console.log(`Успешная оплата: Создано ${success} записей.`);
      setSelected({});
    } else if (success === 0) {
      console.error(
        `Оплата не удалась: Все ${failed} запросов завершились ошибкой.`
      );
      console.error("Payment errors:", errors);
    } else {
      console.warn(`Частичный успех: Успешно: ${success}, ошибок: ${failed}.`);
      console.warn("Partial payment errors:", errors);
    }
  };

  return (
    <div className={cn(" p-4 space-y-6", className)}>
      <div className="grid gap-4">
        {tickets.map((ticketData: PaymentTicketType, idx: number) => {
          const id = ticketData.Tickets_Type_id.id;
          const qty = selected[id] ?? 0;
          return (
            <PaymentTicket
              key={id + "-" + idx}
              data={ticketData}
              title={title}
              quantity={qty}
              onIncrement={() => changeQty(id, +1)}
              onDecrement={() => changeQty(id, -1)}
            />
          );
        })}
      </div>

      <div className="space-y-4">
        <div className="flex w-full justify-between">
          <p className="font-geologica font-medium text-[18px]">
            всего ({totals.count})
          </p>
          <p className="font-geologica font-medium text-[18px]">
            {totals.amount.toLocaleString("ru-RU")} ₸
          </p>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <Button
            onClick={handlePay}
            disabled={pending || totals.count === 0}
            className="w-full rounded-full py-6 bg-white text-black"
          >
            {pending ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                {"Обработка..."}
              </span>
            ) : (
              "Оплатить"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
