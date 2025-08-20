"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

import { apiUrl } from "@/lib/apiUrl";

interface CreatorData {
  id: string; // Added id field for organizer selection
  title: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface AddCreatorsProps {
  className?: string;
  onOrganizerSelect?: (organizerId: string) => void; // Added callback for organizer selection
}

export const AddCreators = ({
  className,
  onOrganizerSelect,
}: AddCreatorsProps) => {
  const { data: session } = useSession();
  const [creator, setCreator] = useState<CreatorData | null>(null);

  useEffect(() => {
    if (!session?.accessToken) return;

    const fetchData = async () => {
      try {
        // Получаем данные пользователя
        const res = await axios.get(`${apiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        const user = res.data.data;
        console.log("user: ", user);

        // Преобразуем в формат initialData
        const initialData: CreatorData = {
          id: user.id || "", // Added user ID
          title: user.title || "", // если в /users/me нет title, можно заменить на другое поле
          first_name: user.first_name || "",
          last_name: user.last_name || "",
          avatar: user.avatar || "",
        };

        setCreator(initialData);

        if (onOrganizerSelect && user.id) {
          onOrganizerSelect(user.id);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    };

    fetchData();
  }, [session?.accessToken, onOrganizerSelect]);

  if (!creator) return null;

  return (
    <div
      className={`w-full bg-white/20 backdrop-blur-sm p-4 rounded-lg ${className}`}
    >
      <div className="flex flex-row gap-4">
        {/* Фото слева */}
        <div className="w-1/2 aspect-square rounded-lg overflow-hidden">
          <Image
            src={
              creator.avatar
                ? `/api/proxy/image?id=${creator.avatar}`
                : "/placeholder.svg?height=280&width=400"
            }
            alt={`${creator.first_name} ${creator.last_name}`}
            width={400}
            height={280}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Контент справа */}
        <div className="flex flex-1 flex-col justify-center gap-6 text-white">
          <div className="flex flex-col gap-3">
            <h2 className="font-bold text-base md:text-4xl font-geologica break-words">
              {creator.first_name} {creator.last_name}
            </h2>

            <p className="text-xs md:text-xl text-white/90 font-geologica font-medium break-words">
              {creator.title}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
