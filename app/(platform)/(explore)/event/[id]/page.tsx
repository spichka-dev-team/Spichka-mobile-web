import React from "react";
import { EventPage } from "@/components/pages/EventPage";

interface Props {
  params: Promise<{ id: string }>;
}

const EventPageServer = async ({ params }: Props) => {
  const { id } = await params;
  return <EventPage id={id} />;
};

export default EventPageServer;
