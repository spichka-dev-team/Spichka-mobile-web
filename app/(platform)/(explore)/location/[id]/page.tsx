import React from "react";
import axios from "axios";
import { LocationPage } from "@/components/pages/LocationPage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

const LocationPageServer = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const { data } = await axios.get(
      `${apiUrl}/items/Community_Group_Location/${id}?fields=*,gallery.*`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    console.log(data);
    const initialData = data.data;
    return <LocationPage id={id} initialData={initialData} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
};
export default LocationPageServer;
