import React from "react";
import axios from "axios";
import { EventPage } from "@/components/pages/EventPage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const EventPageServer = async ({ params }: Props) => {
  const { id } = await params;
  try {
    const response = await axios.get(
      `https://vencera.tech/spichka/api/events/${id}`
    );
    return <EventPage data={response.data} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
};

export default EventPageServer;
