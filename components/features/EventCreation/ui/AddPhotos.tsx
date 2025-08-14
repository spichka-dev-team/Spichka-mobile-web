"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import { Card } from "@/components/shared/ui/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { SliderPhotoItem } from "@/components/entities/SliderPhotoItem";

interface PhotoSliderItem {
  id: number;
  Event_id: number;
  directus_files_id: string;
  localUrl?: string; // Added localUrl for local photo previews
}

interface AddPhotosProps {
  photos?: PhotoSliderItem[];
  onPhotosUpload: (files: FileList) => void;
  className?: string;
}

export const AddPhotos: React.FC<AddPhotosProps> = ({
  photos,
  onPhotosUpload,
  className = "",
}) => {
  const [slidesPerView, setSlidesPerView] = useState<number>(1);

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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      onPhotosUpload(e.target.files);
    }
  };

  // If no photos, show original upload interface
  if (!photos || photos.length === 0) {
    return (
      <Card
        className={`bg-[#3A3A3A] border-gray-700 w-44 overflow-hidden aspect-square rounded-2xl flex items-center justify-center relative ${className}`}
      >
        <label className="cursor-pointer flex items-center justify-center w-full h-full">
          <Plus className="w-12 h-12 text-gray-400" />
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileUpload}
            className="hidden"
          />
        </label>
      </Card>
    );
  }

  return (
    <div className={`overflow-auto w-full h-fit ${className}`}>
      <Swiper
        spaceBetween={8}
        slidesPerView={slidesPerView}
        autoplay={{ delay: 3000, disableOnInteraction: true }}
      >
        {photos.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="cursor-pointer">
              <SliderPhotoItem
                uuid={item.directus_files_id}
                localUrl={item.localUrl}
              />
            </div>
          </SwiperSlide>
        ))}

        {/* Add button as last slide */}
        <SwiperSlide>
          <Card className="bg-[#3A3A3A] border-gray-700 w-full h-full overflow-hidden aspect-square rounded-2xl flex items-center justify-center relative">
            <label className="cursor-pointer flex items-center justify-center w-full h-full">
              <Plus className="w-12 h-12 text-gray-400" />
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </Card>
        </SwiperSlide>
      </Swiper>
    </div>
  );
};
