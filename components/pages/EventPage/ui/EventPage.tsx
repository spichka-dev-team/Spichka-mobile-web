import React from "react";
import { cn } from "@/lib/utils";
import { EventType } from "@/components/shared/types/models";
import { Button, ExpandableText } from "@/components/shared/ui";
import { EventSliderClient } from "@/components/features/EventSlider/ui/EventSlider";
import { EventSlider } from "@/components/features/EventSlider";
import Image from "next/image";

import styles from "./styles.module.scss";

interface Props {
  data: EventType;
}

const tags = ["Кинопоказ", "лекция", "обсуждение"];

const photos = [
  {
    type: "image" as const,
    id: "photo1",
    url: "https://i.pinimg.com/originals/23/9b/ee/239beedac54d3dc1c8297578b41eb386.jpg",
  },
  {
    type: "image" as const,
    id: "photo2",
    url: "https://i.pinimg.com/originals/2c/ab/a7/2caba7b42c2e4772aeac8303faf8674f.jpg",
  },
  {
    type: "image" as const,
    id: "photo3",
    url: "https://i.pinimg.com/originals/49/74/90/4974908d89036fadd917c5baa4dbbc63.png",
  },
  {
    type: "image" as const,
    id: "photo4",
    url: "https://i.pinimg.com/originals/23/9b/ee/239beedac54d3dc1c8297578b41eb386.jpg",
  },
  {
    type: "image" as const,
    id: "photo5",
    url: "https://i.pinimg.com/originals/23/9b/ee/239beedac54d3dc1c8297578b41eb386.jpg",
  },
];

export const EventPage: React.FC<Props> = ({ data }) => {
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

      <ExpandableText text={data.description} />

      <div className="max-w-xs w-full h-fit bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-between pr-5">
        <Button className="bg-white text-black h-full py-4 px-8 rounded-full font-unbounded font-medium text-base">
          купить билет!
        </Button>

        <span className="font-geologica font-bold text-lg">{data.price}₸</span>
      </div>

      <EventSliderClient initialData={photos} />

      <EventSlider />
    </main>
  );
};
