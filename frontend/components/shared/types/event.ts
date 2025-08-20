export interface EventData {
  name: string;
  date: string;
  formattedDate: string;
  time: string;
  start_date: string;
  end_date: string;
  tags: string[];
  description: string;
  price: string;
  image: string | null;
  schedule?: ScheduleItem[];
  duration_hours?: string;
  community_group_location?: Array<{
    Community_Group_Location_id: string;
  }>;
  organizers?: Array<{
    Organizers_id: string;
  }>;
}

export interface TicketType {
  name: string;
  price: string;
}

export interface ScheduleItem {
  title: string;
  time: string;
}
