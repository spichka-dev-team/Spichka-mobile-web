import axios from "axios";
import { notFound } from "next/navigation";
import React from "react";
import { GalleryPage } from "@/components/pages/GalleryPage";

interface Props {
  params: Promise<{ id: string }>;
}

const apiUrl = process.env.API_URL;
const adminToken = process.env.NEXT_DIRECTUS_ANONYMOUS_USER_TOKEN;

export default async function GalleryPageServer({ params }: Props) {
  const { id } = await params;

  try {
    const { data } = await axios.get(
      `${apiUrl}/items/Community_Group_Location/${id}?fields=gallery.id,gallery.Community_Group_Location_id,gallery.directus_files_id`,
      {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      }
    );
    console.log(data);
    const initialData = data.data;
    return <GalleryPage initialData={initialData} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return notFound();
    }

    throw error;
  }
}
