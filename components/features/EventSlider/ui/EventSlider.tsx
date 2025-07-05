"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SliderItem } from "@/components/entities/SliderItem";

import "swiper/css";
// import styles from "./styles.module.scss";
import { EventCard } from "@/components/entities/SliderItem/ui/SliderItem";

interface Props {
  initialData: EventCard[];
  className?: string;
}

export const EventSliderClient: React.FC<Props> = ({
  initialData,
  className,
}) => {
  return (
    <div className={cn("overflow-auto w-full h-fit", className)}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={16}
        breakpoints={{
          0: {
            slidesPerView: 1.5, // немного видно второй слайд сбоку
          },
          380: {
            slidesPerView: 1.8,
          },
          425: {
            slidesPerView: 2,
          },
        }}
        loop
        autoplay={{
          delay: 3000,
          disableOnInteraction: true,
        }}
        onSlideChange={() => console.log("slide change")}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {initialData.map((event) => (
          <SwiperSlide key={event.id}>
            <SliderItem
              id={event.id}
              title={event.title}
              preview={event.preview}
              eventDate={event.eventDate}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
