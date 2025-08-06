"use client";

import React from "react";
import { Card } from "@/components/shared/ui/Card";
import { Calendar, MapPin } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

// Обобщённые пропсы для карточки
export type SearchCardProps =
  | {
      type: "event";
      id: number;
      image: string;
      title: string;
      date: string; // форматированная дата
      tag: string;
      link: string;
    }
  | {
      type: "location";
      id: number;
      image: string;
      title: string;
      subtitle: string;
      address: string;
      link: string;
    }
  | {
      type: "creator";
      id: number;
      image: string;
      description: string;
      link: string;
    };

export const SearchEventCard: React.FC<SearchCardProps> = (props) => {
  return (
    <Card className="bg-white-glass border-none rounded-2xl overflow-hidden hover:bg-muted/50 transition-colors">
      <Link href={props.link}>
        <div className="flex items-center px-4 gap-4">
          {/* Изображение */}
          <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-muted flex-shrink-0">
            <Image
              src={`/api/proxy/image?id=${props.image}`}
              alt={"title" in props && props.title ? props.title : ""}
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Контент */}
          <div className="flex-1 space-y-1 min-w-0 py-4">
            {props.type === "event" && (
              <>
                <h3 className="font-unbounded font-medium text-xl text-white truncate">
                  {props.title}
                </h3>
                <div className="font-geologica text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    <span>{props.tag}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{props.date}</span>
                  </div>
                </div>
              </>
            )}

            {props.type === "location" && (
              <>
                <h3 className="font-unbounded font-medium text-xl text-white truncate">
                  {props.title}
                </h3>
                <p className="font-geologica text-sm text-muted-foreground truncate">
                  {props.subtitle}
                </p>
                <p className="font-geologica text-sm text-muted-foreground truncate">
                  {props.address}
                </p>
              </>
            )}

            {props.type === "creator" && (
              <>
                <p className="font-geologica text-sm text-muted-foreground truncate">
                  {props.description}
                </p>
              </>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
};
