"use client";

import type { LocationType } from "@/components/shared/types/models";
import Link from "next/link";
import type { LatLngLiteral } from "leaflet";
import { Button } from "@/components/shared/ui";
import dynamic from "next/dynamic";
// import OpenMap from "@/components/features/OpenMap";

const OpenMap = dynamic(
  () => import("@/components/features/OpenMap").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-gray-100 animate-pulse rounded-lg border border-[#868686]" />
    ),
  }
);

export const LocationSection = ({ location }: { location?: LocationType }) => {
  // Если локации нет — можно вернуть null или заглушку
  if (!location) {
    return (
      <div className="w-full bg-white/20 backdrop-blur-sm p-4 rounded-lg text-center text-white">
        Локация не указана
      </div>
    );
  }

  // Собираем center и список меток
  const center: LatLngLiteral = {
    lat: location.latitude,
    lng: location.longitude,
  };

  const markers: Array<LatLngLiteral & { id: string }> = [
    {
      ...center,
      id: String(location.id),
    },
  ];

  return (
    <div className="w-full bg-white/20 backdrop-blur-sm p-4 rounded-lg">
      <div className="flex flex-col sm:flex-row justify-between gap-4 min-h-[200px]">
        {/* Левая часть: значок и заголовок */}
        <div className="flex flex-col gap-6 justify-between text-white sm:w-1/2 min-w-0">
          <div className="flex flex-col gap-2">
            <h4 className="font-geologica font-bold text-base break-words">
              {location.name}
            </h4>
            <span className="text-xs text-white/80 font-geologica font-medium break-words">
              {location.description}
            </span>
            <span className="text-xs text-white/80 font-geologica font-medium break-words">
              {location.address}
            </span>
          </div>
          <Button className="hidden sm:visible bg-white text-black py-6 px-6 rounded-full font-geologica font-medium text-sm w-fit">
            <Link href={`/location/${location.id}`}>узнать больше</Link>
          </Button>
        </div>

        {/* Карта справа */}
        <div className="sm:w-1/2 h-[200px] md:h-auto md:min-h-[200px] rounded overflow-hidden">
          <OpenMap center={center} locations={markers} />
        </div>

        <Button className="sm:hidden bg-white text-black py-6 px-6 rounded-full font-geologica font-medium text-sm w-fit">
          <Link href={`/location/${location.id}`}>узнать больше</Link>
        </Button>
      </div>
    </div>
  );
};
