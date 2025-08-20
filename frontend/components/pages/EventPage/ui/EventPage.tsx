import React from "react";
import { cn } from "@/lib/utils";
import { Event } from "@/components/shared/types/models";
import { EventSlider, PhotoSlider } from "@/components/features";

import {
  ProgramSection,
  LocationSectionServer,
  EventInfo,
  CreatorSection,
} from "@/components/widgets";

import { Suspense } from "react";
import styles from "./styles.module.scss";

interface Props {
  id: string;
  data: Event;
}

export const EventPage: React.FC<Props> = ({ id, data }) => {
  console.log(data);
  const locationId =
    data.community_group_location[0].Community_Group_Location_id;
  const organizerId = data.user_created;

  return (
    <main
      className={cn(
        styles.EventPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <Suspense fallback={<div>Loading event info...</div>}>
        <EventInfo id={id} data={data} />
      </Suspense>
      <PhotoSlider id={id} />

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          программка
        </h3>
        <Suspense fallback={<div>Loading program...</div>}>
          <ProgramSection
            schedule={data.schedule}
            duration={data.duration_hours}
          />
        </Suspense>
      </section>

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          локация
        </h3>
        <Suspense fallback={<div>Loading location...</div>}>
          <LocationSectionServer id={locationId} />
        </Suspense>
      </section>

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          организатор
        </h3>
        <Suspense fallback={<div>Loading location...</div>}>
          <CreatorSection id={organizerId} />
        </Suspense>
      </section>

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          похожие ивенты
        </h3>
        <EventSlider
          request="items/Event"
          filters={{
            "filter[id][_neq]": `${id}`,
          }}
        />
      </section>
    </main>
  );
};
