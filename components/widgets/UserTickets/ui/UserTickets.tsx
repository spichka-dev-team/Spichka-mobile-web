"use server";

import React from "react";
import axios from "axios";

import { cn } from "@/lib/utils";
import { BoughtTicket } from "@/components/shared/ui";
import { Event, TicketHistoryItem } from "../types/types";

interface Props {
  className?: string;
  token: string | undefined;
}

const apiUrl = process.env.API_URL;

export const UserTickets: React.FC<Props> = async ({ className, token }) => {
  let tickets: Event[] = [];
  try {
    const ticketsResponse = await axios.get<{ data: TicketHistoryItem[] }>(
      `${apiUrl}/items/Tickets_History_List?fields=event.Event_id.id,event.Event_id.title,event.Event_id.start_date,event.Event_id.picture,event.Event_id.community_group_location.Community_Group_Location_id.address_title

`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    tickets = ticketsResponse.data.data.map(
      (item: TicketHistoryItem) => item.event[0].Event_id
    );
  } catch (error) {
    console.warn("Ошибка при получении tickets:", error);
  }
  console.log(tickets);

  return (
    <div className={cn(className, "w-full flex flex-col gap-4 items-center")}>
      {tickets.length > 0 ? (
        tickets.map((ticket, idx) => {
          return (
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
          );
        })
      ) : (
        <p>У вас пока нет билетов</p>
      )}
    </div>
  );
};
