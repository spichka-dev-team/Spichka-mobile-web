import type React from "react";
import axios from "axios";
import { UpdateProfilePage } from "@/components/pages/UpdateProfilePage";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

const Page: React.FC = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("spichka_token");

  if (!cookie?.value) {
    console.error("No auth token found");
    return <div>Ошибка: Токен не найден</div>;
  }

  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    });

    const userData = response.data.data;
    console.log("User data for update:", userData);

    return <UpdateProfilePage data={userData} token={cookie.value} />;
  } catch (error) {
    console.error("Ошибка при получении данных пользователя:", error);
    return <div>Произошла ошибка</div>;
  }
};

export default Page;
