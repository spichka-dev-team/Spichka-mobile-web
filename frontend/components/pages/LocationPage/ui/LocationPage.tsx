import React from "react";
import { cn } from "@/lib/utils";
import styles from "./styles.module.scss";
import { MapPinned } from "lucide-react";

import { Avatar, ExpandableText, TitleLink } from "@/components/shared/ui";
import { ChipTag } from "@/components/entities/ChipTag";
import { LocationType } from "@/components/shared/types/models";
import { EventSlider } from "@/components/features";
import { PhotoGalleryTemplate } from "@/components/widgets";

interface Props {
  id: string;
  initialData: LocationType;
}

export const LocationPage: React.FC<Props> = async ({ initialData }) => {
  console.log(initialData);

  const gradientColor = "hsl(var(--background))";

  const bannerStyle = initialData.banner_picture
    ? {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, ${gradientColor} 100%), url(/api/proxy/image?id=${initialData.banner_picture})`,
      }
    : {
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.3) 50%, ${gradientColor} 100%)`,
      };

  return (
    <main className={cn(styles.AuthPage, styles.locationPage, "flex flex-col")}>
      <section className={styles.bannerSection} style={bannerStyle}>
        <div className={styles.bannerContent}>
          <Avatar
            photo={initialData.profile_picture}
            title={initialData.name}
            subtitle="социально-культурное пространство"
          />
        </div>
      </section>

      <div className="flex flex-col gap-6 px-2 py-6">
        <div className="flex flex-col gap-4">
          <ExpandableText text={initialData.description} />

          <div className="flex flex-wrap justify-center gap-2 w-full">
            {initialData.tags.map((item, idx) => (
              <ChipTag
                className="bg-white/10 backdrop-blur-sm lowercase"
                key={item + idx}
                title={item}
              />
            ))}
          </div>
        </div>

        <div className="flex w-full justify-center">
          <div className="flex items-center gap-2 font-geologica text-center">
            <MapPinned className="h-4 w-4" />{" "}
            <h6 className="text-sm">{initialData.address_title}</h6>
          </div>
        </div>

        <section className="flex flex-col gap-4">
          <h3 className="font-unbounded font-normal text-xl">афиша</h3>
          <EventSlider request="items/Event" />
        </section>

        <section className="flex flex-col gap-2">
          <TitleLink to="gallery" title="Галерея организатора" />
          <PhotoGalleryTemplate photos={initialData.gallery} />
        </section>
      </div>
    </main>
  );
};
