"use client";

import React, { useState } from "react";
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
  const [step, setStep] = useState(false);

  return (
    <main
      className={cn(
        styles.AuthPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <div className="text-center space-y-4">
        <h2 className="font-unbounded font-bold text-2xl lowercase">
          {step ? texts[1].title : texts[0].title}
        </h2>
        <h4 className="font-unbounded font-medium text-base lowercase">
          {step ? texts[1].subtitle : texts[0].subtitle}
        </h4>
      </div>

      <SignUpForm step={step} setStep={setStep} />
    </main>
  );
};
