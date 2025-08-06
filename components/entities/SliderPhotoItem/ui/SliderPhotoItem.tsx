import Image from "next/image";
import React from "react";

interface Props {
  uuid: string;
}

export const SliderPhotoItem: React.FC<Props> = ({ uuid }) => {
  return (
    <div className="w-full h-full overflow-hidden aspect-square rounded-2xl">
      <Image
        src={`/api/proxy/image?id=${uuid}`}
        alt="Slider photo"
        width={300}
        height={300}
        className="object-cover w-full h-full"
      />
    </div>
  );
};
