"use client";

import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngLiteral, Icon } from "leaflet";
import { MapPin } from "lucide-react";
import { renderToStaticMarkup } from "react-dom/server";
import "leaflet/dist/leaflet.css";

// fix your prop types to accept an array of locations
type MapLocation = LatLngLiteral & { id: string };

type MapProps = {
  center: LatLngLiteral;
  locations: MapLocation[];
};

const createLucideIcon = () =>
  new Icon({
    iconUrl: `data:image/svg+xml;base64,${btoa(
      renderToStaticMarkup(
        <MapPin size={32} color="#ff4d4f" strokeWidth={2.5} />
      )
    )}`,
    iconSize: [32, 32],
    iconAnchor: [16, 32], // точка "кончика" иконки
    className: "", // можно задать Tailwind-классы через svg, а не здесь
  });

export const OpenMap: React.FC<MapProps> = ({ center }) => {
  return (
    <div className="w-full h-full rounded-lg border border-[#868686] overflow-hidden">
      <MapContainer
        center={center}
        zoom={18}
        minZoom={10}
        zoomControl={false}
        attributionControl={false}
        className="w-full h-full"
      >
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        <Marker position={center} icon={createLucideIcon()} />
      </MapContainer>
    </div>
  );
};
