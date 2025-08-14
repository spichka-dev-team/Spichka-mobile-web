"use client";

import React, { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { useDebounce } from "react-use";
import { Loader2 } from "lucide-react";

import {
  SearchEventCard,
  SearchCardProps,
} from "@/components/entities/SearchEventCard/ui/SearchEventCard";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { Button } from "@/components/shared/ui/button";
import axios from "axios";

interface Props {
  className?: string;
}

export const SearchPage: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<
    "ивенты" | "локации" | "креаторы"
  >("ивенты");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchCardProps[]>([]);

  useDebounce(() => setDebouncedSearch(searchQuery), 500, [searchQuery]);

  const fetchItems = async (
    searchTerm: string,
    filterType: typeof activeFilter
  ) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      let path = "";

      switch (filterType) {
        case "ивенты":
          path = "items/Event";
          break;
        case "локации":
          path = "items/Community_Group_Location";
          break;
        case "креаторы":
          path = "users";
          break;
      }

      const url = `/api/proxy/search?path=${encodeURIComponent(
        path
      )}&query=${encodeURIComponent(searchTerm.trim())}&limit=20`;
      const { data } = await axios.get(url);
      console.log(data);

      const mappedResults: SearchCardProps[] = (data?.data ?? []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => {
          switch (filterType) {
            case "ивенты":
              return {
                type: "event",
                id: item.id,
                image: item.picture, // как и раньше; если нужен превью — через ваш /api/proxy/image
                title: item.title,
                date: item.start_date
                  ? new Date(item.start_date).toLocaleDateString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                    })
                  : "",
                tag: item.tags?.[0] || "",
                link: `/event/${item.id}`,
              };

            case "локации":
              return {
                type: "location",
                id: item.id,
                // разные инсталляции могут хранить поле по-разному — оставим фолбэки
                image:
                  item.profile_picture || item.picture || item.image || null,
                title: item.name,
                subtitle: item.subtitle || item.description || "",
                address: item.address || "",
                link: `/location/${item.id}`,
              };

            case "креаторы":
              return {
                type: "creator",
                id: item.id,
                // у users обычно avatar, но часто расширяют баннером
                image: item.avatar || null,
                name: item.first_name + " " + item.last_name,
                description: `@${item.username}` || "",
                link: `/user/${item.id}`,
              };
          }
        }
      );

      setResults(mappedResults);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Произошла ошибка";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems(debouncedSearch, activeFilter);
  }, [debouncedSearch, activeFilter]);

  const filters: (typeof activeFilter)[] = ["ивенты", "локации", "креаторы"];

  return (
    <main className={cn("flex flex-col gap-6 pt-4 pb-24 px-2", className)}>
      <SearchInput searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      {/* Filter Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {filters.map((filter) => (
          <Button
            key={filter}
            variant={activeFilter === filter ? "default" : "secondary"}
            size="sm"
            className="rounded-full whitespace-nowrap"
            onClick={() => setActiveFilter(filter)}
          >
            {filter}
          </Button>
        ))}
      </div>

      {loading && (
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="ml-2">Поиск...</span>
        </div>
      )}

      {error && (
        <div className="text-center py-8 text-destructive">{error}</div>
      )}

      {!debouncedSearch && !loading && (
        <div className="text-center py-8 text-muted-foreground">
          Введите запрос для поиска
        </div>
      )}

      {results.length > 0 && (
        <div className="flex flex-col gap-4">
          {results.map((item) => (
            <SearchEventCard key={`${item.type}-${item.id}`} {...item} />
          ))}
        </div>
      )}
    </main>
  );
};
