import React from "react";
import axios from "axios";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { Instagram, Share, ChevronRight, MapPinned } from "lucide-react";

import Link from "next/link";

import { Avatar, ExpandableText, TitleLink } from "@/components/shared/ui";
import { ChipTag } from "@/components/entities/ChipTag";
import { LocationType, TagType } from "@/components/shared/types/models";
import { EventSlider } from "@/components/features";
import { PhotoGalleryTemplate } from "@/components/widgets";

const titles = ["кто они", "история DJ Akee"];

const samplePhotos = [
  "https://www.thesun.co.uk/wp-content/uploads/2024/03/p-diddy-getting-drinks-nightclub-3104650.jpg",
  "https://avatars.mds.yandex.net/i?id=7613a25166fd0d273d091bbf51b2a5c0d0003be9-5403234-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=dcc2ecf19d6a33ad841c40fcad54f13b_l-8910959-images-thumbs&n=13",
  "https://i.pinimg.com/originals/bf/fc/ab/bffcabc6850e03bfbcff2caee4463fb2.jpg",
  "https://avatars.mds.yandex.net/i?id=d120e08b8252d3cb58e751b20dddfc9e_l-12520451-images-thumbs&n=13",
];

const apiUrl = process.env.API_URL;

interface Props {
  id: string;
  initialData: LocationType;
}

const mockTags: TagType[] = [
  { id: 1, name: "Кофейня", type: "chips", created_at: "2024-01-01T00:00:00Z" },
  { id: 2, name: "Кофе", type: "chips", created_at: "2024-01-01T00:00:00Z" },
  {
    id: 3,
    name: "Кофе с собой",
    type: "chips",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 4,
    name: "Кофе на вынос",
    type: "chips",
    created_at: "2024-01-01T00:00:00Z",
  },
  {
    id: 5,
    name: "Кофе с собой",
    type: "chips",
    created_at: "2024-01-01T00:00:00Z",
  },
];

export const LocationPage: React.FC<Props> = async ({ id, initialData }) => {
  const { data: tags } = await axios.get(`${apiUrl}/locations/${id}/tags`);

  console.log("tags:", tags);
  // const { data: events } = await axios.get(`${apiUrl}/events/home`);

  return (
    <main
      className={cn(
        styles.AuthPage,
        "flex flex-col gap-6 pt-[20vh] pb-24 px-2"
      )}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Avatar
            title={initialData.name}
            subtitle="социально-культурное пространство"
          />
        </div>

        <div className="flex w-full justify-around">
          <div className="flex items-center gap-2 font-geologica text-center">
            <MapPinned className="h-4 w-4" />{" "}
            <h6 className="text-sm">{initialData.address}</h6>
          </div>
        </div>

        <ExpandableText text={initialData.description} />

        <div className="flex flex-wrap justify-center gap-2 w-full">
          {mockTags?.map((item: TagType) => (
            <ChipTag
              className="bg-white/10 backdrop-blur-sm lowercase"
              key={item.id}
              title={item.name}
            />
          ))}
        </div>

        <div className="flex overflow-auto gap-[10px] justify-center px-4">
          <button className="p-[18px] bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
            <Share className="w-5 h-5" />
          </button>

          {/* Кнопка поделиться */}
          <button className="p-[18px] bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
            <Instagram className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="flex flex-col w-full px-4 bg-[rgba(255,255,255,0.15)] rounded-2xl">
        {titles.map((title, idx) => (
          <Link
            href={`post/${idx}`}
            key={idx}
            className={cn(
              "flex justify-between items-center w-full px-2 py-4",
              idx !== titles.length - 1 && "border-b border-white/50"
            )}
          >
            <h5 className="font-geologica font-medium ">{title}</h5>
            <ChevronRight className="w-4 h-4" />
          </Link>
        ))}
      </div>

      <section className="flex flex-col gap-4">
        <h3 className="font-unbounded font-normal text-xl">афиша</h3>
        <EventSlider request={`locations/${id}/events`} />
      </section>

      <section className="flex flex-col gap-2">
        <TitleLink to="gallery" title="Галерея организатора" />
        <PhotoGalleryTemplate photos={samplePhotos} />
      </section>
    </main>
  );
};
