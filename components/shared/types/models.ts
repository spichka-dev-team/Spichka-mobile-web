export type EventCardType = {
  id: number;
  title: string;
  description?: string;
  price?: number;
  start_date: string;
  endDate?: string;
  createdAt?: string | null;
  updatedAt?: string | null;
  deletedAt?: string | null;
  picture: string;
  tags?: string[];
};

export interface EventType {
  id?: number;
  title: string;
  description?: string;
  start_date: string;
  price?: number;
  picture: string;
  location_id: number;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  location?: LocationType;
  eventImages: EventImageType[];
  tags: string[];
  schedule: ScheduleItem[];
  duration_hours?: string;
}

export type BannerType = {
  id: number;
  status: "pending" | "published" | "archived";
  end_date: string;
  priority: "main" | "secondary" | "low";
  picture: string;
  created_date: string;
};

export type LocationType = {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  address: string;
  banner_picture: string;
  profile_picture: string;
  type: string;

  creators: number[];
  links: number[];
  tags: string[];

  date_created: string;
  date_updated: string;

  map_location: {
    type: "Point";
    coordinates: [number, number];
  };
};

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
  avatar: string;
  email: string;
  username: string;
  first_name: string;
  last_name: string;
  description: string | null;
  userType: number;
  createdAt: string | null;
  updatedAt: string | null;
  deletedAt: string | null;
};

export type ScheduleItem = {
  title: string;
  time: string;
};

// ----------------------------------------------------------------------------
export type Location = {
  id: number;
  date_created: string;
  date_updated: string;
  name: string;
  subtitle: string;
  description: string;
  profile_picture: string;
  banner_picture: string;
  address: string;
  tags: string[];
  map_location: {
    coordinates: [number, number];
    type: "Point";
  };
  links: number[];
  creators: number[];
  gallery: number[];
};

export type Creator = {
  id: number;
  date_created: string;
  date_updated: string;
  user_id: number;
  bio: string;
  phone_number: string;
  verification_status: number;
  banner_picture: string;
  deleted_at: string | null;
  test: string | null;
  links: number[];
  gallery: number[];
};

export type Event = {
  id: string;
  status: "UNVERIFIED" | "VERIFIED" | string;
  sort: number | null;
  user_created: string;
  date_created: string; // ISO date
  user_updated: string;
  date_updated: string;
  title: string;
  start_date: string;
  end_date: string;
  schedule: {
    title: string;
    time: string; // ISO date
  }[];
  duration_hours: string;
  price: number;
  event_publish_status: "DRAFT" | "PUBLISHED" | string;
  picture: string;
  tags: string[];
  description: string;
  community_group_location: {
    id: number;
    Event_id: string;
    Community_Group_Location_id: string;
  }[];
  organizers: number[]; // could be expanded into array of objects if needed
  community_group: {
    id: number;
    Event_id: string;
    Community_Group_id: string;
  }[];
  tickets_types: number[];
  gallery: number[];
};
