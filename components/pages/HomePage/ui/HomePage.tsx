import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { EventSlider } from "@/components/features/EventSlider";
import { BannerSlider } from "@/components/features/BannerSlider";
import { Ticket } from "@/components/shared/ui/Ticket";
// import { Button } from "@/components/shared/ui/button";
// import Link from "next/link";

interface Props {
  className?: string;
}

export const HomePage: React.FC<Props> = ({ className }) => {
  return (
    <main
      className={cn(
        className,
        styles.AuthPage,
        "flex flex-col gap-4 pt-10 pb-6 px-2"
      )}
    >
      <div className="flex px-4 justify-between">
        <h2 className="font-comfortaa font-medium text-2xl">главная</h2>
        <Ticket />
      </div>

      <BannerSlider />

      <section className="flex flex-col gap-4">
        <h3 className="font-comfortaa font-medium text-xl">название раздела</h3>
        <EventSlider />
      </section>

      <section className="flex flex-col gap-4">
        <h3 className="font-comfortaa font-medium text-xl">название раздела</h3>
        <EventSlider />
      </section>
    </main>
  );
};
