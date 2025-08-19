import React from "react";
import axios from "axios";
import { ProfilePage } from "@/components/pages/ProfilePage";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { Logout } from "@/components/entities";

import { apiUrl } from "@/lib/apiUrl";

const ProfilePageServer: React.FC = async () => {
  const session = await getServerSession(authOptions);
  console.log("Сессия: ", session);
  console.log(Date.now());

  try {
    const response = await axios.get(`${apiUrl}/users/me`, {
      headers: {
        Authorization: `Bearer ${session?.accessToken}`,
      },
    });

    const userData = response.data.data;
    return <ProfilePage data={userData} token={session?.accessToken} />;
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      return (
        <div>
          Произошла ошибка <Logout />
        </div>
      );
    }

    return <div>Произошла ошибка</div>;
  }
};

export default ProfilePageServer;
