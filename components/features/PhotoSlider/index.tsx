import axios from "axios";
import { PhotoSliderWrapper } from "./ui/PhotoSliderWrapper";

import React from "react";

interface Props {
  className?: string;
}

export const PhotoSlider: React.FC<Props> = async ({ className }) => {
  const { data: photos } = await axios.get(
    `https://671e15491dfc429919813dc2.mockapi.io/reactpizza/items`
  );
  console.log(photos);

  return <PhotoSliderWrapper initialData={photos} className={className} />;
};
