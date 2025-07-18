import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

import { SignUpForm } from "@/components/features";

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
          создайте аккаунт
        </h2>
        <h4 className="font-unbounded font-medium text-base lowercase">
          зарегистрируйтесь, чтобы получить доступ ко всем функциям
        </h4>
      </div>

      <SignUpForm />
    </main>
  );
};
