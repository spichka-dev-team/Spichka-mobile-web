"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { apiUrl } from "@/lib/apiUrl";
import { BoughtTicket } from "@/components/shared/ui";
import { Event, TicketHistoryItem } from "../types/types";

interface Props {
  className?: string;
  token: string | undefined;
}

export const UserTickets: React.FC<Props> = ({ className, token }) => {
  const [tickets, setTickets] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;

    const fetchTickets = async () => {
      try {
        const { data } = await axios.get<{ data: TicketHistoryItem[] }>(
          `${apiUrl}/items/Tickets_History_List?fields=event.Event_id.id,event.Event_id.title,event.Event_id.start_date,event.Event_id.picture,event.Event_id.community_group_location.Community_Group_Location_id.address_title`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const mapped = data.data.map(
          (item: TicketHistoryItem) => item.event[0].Event_id
        );

        setTickets(mapped);
      } catch (error) {
        console.warn("Ошибка при получении tickets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, [token]);

  if (loading) {
    return <p>Загрузка билетов...</p>;
  }

  return (
    <div className={cn(className, "w-full flex flex-col gap-4 items-center")}>
      {tickets.length > 0 ? (
        tickets.map((ticket, idx) => (
          <BoughtTicket
            key={ticket.id + idx}
            title={ticket.title || "Без названия"}
            date={ticket.start_date}
            address={
              ticket.community_group_location[0].Community_Group_Location_id
                .address_title
            }
            posterUrl={ticket.picture || ""}
            posterAlt={`Постер: ${ticket.title}`}
          />
        ))
      ) : (
        <p>У вас пока нет билетов</p>
      )}
    </div>
  );
};
