"use client";

import type React from "react";

import { useCallback, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import type {
  EventData,
  TicketType,
  ScheduleItem,
} from "@/components/shared/types/event";

interface PhotoSliderItem {
  id: number;
  Event_id: number;
  directus_files_id: string;
  localUrl?: string;
  file?: File;
}

export const useEventCreation = () => {
  const { data: session } = useSession();

  const [eventData, setEventData] = useState<EventData>({
    name: "",
    date: "",
    formattedDate: "",
    time: "",
    start_date: "",
    end_date: "",
    tags: [],
    description: "",
    price: "",
    image: null,
    duration_hours: "",
    community_group_location: [],
  });

  const [ticketTypes, setTicketTypes] = useState<TicketType[]>([
    { name: "", price: "" },
  ]);

  const [pending, setPending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [photos, setPhotos] = useState<PhotoSliderItem[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([
    { title: "", time: "" },
  ]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setEventData((prev) => ({
          ...prev,
          image: event.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUpload = (files: FileList) => {
    console.log("Uploading files:", files);
    console.log(
      `Adding ${files.length} new photos to existing ${photos.length} photos`
    );

    const newPhotos = Array.from(files).map((file, index) => ({
      id: photos.length + index + 1,
      Event_id: 1,
      directus_files_id: `temp-${Date.now()}-${index}`, // Temporary ID
      localUrl: URL.createObjectURL(file), // Local URL for immediate display
      file: file, // Store original file for server upload
    }));

    setPhotos((prev) => {
      const updatedPhotos = [...prev, ...newPhotos];
      console.log(`Total photos after upload: ${updatedPhotos.length}`);
      return updatedPhotos;
    });
  };

  const handleDateTimeChange = (dateStr: string, timeStr: string) => {
    const dateTime = new Date(`${dateStr}T${timeStr}`);
    setEventData((prev) => ({
      ...prev,
      date: dateStr,
      time: timeStr,
      start_date: dateTime.toISOString().slice(0, 19),
      formattedDate: format(dateTime, "EEEE, d MMMM, HH:mm", { locale: ru }),
    }));
  };

  const handlePriceInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    setEventData((prev) => ({ ...prev, price: value.slice(0, 5) }));
  };

  const addTicketType = () => {
    const hasEmpty = ticketTypes.some((t) => !t.name.trim() || !t.price.trim());
    if (hasEmpty) return;
    if (ticketTypes.length < 5) {
      setTicketTypes([...ticketTypes, { name: "", price: "" }]);
    }
  };

  const removeTicketType = (index: number) => {
    setTicketTypes((prev) => prev.filter((_, i) => i !== index));
  };

  const handleTicketTypeChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...ticketTypes];
    updated[index] = { ...updated[index], [field]: value };
    setTicketTypes(updated);
  };

  const uploadPhotosToServer = async (): Promise<string[]> => {
    const uploadedIds: string[] = [];

    for (const photo of photos) {
      if (photo.file) {
        try {
          const formData = new FormData();
          formData.append("file", photo.file);
          formData.append("type", photo.file.type);
          formData.append("storage", "s3");
          formData.append("filename_download", photo.file.name);

          const uploadRes = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/files`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${session?.accessToken}`,
              },
              body: formData,
            }
          );

          if (!uploadRes.ok) {
            throw new Error(`Ошибка при загрузке фото ${photo.file.name}`);
          }

          const uploadData = await uploadRes.json();
          if (uploadData?.data?.id) {
            uploadedIds.push(uploadData.data.id);
          }
        } catch (error) {
          console.error(`Ошибка загрузки фото ${photo.file?.name}:`, error);
          throw error;
        }
      }
    }

    return uploadedIds;
  };

  const addScheduleItem = () => {
    const hasEmpty = schedule.some((s) => !s.title.trim() || !s.time.trim());
    if (hasEmpty) return;
    if (schedule.length < 10) {
      setSchedule([...schedule, { title: "", time: "" }]);
    }
  };

  const removeScheduleItem = (index: number) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...schedule];
    updated[index] = { ...updated[index], [field]: value };
    setSchedule(updated);
  };

  const handleDurationChange = useCallback((duration: string) => {
    setEventData((prev) => ({
      ...prev,
      duration_hours: duration,
    }));
  }, []);

  const handleLocationSelect = useCallback((locationId: string) => {
    setEventData((prev) => ({
      ...prev,
      community_group_location: [
        {
          Community_Group_Location_id: locationId,
        },
      ],
    }));
  }, []);

  const handleCreateEvent = async () => {
    setPending(true);
    setErrorMessage("");
    setSuccessMessage("");

    if (!session?.accessToken) {
      console.error("Нет токена авторизации");
      return;
    }

    try {
      let uploadedImageId: string | null = null;

      // Загрузка изображения
      if (eventData.image) {
        const response = await fetch(eventData.image);
        const blob = await response.blob();
        const file = new File([blob], "event-image.jpg", { type: blob.type });

        const formData = new FormData();
        formData.append("file", file);
        formData.append("type", file.type);
        formData.append("storage", "s3");
        formData.append("filename_download", file.name);

        const uploadRes = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/files`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
            body: formData,
          }
        );

        if (!uploadRes.ok) {
          throw new Error("Ошибка при загрузке фото");
        }

        const uploadData = await uploadRes.json();
        uploadedImageId = uploadData?.data?.id;
      }

      const photoIds = await uploadPhotosToServer();
      const gallery = photoIds.map((id) => ({
        directus_files_id: id,
      }));

      // Создание типов билетов
      const createdTicketIds: { Tickets_Type_id: string }[] = [];

      for (const ticket of ticketTypes) {
        if (!ticket.name.trim() || !ticket.price.trim()) continue;

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/items/Tickets_Type`,
          {
            name: ticket.name,
            price: Number(ticket.price),
          },
          {
            headers: {
              Authorization: `Bearer ${session.accessToken}`,
            },
          }
        );

        createdTicketIds.push({
          Tickets_Type_id: res.data.data.id,
        });
      }

      // Создание события
      const validSchedule = schedule.filter(
        (item) => item.title.trim() && item.time.trim()
      );

      const eventPayload = {
        title: eventData.name,
        start_date: eventData.start_date,
        end_date: eventData.start_date,
        tags: eventData.tags,
        description: eventData.description,
        price: eventData.price,
        picture: uploadedImageId,
        tickets_types: createdTicketIds,
        gallery: gallery,
        schedule: validSchedule.length > 0 ? validSchedule : undefined,
        duration_hours: eventData.duration_hours,
        community_group_location: eventData.community_group_location,
      };

      console.log(eventPayload);

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/items/Event`,
        eventPayload,
        {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        }
      );

      setSuccessMessage("Событие успешно создано!");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        err.response?.data?.errors?.[0]?.message ||
          err.message ||
          "Ошибка создания события"
      );
    } finally {
      setPending(false);
    }
  };

  return {
    eventData,
    setEventData,
    ticketTypes,
    pending,
    successMessage,
    errorMessage,
    handleImageUpload,
    handlePhotoUpload,
    photos,
    handleDateTimeChange,
    handlePriceInput,
    addTicketType,
    removeTicketType,
    handleTicketTypeChange,
    schedule,
    addScheduleItem,
    removeScheduleItem,
    handleScheduleChange,
    handleDurationChange,
    handleLocationSelect,
    handleCreateEvent,
  };
};
