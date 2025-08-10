import React from "react";
import axios from "axios";
import { LocationPage } from "@/components/pages/LocationPage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

const LocationPageServer = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const { data } = await axios.get(
      `${apiUrl}/items/Community_Group_Location/${id}`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    console.log(
      "Запрос на локацию: ",
      `${apiUrl}/items/Community_Group_Location/${id}`
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
