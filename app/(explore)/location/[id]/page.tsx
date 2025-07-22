import React from "react";
import axios from "axios";
import { LocationPage } from "@/components/pages/LocationPage";
import { notFound } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const apiUrl = process.env.API_URL;

const LocationPageServer = async ({ params }: Props) => {
  const { id } = await params;

  try {
    const { data: initialData } = await axios.get(`${apiUrl}/locations/${id}`);
    return <LocationPage id={id} initialData={initialData} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
};
export default LocationPageServer;
