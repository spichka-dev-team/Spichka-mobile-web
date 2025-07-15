import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { Button } from "@/components/shared/ui/button";
import Link from "next/link";

interface Props {
  className?: string;
}

export const AuthPage: React.FC<Props> = ({ className }) => {
  return (
    <main
      className={cn(
        className,
        styles.AuthPage,
        "flex flex-col items-center justify-between pt-10 pb-6 px-2"
      )}
    >
      <div className="z-30">
        <h1 className="font-jost font-extrabold uppercase text-5xl leading-none text-center">
          Спичка собирает город
        </h1>

        <h4 className="font-jost font-medium text-center text-xs text-white/50">
          вечеринки • выставки • кинопоказы • концерты
        </h4>
      </div>

      <div className="relative flex flex-col gap-3 h-fit w-full max-w-xs">
        <Button
          className="absolute bg-white rounded-full text-black font-jost text-2xl px-8 py-5 left-0 bottom-12"
          size={"sm"}
          asChild
        >
          <Link href={"/login"}>Авторизоваться</Link>
        </Button>

        <Button
          variant={"outline"}
          className="absolute rounded-full text-white font-jost text-2xl py-5 px-12 bottom-0 right-0"
          size={"sm"}
          asChild
        >
          <Link href={"/homepage"}>Пропустить</Link>
        </Button>
      </div>
    </main>
  );
};
