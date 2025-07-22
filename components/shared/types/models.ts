export type EventCardType = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  startDate: string;
  endDate?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  photo_url: string;
  tags?: TagType[];
};

export interface EventType {
  id?: number;
  title: string;
  description?: string;
  startDate: string;
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
  description: string | undefined;
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

export type ProfilePageType = {
  id: number;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string | null;
  userType: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type TagType = {
  id: number;
  name: string;
  created_at: string;
  type: "chips" | "hot";
};
