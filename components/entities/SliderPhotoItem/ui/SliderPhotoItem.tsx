import Image from "next/image";
import React from "react";

interface Props {
  url: string;
}

export const SliderPhotoItem: React.FC<Props> = ({ url }) => {
  return (
    <div className="w-full h-full overflow-hidden aspect-square rounded-2xl">
      <Image
        src={url}
        alt="Slider photo"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
