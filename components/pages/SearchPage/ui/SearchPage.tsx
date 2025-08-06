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
      let resource = "";
      let filter: object = {};

      switch (filterType) {
        case "ивенты":
          resource = "Event";
          filter = {
            _or: [{ title: { _icontains: searchTerm.trim() } }],
          };
          break;
        case "локации":
          resource = "Community_Group";
          filter = {
            _or: [{ name: { _icontains: searchTerm.trim() } }],
          };
          break;
        case "креаторы":
          resource = "Creator";
          filter = {
            _or: [{ bio: { _icontains: searchTerm.trim() } }],
          };
          break;
      }

      const url = `/api/proxy/search?path=items/${resource}&filter=${encodeURIComponent(
        JSON.stringify(filter)
      )}`;
      console.log("обращаемся к:" + url);
      const response = (await axios.get(url)).data;

      const data = await response;
      console.log(data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const mappedResults: SearchCardProps[] = data.data.map((item: any) => {
        switch (filterType) {
          case "ивенты":
            return {
              type: "event",
              id: item.id,
              image: item.picture,
              title: item.title,
              date: new Date(item.start_date).toLocaleDateString("ru-RU", {
                day: "2-digit",
                month: "long",
              }),
              tag: item.tags?.[0] || "",
              link: `/event/${item.id}`,
            };
          case "локации":
            return {
              type: "location",
              id: item.id,
              image: item.profile_picture,
              title: item.name,
              subtitle: item.subtitle || "",
              address: item.address || "",
              link: `/location/${item.id}`,
            };
          case "креаторы":
            return {
              type: "creator",
              id: item.id,
              image: item.banner_picture,
              description: item.bio,
              link: `/creator/${item.id}`,
            };
        }
      });

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
