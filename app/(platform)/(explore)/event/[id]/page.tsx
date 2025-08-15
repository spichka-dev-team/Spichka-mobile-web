import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import { EventPage } from "@/components/pages/EventPage";

interface Props {
  params: Promise<{ id: string }>;
}

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

const EventPageServer = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const [{ data: data }] = await Promise.all([
      (
        await axios.get(
          `${apiUrl}/items/Event/${id}?fields=*,community_group_location.*,community_group.*,organizers.*`,
          {
            headers: {
              Authorization: `Bearer ${adminToken}`,
            },
          }
        )
      ).data,
    ]);
    return <EventPage id={id} data={data} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
};

export default EventPageServer;
