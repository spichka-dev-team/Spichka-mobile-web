import React from "react";
import { cn } from "@/lib/utils";
import { EventType } from "@/components/shared/types/models";
import { Button, ExpandableText } from "@/components/shared/ui";
import { EventSliderClient } from "@/components/features/EventSlider/ui/EventSlider";
import { EventSlider } from "@/components/features/EventSlider";
import { ChipTag } from "@/components/entities/ChipTag";
import { ProgramSection, LocationSection } from "@/components/widgets";
import Image from "next/image";

import styles from "./styles.module.scss";

interface Props {
  data: EventType;
}

const tags = ["Кинопоказ", "лекция", "обсуждение"];

export const EventPage: React.FC<Props> = ({ data }) => {
  const formattedDate = new Date(data.eventDate).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  console.log(data);

  return (
    <main
      className={cn(
        styles.EventPage,
        "flex px-2 py-20 flex-col gap-7 items-center"
      )}
    >
      <div className="p-[5px] rounded-2xl bg-white/20 backdrop-blur-sm">
        <Image
          src={data.preview}
          width={300}
          height={375}
          alt={`Event_With_Id_${data.id}_Preview`}
          className="rounded-2xl"
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <h3 className="z-20 font-unbounded font-medium text-xl">
          {data.title}
        </h3>

        <h4 className="font-geologica font-normal lowercase text-white/80 flex items-center gap-2 flex-wrap">
          {tags.map((text, idx) => (
            <React.Fragment key={idx}>
              <span>{text}</span>
              {idx < tags.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-white/80" />
              )}
            </React.Fragment>
          ))}
        </h4>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        <ChipTag className="bg-white text-black" title={formattedDate} />

        {data.chipsTags?.map((item, idx) => (
          <ChipTag
            className="bg-white/20 backdrop-blur-sm"
            key={idx}
            title={item}
          />
        ))}
      </div>

      <ExpandableText text={data.description} />

      <div className="max-w-xs w-full h-fit bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-between pr-5">
        <Button className="bg-white text-black h-full py-4 px-8 rounded-full font-unbounded font-medium text-base">
          купить билет!
        </Button>

        <span className="font-geologica font-bold text-lg">{data.price}₸</span>
      </div>

      <EventSliderClient initialData={data.eventImages} />

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          программка
        </h3>
        <ProgramSection />
      </section>

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          локация
        </h3>
        <LocationSection location={data.location} />
      </section>

      <EventSlider />
    </main>
  );
};
