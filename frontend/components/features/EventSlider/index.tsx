"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { EventSliderClient } from "./ui/EventSliderClient";
import { EventSliderSkeleton } from "./ui/EventSliderSkeleton";
import { EventCardType } from "@/components/shared/types/models";

export const EventSlider = ({
  request,
  filters,
}: {
  request: string;
  filters?: Record<string, string>;
}) => {
  const [data, setData] = useState<EventCardType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`/api/events`, {
          params: {
            path: request,
            ...filters,
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
  }, [filters, request]);

  if (loading) return <EventSliderSkeleton />;
  if (!data) return <div>Ивенты отсутсвуют</div>;

  return <EventSliderClient initialData={data} />;
};
