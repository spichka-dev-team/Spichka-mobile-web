import axios from "axios";
import { LocationSection } from "./ui/LocationSection";
import React from "react";

interface Props {
  id: number | undefined;
}

const apiUrl = process.env.API_URL;

export const LocationSectionServer: React.FC<Props> = async ({ id }) => {
  const { data: location } = await axios.get(
    `${apiUrl}/events/${id}/locations`
  );

  return <LocationSection location={location[0]} />;
};
