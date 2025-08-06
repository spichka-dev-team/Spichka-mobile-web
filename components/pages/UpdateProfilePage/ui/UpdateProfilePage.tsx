"use client";

import type React from "react";
import { useState } from "react";
import { ArrowLeft, Camera } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Image from "next/image";

interface UserData {
  id: string;
  first_name: string;
  last_name: string;
  username: string;
  avatar?: string;
  isCreator?: boolean;
}

interface UpdateProfilePageProps {
  data: UserData;
  token: string;
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export const UpdateProfilePage: React.FC<UpdateProfilePageProps> = ({
  data,
  token,
}) => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    first_name: data.first_name || "",
    last_name: data.last_name || "",
    username: data.username || "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [avatar] = useState(data.avatar);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const response = await axios.patch(`${apiUrl}/users/me`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("Profile updated successfully:", response.data);
      router.push("/profile");
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
      // Здесь можно добавить toast уведомление об ошибке
    } finally {
      setIsLoading(false);
    }
  };

  const handleBecomeCreator = async () => {
    // Логика для становления креатором
    console.log("Become creator clicked");
  };

  const handleAvatarChange = () => {
    // Логика для изменения аватара
    console.log("Change avatar clicked");
  };

  return (
    <div className="min-h-screen pb-20 bg-black text-white">
      {/* Header */}
      <div className="flex items-center px-4 py-4">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-lg font-medium">редактирование</h1>
      </div>

      {/* Content */}
      <div className="px-6 pt-8">
        {/* Profile Photo */}
        <div className="flex flex-col items-center mb-12">
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-800">
              {avatar ? (
                <Image
                  src={`/api/proxy/image?id=${avatar}` || "/placeholder.svg"}
                  alt="Profile"
                  width={96}
                  height={96}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                  <span className="text-2xl font-bold">
                    {formData.first_name.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
            </div>
            <button
              onClick={handleAvatarChange}
              className="absolute -bottom-1 -right-1 w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center"
            >
              <Camera className="w-4 h-4" />
            </button>
          </div>
          <button
            onClick={handleAvatarChange}
            className="text-gray-400 text-sm"
          >
            изменить фото профиля
          </button>
        </div>

        {/* Form Fields */}
        <div className="space-y-6 mb-8">
          {/* first_name Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              имя
            </label>
            <input
              type="text"
              value={formData.first_name}
              onChange={(e) => handleInputChange("first_name", e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Введите имя"
            />
          </div>

          {/* Name Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              имя
            </label>
            <input
              type="text"
              value={formData.last_name}
              onChange={(e) => handleInputChange("last_name", e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Введите имя"
            />
          </div>

          {/* Username Field */}
          <div>
            <label className="block text-white text-sm font-medium mb-2">
              имя пользователя
            </label>
            <input
              type="text"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              className="w-full bg-gray-800 text-white px-4 py-3 rounded-lg border-none outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="@username"
            />
          </div>
        </div>

        {/* Become Creator Button */}
        {!data.isCreator && (
          <button
            onClick={handleBecomeCreator}
            className="w-full py-3 mb-8 border border-white rounded-lg text-white font-medium hover:bg-white hover:text-black transition-colors"
          >
            стать креатором
          </button>
        )}
      </div>

      {/* Save Button */}
      <div className="bottom-8 left-6 right-6">
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full py-4 bg-white text-black rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Сохранение..." : "сохранить"}
        </button>
      </div>

      {/* Home Indicator */}
      <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-1 bg-white rounded-full"></div>
      </div>
    </div>
  );
};
