import type React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import smartGuy from "@/public/images/smartguy.jpg";

interface AvatarProps {
  photo?: string;
  title: string;
  subtitle: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  imageClassName?: string;
  titleClassName?: string;
}

const sizeClasses = {
  sm: {
    container: "w-16 h-16",
    text: "text-sm",
  },
  md: {
    container: "w-24 h-24",
    text: "text-base",
  },
  lg: {
    container: "w-32 h-32",
    text: "text-lg",
  },
  xl: {
    container: "w-40 h-40",
    text: "text-xl",
  },
};

export const Avatar: React.FC<AvatarProps> = ({
  photo,
  title,
  subtitle,
  size = "lg",
  className,
  imageClassName,
  titleClassName,
}) => {
  const sizeConfig = sizeClasses[size];

  return (
    <div className={cn("flex flex-col items-center gap-4", className)}>
      {/* Circular Avatar Image */}
      <div
        className={cn(
          "relative rounded-full overflow-hidden border-2 border-white/10",
          sizeConfig.container,
          imageClassName
        )}
      >
        <Image
          src={`/api/proxy/image?id=${photo}` || smartGuy}
          alt={title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Title/Name */}
      <div className="text-center">
        <h3
          className={cn(
            "font-bold text-white text-center leading-tight",
            sizeConfig.text,
            titleClassName
          )}
        >
          {title}
        </h3>

        <h5 className="text-sm font-geologica text-white/70">{subtitle}</h5>
      </div>
    </div>
  );
};
