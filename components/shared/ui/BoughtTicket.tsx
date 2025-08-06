import Image from "next/image";
import { QrCode } from "lucide-react";

interface TicketProps {
  title: string;
  date: string;
  time: string;
  address: string;
  posterUrl: string;
  posterAlt: string;
  showQR?: boolean;
}

export function BoughtTicket({
  title,
  date,
  time,
  address,
  posterUrl,
  posterAlt,
  showQR = true,
}: TicketProps) {
  return (
    <div
      className="relative w-full"
      style={{
        maxWidth: "327px",
        height: "148px",
      }}
    >
      {/* Main ticket body */}
      <div className="relative w-full h-full rounded-2xl overflow-hidden p-2">
        {/* Glass gradient background */}
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          style={{
            background: `linear-gradient(to bottom, rgba(255,255,255,0.10) 75%, rgba(255,255,255,0.20) 75%)`,
          }}
        />

        {/* Decorative ticket holes */}
        <div className="absolute -left-4 top-3/4 transform -translate-y-1/2 w-6 h-6 bg-[#171717] rounded-full z-10"></div>
        <div className="absolute -right-4 top-3/4 transform -translate-y-1/2 w-6 h-6 bg-[#171717] rounded-full z-10"></div>

        {/* Content */}
        <div className="relative z-10 flex flex-col gap-2 h-full">
          {/* Poster */}
          <div className="relative z-10 flex gap-2 h-full">
            <div className="flex-shrink-0">
              <Image
                src={posterUrl || "/placeholder.svg"}
                alt={posterAlt}
                width={56}
                height={84}
                className="rounded-md object-cover"
              />
            </div>

            {/* Event details */}
            <div className="flex-1 flex flex-col pt-6 justify-between text-white">
              <div>
                <div className="text-xs flex items-center gap-[6px] font-medium font-geologica text-[#FFFFFF80] leading-none mb-1">
                  {date}{" "}
                  <div className="rounded-full bg-[#FFFFFF40] h-[3px] w-[3px]"></div>{" "}
                  {time}
                </div>
                <h2 className="text-sm font-bold leading-tight">{title}</h2>
              </div>
            </div>
          </div>

          {/* Address */}
          <p className="text-xs font-geologica text-white text-center mt-1">
            {address}
          </p>

          {/* QR Code */}
          {showQR && (
            <div className="absolute top-0 right-0">
              <div className="bg-[#FFFFFF30] p-2 rounded-full">
                <QrCode className="w-5 h-5 text-white" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
