import axios from "axios";
import React from "react";
import { notFound } from "next/navigation";
import { OrganiserPage } from "@/components/pages/OrganiserPage";
import { CreatorResponse } from "@/components/shared/types/models";

interface Props {
  params: Promise<{ id: string }>;
}

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

const OrganiserPageServer = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const { data }: CreatorResponse = await axios.get(
      `${apiUrl}/users/${id}?fields=*,gallery.*`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );

    return <OrganiserPage data={data} id={id} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
};

export default OrganiserPageServer;
