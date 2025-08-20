import Image from "next/image";
import React from "react";

interface Props {
  uuid?: string;
  localUrl?: string; // Added support for local preview URLs
}

export const SliderPhotoItem: React.FC<Props> = ({ uuid, localUrl }) => {
  const photoUrl = localUrl || (uuid ? `/api/proxy/image?id=${uuid}` : null);

  return (
    <div className="w-full h-full overflow-hidden aspect-square rounded-2xl">
      <Image
        src={photoUrl || "/placeholder.svg?height=220&width=176"}
        alt="Slider photo"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
