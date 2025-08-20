"use client";
import React from "react";
import { signOut } from "next-auth/react";

export const Logout = () => {
  return (
    <button
      onClick={() =>
        signOut({
          callbackUrl: "/",
        })
      }
      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
    >
      Выйти
    </button>
  );
};
