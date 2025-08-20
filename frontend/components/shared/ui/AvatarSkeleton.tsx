import type React from "react";
import { cn } from "@/lib/utils";

interface AvatarSkeletonProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
}

export const AvatarSkeleton: React.FC<AvatarSkeletonProps> = ({
  size = "lg",
  className,
  imageClassName,
  titleClassName,
}) => {
  const pulseAnimation = {
    animation: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
  };

  const sizeConfig = {
    sm: {
      image: { width: "4rem", height: "4rem" },
      title: { width: "5rem", height: "1rem" },
      subtitle: { width: "4rem", height: "1rem" },
    },
    md: {
      image: { width: "6rem", height: "6rem" },
      title: { width: "7rem", height: "1.25rem" },
      subtitle: { width: "6rem", height: "1rem" },
    },
    lg: {
      image: { width: "8rem", height: "8rem" },
      title: { width: "9rem", height: "1.5rem" },
      subtitle: { width: "8rem", height: "1rem" },
    },
    xl: {
      image: { width: "10rem", height: "10rem" },
      title: { width: "11rem", height: "1.75rem" },
      subtitle: { width: "10rem", height: "1rem" },
    },
  };

  const currentSize = sizeConfig[size];

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>

      <div
        className={cn(className)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        {/* Circular Avatar Image Skeleton */}
        <div
          className={cn(imageClassName)}
          style={{
            position: "relative",
            borderRadius: "50%",
            border: "2px solid rgba(255, 255, 255, 0.1)",
            backgroundColor: "#d1d5db",
            width: currentSize.image.width,
            height: currentSize.image.height,
            ...pulseAnimation,
          }}
        />

        {/* Title/Name Skeleton */}
        <div
          style={{
            textAlign: "center",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <div
            className={cn(titleClassName)}
            style={{
              backgroundColor: "#d1d5db",
              borderRadius: "0.25rem",
              width: currentSize.title.width,
              height: currentSize.title.height,
              ...pulseAnimation,
            }}
          />
          <div
            style={{
              backgroundColor: "rgba(209, 213, 219, 0.7)",
              borderRadius: "0.25rem",
              width: currentSize.subtitle.width,
              height: currentSize.subtitle.height,
              ...pulseAnimation,
            }}
          />
        </div>
      </div>
    </>
  );
};
