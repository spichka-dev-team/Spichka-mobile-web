import axios from "axios";
import { PhotoSliderWrapper } from "./ui/PhotoSliderWrapper";

import React from "react";

interface Props {
  id: string;
}

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

export const PhotoSlider: React.FC<Props> = async ({ id }) => {
  console.log("PhotoSlider. Id: ", id);

  console.log(
    "Запрос на бек: ",
    `${apiUrl}/items/Event/${id}?fields=gallery.directus_files_id`
  );

  const { data } = await axios.get(
    `${apiUrl}/items/Event/${id}?fields=gallery.directus_files_id`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );
  const photos = data.data.gallery;

  return <PhotoSliderWrapper initialData={photos} />;
};
