"use client";

import dynamic from "next/dynamic";
// import OpenMap from "@/components/features/OpenMap";

const PhotoSliderClient = dynamic(
  () => import("./PhotoSlider").then((mod) => mod.PhotoSliderClient),
  {
    ssr: false,
    loading: () => (
      <div className="flex gap-2 overflow-hidden">
        <div className="w-44 h-44 bg-gray-100 animate-pulse rounded-lg border border-[#868686]" />
        <div className="w-44 h-44 bg-gray-100 animate-pulse rounded-lg border border-[#868686]" />
        <div className="w-44 h-44 bg-gray-100 animate-pulse rounded-lg border border-[#868686]" />
        <div className="w-44 h-44 bg-gray-100 animate-pulse rounded-lg border border-[#868686]" />
      </div>
    ),
  }
);

interface PhotoSliderItem {
  id: number;
  Event_id: number;
  directus_files_id: string;
}

interface Props {
  initialData: PhotoSliderItem[];
}

export const PhotoSliderWrapper: React.FC<Props> = ({ initialData }) => {
  return <PhotoSliderClient initialData={initialData} />;
};
