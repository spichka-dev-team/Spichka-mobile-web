"use client";
import type React from "react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { FullscreenPhotoViewer } from "@/components/features";

interface GalleryItem {
  id: number;
  Community_Group_Location_id: string;
  directus_files_id: string;
}

interface GalleryData {
  gallery: GalleryItem[];
}

interface Props {
  initialData: GalleryData;
}

export const GalleryPage: React.FC<Props> = ({ initialData }) => {
  const galleryItems = initialData?.gallery || [];
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(
    null
  );

  const photoSliderItems = galleryItems.map((item) => ({
    id: item.id,
    Event_id: 0, // Using 0 as default since we don't have Event_id in gallery items
    directus_files_id: item.directus_files_id,
  }));

  const handlePhotoClick = (index: number) => {
    setSelectedPhotoIndex(index);
  };

  const handleCloseViewer = () => {
    setSelectedPhotoIndex(null);
  };

  if (!galleryItems.length) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">No images found in this gallery</p>
      </main>
    );
  }

  return (
    <main className={cn("min-h-screen bg-background p-4")}>
      <div className="py-20 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-1 md:gap-2">
          {galleryItems.map((item, index) => (
            <div
              key={item.directus_files_id}
              className="aspect-square relative overflow-hidden bg-muted rounded-sm cursor-pointer"
              onClick={() => handlePhotoClick(index)}
            >
              <Image
                src={`/api/proxy/image?id=${item.directus_files_id}`}
                alt={`Gallery image ${index + 1}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-200"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              />
            </div>
          ))}
        </div>
      </div>

      {selectedPhotoIndex !== null && (
        <FullscreenPhotoViewer
          photos={photoSliderItems}
          initialIndex={selectedPhotoIndex}
          onClose={handleCloseViewer}
        />
      )}
    </main>
  );
};
