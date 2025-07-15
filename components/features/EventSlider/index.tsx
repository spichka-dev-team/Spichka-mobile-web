import { EventSliderClient } from "./ui/EventSlider";
import axios from "axios";

export const EventSlider = async () => {
  const response = await axios.get("https://vencera.tech/spichka/api/events");
  const events = response.data;

  return <EventSliderClient initialData={events} />;
};
