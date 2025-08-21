"use client";

import type React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { useSession } from "next-auth/react";
import { Logout } from "@/components/entities";
import { ProfilePageType } from "@/components/shared/types/models";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const ProfilePageClient: React.FC = () => {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState<ProfilePageType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (status === "loading") return; // Still loading session

      if (status === "unauthenticated") {
        setError("Не авторизован");
        setLoading(false);
        return;
      }

      if (!session?.accessToken) {
        setError("Отсутствует токен доступа");
        setLoading(false);
        return;
      }

      try {
        console.log("Сессия: ", session);
        console.log(Date.now());

        const response = await axios.get(`${apiUrl}/users/me`, {
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        });

        setUserData(response.data.data);
        setError(null);
      } catch (error: unknown) {
        if (axios.isAxiosError(error) && error.response?.status === 401) {
          setError("Ошибка авторизации");
          Logout();
        } else {
          setError("Произошла ошибка");
          Logout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, status]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg text-red-500">{error}</div>
        <Logout />
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <div className="text-lg">Данные пользователя не найдены</div>
        <Logout />
      </div>
    );
  }

  return <ProfilePage data={userData} token={session?.accessToken} />;
};
