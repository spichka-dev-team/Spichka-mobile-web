"use client";
import React from "react";
import { useLogout } from "@/hooks/useLogout";

export const Logout = () => {
  const logout = useLogout();

  return (
    <button
      onClick={logout}
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Выйти
    </button>
  );
};
