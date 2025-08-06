"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { BannerType } from "@/components/shared/types/models";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

interface Props {
  images?: BannerType[];
  className?: string;
  autoplay?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

export const BannerSliderClient: React.FC<Props> = ({
  className,
  autoplay = true,
  showNavigation = true,
}) => {
  const [data, setData] = useState<BannerType[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        console.log("Fetching banners from:", `${apiUrl}/Banner`);
        const response = await axios.get(`${apiUrl}/items/Banner`);
        console.log(response.data);
        setData(response.data.data);
      } catch (error) {
        console.error("Ошибка при получении событий:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!data) return null;

  return (
    <div className={cn("relative w-full", className)}>
      {/* Контейнер с соотношением сторон 21:9 */}
      <div className="relative w-full" style={{ aspectRatio: "21/9" }}>
        <Swiper
          modules={[Autoplay, Navigation, Pagination]}
          spaceBetween={0}
          slidesPerView={1}
          loop={data.length > 1}
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
          {data.map((banner: BannerType) => (
            <SwiperSlide key={banner.id}>
              <div className="relative w-full h-full">
                <Link href={`event/${banner.id}`}>
                  <Image
                    src={
                      `https://d.vencera.tech/assets/${banner.picture}` ||
                      "/placeholder.svg"
                    }
                    fill
                    alt={banner.status || "Баннер"}
                    className="w-full h-full object-cover"
                  />
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Навигация */}
        {showNavigation && data.length > 1 && (
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
