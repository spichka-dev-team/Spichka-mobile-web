"use client";
import type React from "react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { SliderPhotoItem } from "@/components/entities";
import { FullscreenPhotoViewer } from "@/components/features/FullscreenPhotoViewer";
import "swiper/css";

interface PhotoSliderItem {
  id: number;
  Event_id: number;
  directus_files_id: string;
}

interface Props {
  initialData: PhotoSliderItem[];
}

export const PhotoSliderClient: React.FC<Props> = ({ initialData }) => {
  console.log("PhotoSliderClient: ", initialData);

  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

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

  const handlePhotoClick = (index: number) => {
    setCurrentPhotoIndex(index);
    setIsFullscreenOpen(true);
  };

  const handleCloseFullscreen = () => {
    setIsFullscreenOpen(false);
  };

  if (!initialData || initialData.length === 0) {
    return <div className={cn("text-center")}>No photos available</div>;
  }

  return (
    <>
      <div className={cn("overflow-auto w-full h-fit")}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={8}
          slidesPerView={slidesPerView}
          autoplay={{ delay: 3000, disableOnInteraction: true }}
        >
          {initialData.map((item, index) => (
            <SwiperSlide key={item.id}>
              <div
                onClick={() => handlePhotoClick(index)}
                className="cursor-pointer"
              >
                <SliderPhotoItem uuid={item.directus_files_id} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {isFullscreenOpen && (
        <FullscreenPhotoViewer
          photos={initialData}
          initialIndex={currentPhotoIndex}
          onClose={handleCloseFullscreen}
        />
      )}
    </>
  );
};
