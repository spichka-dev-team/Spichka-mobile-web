import React from "react";
import axios from "axios";
import Image from "next/image";

import { TagType } from "@/components/shared/types/models";
import { ChipTag } from "@/components/entities/ChipTag";
import { Button, ExpandableText } from "@/components/shared/ui";

interface Props {
  id: string;
}

const apiUrl = process.env.API_URL;

export const EventInfo: React.FC<Props> = async ({ id }) => {
  const [{ data: data }, { data: tags }] = await Promise.all([
    axios.get(`${apiUrl}/events/${id}`),
    axios.get(`${apiUrl}/events/${id}/tags`),
  ]);

  const formattedDate = new Date(data).toLocaleDateString("ru-RU", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const chipsTags = tags.filter((tag: TagType) => tag.type === "chips");
  const hotTags = tags.filter((tag: TagType) => tag.type === "hot");
  return (
    <>
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
    </>
  );
};
