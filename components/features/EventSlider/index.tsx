import { EventSliderClient } from "./ui/EventSlider";
import axios from "axios";

export const EventSlider = async () => {
  const response = await axios.get("http://176.123.178.135:2516/api/events");
  const events = response.data;

  return <EventSliderClient initialData={events} />;
};
