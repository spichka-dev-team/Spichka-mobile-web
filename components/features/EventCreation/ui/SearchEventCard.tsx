"use client";

import type React from "react";
import { MapPin } from "lucide-react";
import { Card } from "@/components/shared/ui/Card";

export interface SearchCardProps {
  type: "event" | "location" | "creator";
  id: string | number;
  image?: string | null;
  title?: string;
  subtitle?: string;
  address?: string;
  date?: string;
  tag?: string;
  description?: string;
  link?: string;
  onClick?: () => void;
}

export const SearchEventCard: React.FC<SearchCardProps> = ({
  type,
  image,
  title,
  subtitle,
  address,
  date,
  tag,
  description,
  onClick,
}) => {
  return (
    <Card
      className="p-4 cursor-pointer hover:bg-accent/50 transition-colors"
      onClick={onClick}
    >
      <div className="flex gap-3">
        {image && (
          <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src={`/api/proxy/image?id=${image}` || "/placeholder.svg"}
              alt={title || ""}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="flex-1 min-w-0">
          {title && <h3 className="font-semibold text-sm truncate">{title}</h3>}

          {type === "location" && (
            <>
              {subtitle && (
                <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                  {subtitle}
                </p>
              )}
              {address && (
                <div className="flex items-center gap-1 mt-2">
                  <MapPin className="h-3 w-3 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground truncate">
                    {address}
                  </span>
                </div>
              )}
            </>
          )}

          {type === "event" && (
            <>
              {date && (
                <p className="text-xs text-muted-foreground mt-1">{date}</p>
              )}
              {tag && (
                <span className="inline-block bg-primary/10 text-primary text-xs px-2 py-1 rounded-full mt-2">
                  {tag}
                </span>
              )}
            </>
          )}

          {type === "creator" && description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {description}
            </p>
          )}
        </div>
      </div>
    </Card>
  );
};
