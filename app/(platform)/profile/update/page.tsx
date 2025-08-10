import type React from "react";
import axios from "axios";
import { UpdateProfilePage } from "@/components/pages/UpdateProfilePage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

const apiUrl = process.env.API_URL;

const Page: React.FC = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    console.error("No auth token found");
    return <div>Ошибка: Токен не найден</div>;
  }

  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    const userData = response.data.data;
    console.log("User data for update:", userData);

    return <UpdateProfilePage data={userData} token={session?.accessToken} />;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return <div>Произошла ошибка</div>;
  }
};

export default Page;
