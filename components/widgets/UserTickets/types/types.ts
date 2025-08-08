export interface CommunityGroupLocation {
  Community_Group_Location_id: {
    address_title: string;
  };
}

export interface Event {
  id: string;
  title: string;
  start_date: string;
  picture: string;
  community_group_location: CommunityGroupLocation[];
}

export interface TicketHistoryItem {
  event: {
    Event_id: Event;
  }[];
}
