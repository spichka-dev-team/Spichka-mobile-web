import React from "react";
import { cn } from "@/lib/utils";

import { AvatarSkeleton } from "@/components/shared/ui";

export const LocationPageSkeleton: React.FC = () => {
  const pulseAnimation = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  };

  return (
    <main
      className={cn("flex flex-col items-center gap-6 pt-[20vh] pb-24 px-2")}
    >
      <div className="flex flex-col gap-4">
        <AvatarSkeleton />
      </div>

      <div
        style={{
          backgroundColor: "#d1d5db",
          borderRadius: "0.25rem",
          width: "50%",
          height: "1rem",
          ...pulseAnimation,
        }}
      />

      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "70%",
          display: "flex",
          flexDirection: "column",
          gap: "0.5rem",
        }}
      >
        <div
          style={{
            height: "1rem",
            backgroundColor: "#d1d5db",
            borderRadius: "0.25rem",
            width: "100%",
            ...pulseAnimation,
          }}
        />
        <div
          style={{
            height: "1rem",
            backgroundColor: "#d1d5db",
            borderRadius: "0.25rem",
            width: "100%",
            ...pulseAnimation,
          }}
        />
        <div
          style={{
            height: "1rem",
            backgroundColor: "#d1d5db",
            borderRadius: "0.25rem",
            width: "83.333333%",
            ...pulseAnimation,
          }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-2 w-full">
        <div
          style={{
            height: "40px",
            backgroundColor: "#d1d5db",
            borderRadius: "32px",
            width: "100px",
            ...pulseAnimation,
          }}
        />

        <div
          style={{
            height: "40px",
            backgroundColor: "#d1d5db",
            borderRadius: "32px",
            width: "70px",
            ...pulseAnimation,
          }}
        />
        <div
          style={{
            height: "40px",
            backgroundColor: "#d1d5db",
            borderRadius: "32px",
            width: "135px",
            ...pulseAnimation,
          }}
        />
        <div
          style={{
            height: "40px",
            backgroundColor: "#d1d5db",
            borderRadius: "32px",
            width: "150px",
            ...pulseAnimation,
          }}
        />
        <div
          style={{
            height: "40px",
            backgroundColor: "#d1d5db",
            borderRadius: "32px",
            width: "135px",
            ...pulseAnimation,
          }}
        />
      </div>
    </main>
  );
};
