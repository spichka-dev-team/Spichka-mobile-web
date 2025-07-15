export interface EventType {
  id?: number;
  title: string;
  description?: string;
  eventDate: string; // ISO-строка даты
  price?: number;
  rating?: string;
  preview: string;
  location_id: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  location?: LocationType;
  eventImages: EventImageType[];
  hotTags: string[];
  chipsTags: string[];
}

export interface LocationType {
  id: number;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface EventImageType {
  id: number;
  url: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
  eventId: number;
}

export type ExtendedSliderItem = EventType | EventImageType;
