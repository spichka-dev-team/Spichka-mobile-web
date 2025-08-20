import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
// import { Instagram, Share, ChevronRight } from "lucide-react";
import { CreatorType } from "@/components/shared/types/models";

import {
  Avatar,
  ExpandableText,
  // Button,
  TitleLink,
} from "@/components/shared/ui";
import { EventSlider } from "@/components/features";
import { PhotoGalleryTemplate } from "@/components/widgets";

interface Props {
  id: string;
  data: CreatorType;
}

// const titles = ["кто они", "история DJ Akee"];

export const OrganiserPage: React.FC<Props> = ({ id, data }) => {
  console.log(data, id);

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
            title={data.data.first_name + " " + data.data.last_name}
            photo={data.data.avatar}
            subtitle={data.data.title || "креатор медиа контента"}
          />

          {/* <div className="flex w-full justify-around">
            <div className="font-geologica text-center">
              <h6 className="text-sm">35.4K</h6>
              <p className="text-white/50 text-xs">подписчиков</p>
            </div>

            <div className="font-geologica text-center">
              <h6 className="text-sm">224</h6>
              <p className="text-white/50 text-xs">постов</p>
            </div>
          </div> */}
        </div>

        <ExpandableText text={data.data.description || "описание отсутсвует"} />

        {/* <div className="flex overflow-auto gap-1 justify-around px-4">
          <Button className="bg-white text-black w-full h-full py-3 px-5 rounded-full font-geologica font-normal text-base">
            подписаться
          </Button>

          <button className="p-[18px] bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
            <Share className="w-5 h-5" />
          </button>

              <button className="p-[18px] bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/90 transition-colors">
            <Instagram className="w-5 h-5" />
          </button>
        </div> */}
      </div>

      {/* <div className="flex flex-col w-full px-4 bg-[rgba(255,255,255,0.15)] rounded-2xl">
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
      </div> */}

      <section className="flex flex-col gap-4">
        <h3 className="font-unbounded font-normal text-xl">
          ближайшие события
        </h3>
        <EventSlider
          request={`items/Event`}
          filters={{
            filter: JSON.stringify({
              user_created: { _eq: id },
            }),
          }}
        />
      </section>

      <section className="flex flex-col gap-2">
        <TitleLink to="gallery" title="Галерея организатора" />
        <PhotoGalleryTemplate photos={data.data.gallery} />
      </section>
    </main>
  );
};
