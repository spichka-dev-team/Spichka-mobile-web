"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

interface BannerImage {
  id: string;
  image: string;
  alt?: string;
}

interface Props {
  images?: BannerImage[];
  className?: string;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

// Демо данные
const demoImages: BannerImage[] = [
  {
    id: "1",
    image:
      "https://avatars.mds.yandex.net/i?id=e8c23592acac95192a88639d510e5306_l-10696063-images-thumbs&n=13",
    alt: "Баннер 1",
  },
  {
    id: "2",
    image:
      "https://i.pinimg.com/736x/3e/a4/d8/3ea4d828a5d54cb1e7c810e35edf916a.jpg",
    alt: "Баннер 2",
  },
  {
    id: "3",
    image:
      "https://wallpapers.com/images/hd/2560x1080-minimal-s7bsg9ojsemlisoz.jpg",
    alt: "Баннер 3",
  },
];

export const BannerSliderClient: React.FC<Props> = ({
  images = demoImages,
  className,
  autoplay = true,
  showNavigation = true,
}) => {
  return (
    <div className={cn("relative w-full", className)}>
      {/* Контейнер с соотношением сторон 21:9 */}
      <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={images.length > 1}
          autoplay={
            autoplay
              ? {
                  delay: 4000,
                  disableOnInteraction: false,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next-custom",
                  prevEl: ".swiper-button-prev-custom",
                }
              : false
          }
          className="w-full h-full rounded-lg overflow-hidden"
        >
          {images.map((banner) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <Image
                  src={banner.image || "/placeholder.svg"}
                  fill
                  alt={banner.alt || "Баннер"}
                  className="w-full h-full object-cover"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Навигация */}
        {showNavigation && images.length > 1 && (
          <>
            <button className="swiper-button-prev-custom absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 group">
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button className="swiper-button-next-custom absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-black/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/50 transition-all duration-300 group">
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default BannerSliderClient;
