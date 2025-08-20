import React from "react";
import Image from "next/image";

import { ChipTag } from "@/components/entities/ChipTag";
import { Button, ExpandableText } from "@/components/shared/ui";
import { Event } from "@/components/shared/types/models";
import Link from "next/link";

interface Props {
  id: string;
  data: Event;
}

export const EventInfo: React.FC<Props> = async ({ id, data }) => {
  console.log("EventInfo data:", data);

  const formattedDate = new Date(data.start_date).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <div className="p-[5px] rounded-2xl bg-white/20 backdrop-blur-sm">
        <Image
          src={
            `/api/proxy/image?id=${data.picture}` ||
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
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        <ChipTag className="bg-white text-black" title={formattedDate} />

        {data.tags?.map((item: string, idx) => (
          <ChipTag
            className="bg-white/20 backdrop-blur-sm"
            key={idx}
            title={item}
          />
        ))}
      </div>

      <ExpandableText text={data.description} />

      <div className="max-w-xs w-full h-fit bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-between pr-5">
        <Link href={`/event/${id}/payment`} className="w-full">
          <Button className="bg-white text-black h-full py-4 px-8 rounded-full font-unbounded font-medium text-base">
            купить билет!
          </Button>
        </Link>

        <span className="font-geologica font-bold text-lg">{data.price}₸</span>
      </div>
    </>
  );
};
