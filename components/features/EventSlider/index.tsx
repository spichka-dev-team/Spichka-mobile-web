"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { EventSliderClient } from "./ui/EventSliderClient";
import { EventSliderSkeleton } from "./ui/EventSliderSkeleton";
import { EventCardType } from "@/components/shared/types/models";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const EventSlider = ({ request }: { request: string }) => {
  const [data, setData] = useState<EventCardType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(`${apiUrl}/${request}`);
        setData(response.data);
      } catch (error) {
        console.error("Ошибка при получении событий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [request]);

  if (loading) return <EventSliderSkeleton />;
  if (!data) return null;

  return <EventSliderClient initialData={data} />;
};
