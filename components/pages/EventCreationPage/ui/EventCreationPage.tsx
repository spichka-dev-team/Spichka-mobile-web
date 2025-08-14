"use client";

import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { EventCreationForm, LocalHeader } from "@/components/widgets";

export const EventCreationPage: React.FC = () => {
  return (
    <main className={cn(styles.EventPage, "flex  py-20 flex-col items-center")}>
      <LocalHeader title="создать ивент" />

      {/* Event Form */}
      <EventCreationForm />
    </main>
  );
};
