"use client";

import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

import { SignUpForm } from "@/components/features";

const texts = [
  {
    title: "создайте аккаунт",
    subtitle: "зарегистрируйтесь, чтобы получить доступ ко всем функциям",
  },
  {
    title: "придумайте имя",
    subtitle:
      "придумайте уникальный ник, который будет отображаться в вашем профиле",
  },
];

export const SignUpPage: React.FC = () => {
  return (
    <main
      className={cn(
        styles.AuthPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <div className="text-center space-y-4">
        <h2 className="font-unbounded font-bold text-2xl lowercase">
          {texts[0].title}
        </h2>
      </div>

      <SignUpForm />
    </main>
  );
};
