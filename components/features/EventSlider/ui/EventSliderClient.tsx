"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SliderItem } from "@/components/entities";

import "swiper/css";
import { EventCardType } from "@/components/shared/types/models";

interface Props {
  initialData: EventCardType[];
  className?: string;
}

export const EventSliderClient: React.FC<Props> = ({
  initialData,
  className,
}) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  console.log(initialData);

  const calculateSlides = (width: number) => {
    const containerPadding = 8 * 2;
    const spaceBetween = 8;
    const slideWidth = 176;

    const available = width - containerPadding;
    const count = (available + spaceBetween) / (slideWidth + spaceBetween);
    return Math.max(1, count);
  };

  useEffect(() => {
    const onResize = () => {
      setSlidesPerView(calculateSlides(window.innerWidth));
    };

    onResize();

    // дебаунс
    let tid: NodeJS.Timeout;
    window.addEventListener("resize", () => {
      clearTimeout(tid);
      tid = setTimeout(onResize, 100);
    });
    return () => {
      clearTimeout(tid);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className={cn("overflow-auto w-full h-fit", className)}>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={8}
        slidesPerView={slidesPerView}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        {initialData.map((item) => (
          <SwiperSlide key={item.id}>
            {
              <SliderItem
                id={item.id}
                title={item.title}
                picture={item.picture}
                start_date={item.start_date}
              />
            }
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
