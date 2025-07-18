import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { Instagram, Share, ChevronRight } from "lucide-react";

import Link from "next/link";

import {
  Avatar,
  ExpandableText,
  Button,
  TitleLink,
} from "@/components/shared/ui";
import { EventSlider } from "@/components/features";
import { PhotoGalleryTemplate } from "@/components/widgets";

interface Props {
  className?: string;
}

const titles = ["кто они", "история DJ Akee"];

const samplePhotos = [
  "https://www.thesun.co.uk/wp-content/uploads/2024/03/p-diddy-getting-drinks-nightclub-3104650.jpg",
  "https://avatars.mds.yandex.net/i?id=7613a25166fd0d273d091bbf51b2a5c0d0003be9-5403234-images-thumbs&n=13",
  "https://avatars.mds.yandex.net/i?id=dcc2ecf19d6a33ad841c40fcad54f13b_l-8910959-images-thumbs&n=13",
  "https://i.pinimg.com/originals/bf/fc/ab/bffcabc6850e03bfbcff2caee4463fb2.jpg",
  "https://avatars.mds.yandex.net/i?id=d120e08b8252d3cb58e751b20dddfc9e_l-12520451-images-thumbs&n=13",
];

export const OrganiserPage: React.FC<Props> = ({ className }) => {
  return (
    <main
      className={cn(
        className,
        styles.AuthPage,
        "flex flex-col gap-6 pt-[20vh] pb-24 px-2"
      )}
    >
      <div className="flex flex-col gap-4">
        <div>
          <Avatar title="Ян топлес" subtitle="@smartguy" />

          <div className="flex w-full justify-around">
            <div className="font-geologica text-center">
              <h6 className="text-sm">35.4K</h6>
              <p className="text-white/50 text-xs">подписчиков</p>
            </div>

            <div className="font-geologica text-center">
              <h6 className="text-sm">224</h6>
              <p className="text-white/50 text-xs">постов</p>
            </div>
          </div>
        </div>

        <ExpandableText text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed imperdiet placerat neque, non viverra quam pellentesque nec." />

        <div className="flex overflow-auto gap-1 justify-around px-4">
          <Button className="bg-white text-black w-full h-full py-3 px-5 rounded-full font-geologica font-normal text-base">
            подписаться
          </Button>

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
        <h3 className="font-unbounded font-normal text-xl">
          ближайшие события
        </h3>
        <EventSlider />
      </section>

      <section className="flex flex-col gap-2">
        <TitleLink to="gallery" title="Галерея организатора" />
        <PhotoGalleryTemplate photos={samplePhotos} />
      </section>
    </main>
  );
};
