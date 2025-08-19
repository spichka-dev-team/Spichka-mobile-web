import axios from "axios";
import { LocationSection } from "./ui/LocationSection";
import React from "react";

interface Props {
  id: string;
}

import { apiUrl } from "@/lib/apiUrl";
const adminToken = process.env.NEXT_DIRECTUS_ADMIN_TOKEN;

export const LocationSectionServer: React.FC<Props> = async ({ id }) => {
  const { data } = await axios.get(
    `${apiUrl}/items/Community_Group_Location/${id}`,
    {
      headers: {
        Authorization: `Bearer ${adminToken}`,
      },
    }
  );

  const location = data.data;

  return <LocationSection location={location} />;
};
