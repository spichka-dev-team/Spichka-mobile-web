import React from "react";
import axios from "axios";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { cookies } from "next/headers";

const apiUrl = process.env.API_URL;

const Page: React.FC = async () => {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("spichka_token");
  console.log(cookie?.value);
  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${cookie?.value}`,
      },
    });

    console.log("User data fetched successfully:", response.data);

    return <ProfilePage data={response?.data} />;
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export default Page;
