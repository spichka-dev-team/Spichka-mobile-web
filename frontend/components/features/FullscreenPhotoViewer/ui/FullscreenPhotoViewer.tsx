"use client";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { X } from "lucide-react";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import type { Swiper as SwiperType } from "swiper";

interface PhotoSliderItem {
  id: number;
  Event_id: number;
  directus_files_id: string;
}

interface Props {
  photos: PhotoSliderItem[];
  initialIndex: number;
  onClose: () => void;
}

export const FullscreenPhotoViewer: React.FC<Props> = ({
  photos,
  initialIndex,
  onClose,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const preventScroll = (e: TouchEvent) => {
    // Проверяем, происходит ли событие внутри модального окна
    if (overlayRef.current && overlayRef.current.contains(e.target as Node)) {
      // Если событие внутри модального окна, разрешаем скролл
      return;
    }
    // Если событие вне модального окна, блокируем скролл
    e.preventDefault();
  };

  useEffect(() => {
    // Сохраняем текущую позицию скролла
    const scrollY = window.scrollY;

    // Блокируем скролл для body
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.left = "0";
    document.body.style.right = "0";
    document.body.style.width = "100%";

    // Предотвращаем touch события только вне модального окна
    document.addEventListener("touchmove", preventScroll, { passive: false });

    return () => {
      const scrollY = document.body.style.top;
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";

      // Восстанавливаем позицию скролла
      if (scrollY) {
        window.scrollTo(0, Number.parseInt(scrollY || "0") * -1);
      }

      // Удаляем обработчик touch событий
      document.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(initialIndex, 0);
    }
  }, [initialIndex]);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    }
    if (e.key === "ArrowLeft" && swiperRef.current) {
      swiperRef.current.slidePrev();
    }
    if (e.key === "ArrowRight" && swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center"
    >
      {/* Кнопка закрытия */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
        aria-label="Закрыть"
      >
        <X size={32} />
      </button>

      <div className="w-full h-full flex items-center justify-center">
        <Swiper
          modules={[Navigation]}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          navigation={{
            nextEl: ".swiper-button-next-custom",
            prevEl: ".swiper-button-prev-custom",
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            // Переходим к нужному слайду после инициализации
            setTimeout(() => {
              swiper.slideTo(initialIndex, 0);
            }, 0);
          }}
          onSlideChange={(swiper) => {
            setCurrentIndex(swiper.realIndex);
          }}
          className="w-full h-full"
        >
          {photos.map((photo) => (
            <SwiperSlide
              key={photo.id}
              className="flex items-center justify-center"
            >
              <div className="relative w-full h-full flex items-center justify-center p-4">
                <Image
                  src={
                    `/api/proxy/image?id=${photo.directus_files_id}` ||
                    "/placeholder.svg"
                  }
                  alt={`Photo ${photo.id}`}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <button className="swiper-button-prev-custom absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="15,18 9,12 15,6"></polyline>
          </svg>
        </button>

        <button className="swiper-button-next-custom absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <polyline points="9,18 15,12 9,6"></polyline>
          </svg>
        </button>
      </div>

      {/* Индикатор текущего фото */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm">
        {photos.length > 1 && (
          <span>
            {(currentIndex % photos.length) + 1} / {photos.length}
          </span>
        )}
      </div>
    </div>
  );
};
