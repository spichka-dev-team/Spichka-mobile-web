export interface EventType {
  id?: number;
  title: string;
  description?: string;
  eventDate: string;
  price?: number;
  rating?: string;
  preview: string;
  location_id?: number;
}

export type ImageType = {
  type: "image";
  id: string;
  url: string;
};

export type ExtendedSliderItem = EventType | ImageType;
