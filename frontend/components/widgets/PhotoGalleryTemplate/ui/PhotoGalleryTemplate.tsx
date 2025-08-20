import type React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhotoGalleryTemplateProps {
  photos: {
    id: number;
    directus_files_id: string;
  }[];
}

export const PhotoGalleryTemplate: React.FC<PhotoGalleryTemplateProps> = ({
  photos,
}) => {
  const photoCount = Math.min(photos.length, 5);

  // Define styles directly in the component to avoid SCSS import issues
  const getGridStyles = (count: number, index: number) => {
    switch (count) {
      case 1:
        return "col-span-1 row-span-1";
      case 2:
        return "col-span-1 row-span-1";
      case 3:
        if (index === 0) return "col-span-2 row-span-1";
        return "col-span-1 row-span-1";
      case 4:
        return "col-span-1 row-span-1";
      case 5:
      default:
        // Original 5-photo layout
        if (index === 0) return "row-span-4";
        if (index === 1) return "col-span-2 row-span-2";
        if (index === 2) return "row-span-2 col-start-4";
        if (index === 3) return "row-span-2 col-start-2 row-start-3";
        if (index === 4) return "col-span-2 row-span-2 col-start-3 row-start-3";
        return "";
    }
  };

  const getParentGridClass = (count: number) => {
    switch (count) {
      case 1:
        return "grid-cols-1 grid-rows-1";
      case 2:
        return "grid-cols-2 grid-rows-1";
      case 3:
        return "grid-cols-2 grid-rows-2";
      case 4:
        return "grid-cols-2 grid-rows-2";
      case 5:
      default:
        return "grid-cols-4 grid-rows-4";
    }
  };

  return (
    <div
      className={cn(
        "h-64 p-2 bg-[rgba(255,255,255,0.15)] rounded-2xl grid gap-2",
        getParentGridClass(photoCount)
      )}
    >
      {photos.slice(0, 5).map((item, idx) => (
        <div
          key={item.id}
          className={cn(
            "relative rounded-2xl overflow-hidden",
            getGridStyles(photoCount, idx)
          )}
        >
          <Image
            src={`/api/proxy/image?id=${item.directus_files_id}`}
            alt={`Photo ${item.id}`}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
};
