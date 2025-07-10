import React from "react";
import axios from "axios";
import { EventPage } from "@/components/pages/EventPage";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const EventPageServer = async ({ params }: Props) => {
  const { id } = await params;
  const response = await axios.get(
    `http://176.123.178.135:2516/api/events/${id}`
  );

  if (!response) return notFound();

  return <EventPage data={response.data} />;
};

export default EventPageServer;
