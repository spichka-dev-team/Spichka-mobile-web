"use client";

import React from "react";
import { cn } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SliderItem, SliderPhotoItem } from "@/components/entities";

import "swiper/css";
// import styles from "./styles.module.scss";
import { ExtendedSliderItem } from "@/components/shared/types/models";

interface Props {
  initialData: ExtendedSliderItem[];
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
          370: {
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
      >
        {initialData.map((item) => (
          <SwiperSlide key={item.id}>
            {"eventDate" in item ? (
              <SliderItem
                id={item.id}
                title={item.title}
                preview={item.preview}
                eventDate={item.eventDate}
              />
            ) : (
              <SliderPhotoItem url={item.url} />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
