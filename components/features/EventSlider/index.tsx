"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { EventSliderClient } from "./ui/EventSliderClient";
import { EventSliderSkeleton } from "./ui/EventSliderSkeleton";
import { EventCardType } from "@/components/shared/types/models";

export const EventSlider = ({ request }: { request: string }) => {
  const [data, setData] = useState<EventCardType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`/api/events`, {
          params: {
            path: request,
          },
        });
        console.log(res.data);

        setData(res.data.data);
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
