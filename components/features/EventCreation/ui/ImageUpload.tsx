"use client";

import type React from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import { Card } from "@/components/shared/ui/Card";

interface ImageUploadProps {
  image: string | null;
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  image,
  onImageUpload,
  className = "",
}) => {
  return (
    <Card
      className={`bg-[#3A3A3A] border-gray-700 aspect-[4/5] flex items-center justify-center relative overflow-hidden ${className}`}
    >
      {image ? (
        <Image
          src={image || "/placeholder.svg"}
          width={300}
          height={375}
          alt="Event preview"
          className="w-full h-full object-cover"
        />
      ) : (
        <label className="cursor-pointer flex items-center justify-center w-full h-full">
          <Plus className="w-12 h-12 text-gray-400" />
          <input
            type="file"
            accept="image/*"
            onChange={onImageUpload}
            className="hidden"
          />
        </label>
      )}
    </Card>
  );
};
