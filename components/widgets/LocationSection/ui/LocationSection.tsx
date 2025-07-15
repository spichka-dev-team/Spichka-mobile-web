"use client";

import type { LocationType } from "@/components/shared/types/models";
import dynamic from "next/dynamic";
import type { LatLngLiteral } from "leaflet";
import { Button } from "@/components/shared/ui";

const OpenMap = dynamic(
  () => import("@/components/features/OpenMap").then((mod) => mod.default),
  { ssr: false }
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
      <div className="flex justify-between gap-4">
        {/* Левая часть: значок и заголовок */}
        <div className="flex flex-col gap-6 justify-between text-white w-1/2">
          <div className="flex flex-col gap-2">
            <h4 className="font-geologica font-bold text-base">
              {location.name}
            </h4>
            <span className="text-xs text-white/80 font-geologica font-medium">
              социально-культурное пространство
            </span>

            <span className="text-xs text-white/80 font-geologica font-medium whitespace-nowrap">
              {location.address}
            </span>
          </div>

          <Button className="bg-white text-black py-6 px-6 rounded-full font-geologica font-medium text-sm">
            узнать больше
          </Button>
        </div>

        {/* Карта справа */}
        <div className="w-1/2 aspect-square rounded overflow-hidden">
          <OpenMap center={center} locations={markers} />
        </div>
      </div>
    </div>
  );
};
