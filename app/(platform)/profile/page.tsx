import React from "react";
import axios from "axios";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

const Page: React.FC = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("spichka_token");

  if (!cookie?.value) {
    return <div>Ошибка: Токен не найден</div>;
  }

  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    });

    const userData = response.data.data;
    return <ProfilePage data={userData} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return (
        <html>
          <head>
            <meta httpEquiv="refresh" content="0; URL=/retry-refresh" />
          </head>
          <body></body>
        </html>
      );
    }

    return <div>Произошла ошибка</div>;
  }
};

export default Page;
