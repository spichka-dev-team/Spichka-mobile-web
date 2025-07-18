import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";

import { LoginForm } from "@/components/features";

export const AuthPage: React.FC = () => {
  return (
    <main
      className={cn(
        styles.AuthPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <div className="text-center space-y-4">
        <h2 className="font-unbounded font-bold text-2xl">почти с нами</h2>
        <h4 className="font-unbounded font-medium text-base lowercase">
          введите ваши данные чтобы войти в аккаунт
        </h4>
      </div>

      <LoginForm />
    </main>
  );
};
