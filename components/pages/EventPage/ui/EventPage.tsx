import React from "react";
import { cn } from "@/lib/utils";
import { EventType, TagType } from "@/components/shared/types/models";
import { EventSlider, PhotoSlider } from "@/components/features";

import {
  ProgramSection,
  LocationSectionServer,
  EventInfo,
} from "@/components/widgets";

import { Suspense } from "react";

import styles from "./styles.module.scss";

interface Props {
  id: string;
  data?: EventType;
  tags?: TagType[];
}

export const EventPage: React.FC<Props> = ({ id }) => {
  return (
    <main
      className={cn(
        styles.EventPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <Suspense fallback={<div>Loading event info...</div>}>
        <EventInfo id={id} />
      </Suspense>
      <PhotoSlider />

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          программка
        </h3>
        <Suspense fallback={<div>Loading program...</div>}>
          <ProgramSection id={id} />
        </Suspense>
      </section>

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          локация
        </h3>
        <Suspense fallback={<div>Loading location...</div>}>
          <LocationSectionServer id={id} />
        </Suspense>
      </section>

      <EventSlider request={`events/${id}/same-events`} />
    </main>
  );
};
