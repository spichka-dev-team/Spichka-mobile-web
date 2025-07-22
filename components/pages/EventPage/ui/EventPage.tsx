import React from "react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { EventType, TagType } from "@/components/shared/types/models";
import { Button, ExpandableText } from "@/components/shared/ui";
import { EventSlider, PhotoSlider } from "@/components/features";
import { ChipTag } from "@/components/entities/ChipTag";
import { ProgramSection, LocationSectionServer } from "@/components/widgets";
import Image from "next/image";
import { Suspense } from "react";

import styles from "./styles.module.scss";

const apiUrl = process.env.API_URL;

interface Props {
  data: EventType;
}

export const EventPage: React.FC<Props> = async ({ data }) => {
  // const { data: sameEvents } = await axios.get(
  //   `${apiUrl}/events/${data.id}/same-events`
  // );
  const { data: tags } = await axios.get(`${apiUrl}/events/${data.id}/tags`);
  // const { data: location } = await axios.get(
  //   `${apiUrl}/events/${data.id}/locations`
  // );

  const chipsTags = tags.filter((tag: TagType) => tag.type === "chips");
  const hotTags = tags.filter((tag: TagType) => tag.type === "hot");

  const formattedDate = new Date(data.startDate).toLocaleDateString("ru-RU", {
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
          src={
            data.preview ||
            "https://cdn1.ozone.ru/s3/multimedia-q/6254451122.jpg"
          }
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
          {hotTags.map((item: TagType, idx: number) => (
            <React.Fragment key={item.id}>
              <span>{item.name}</span>
              {idx < tags.length - 1 && (
                <div className="w-1 h-1 rounded-full bg-white/80" />
              )}
            </React.Fragment>
          ))}
        </h4>
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        <ChipTag className="bg-white text-black" title={formattedDate} />

        {chipsTags?.map((item: TagType) => (
          <ChipTag
            className="bg-white/20 backdrop-blur-sm"
            key={item.id}
            title={item.name}
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

      <PhotoSlider />

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          программка
        </h3>
        <Suspense fallback={<div>Loading program...</div>}>
          <ProgramSection id={data.id} />
        </Suspense>
      </section>

      <section className="w-full">
        <h3 className="font-medium font-unbounded text-xl text-white mb-[10px]">
          локация
        </h3>
        <Suspense fallback={<div>Loading location...</div>}>
          <LocationSectionServer id={data.id} />
        </Suspense>
      </section>

      <EventSlider request={`events/${data.id}/same-events`} />
    </main>
  );
};
