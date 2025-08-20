"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { useDebounce } from "react-use";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { SearchInput } from "@/components/shared/ui/SearchInput";
import { SearchEventCard, type SearchCardProps } from "./SearchEventCard";

type AddLocationProps = {
  onLocationSelect?: (locationId: string) => void; // Added onLocationSelect prop
};

interface LocationData {
  id: string | number;
  name: string;
  subtitle?: string;
  address?: string;
  image?: string | null;
}

export const AddLocation: React.FC<AddLocationProps> = ({
  onLocationSelect,
}) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<SearchCardProps[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(
    null
  );

  useDebounce(() => setDebouncedSearch(searchQuery), 500, [searchQuery]);

  const fetchLocations = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const path = "items/Community_Group_Location";
      const url = `/api/proxy/search?path=${encodeURIComponent(
        path
      )}&query=${encodeURIComponent(searchTerm.trim())}&limit=20`;
      const { data } = await axios.get(url);

      const mappedResults: SearchCardProps[] = (data?.data ?? []).map(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (item: any) => ({
          type: "location" as const,
          id: item.id,
          image: item.profile_picture || item.picture || item.image || null,
          title: item.name,
          subtitle: item.subtitle || item.description || "",
          address: item.address || "",
          onClick: () =>
            handleLocationSelect({
              id: item.id,
              name: item.name,
              subtitle: item.subtitle || item.description || "",
              address: item.address || "",
              image: item.profile_picture || item.picture || item.image || null,
            }),
        })
      );

      setResults(mappedResults);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Произошла ошибка";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSelect = (location: LocationData) => {
    setSelectedLocation(location);
    setSearchQuery("");
    setResults([]);
    if (onLocationSelect) {
      onLocationSelect(String(location.id));
    }
  };

  const handleRemoveLocation = () => {
    setSelectedLocation(null);
    if (onLocationSelect) {
      onLocationSelect("");
    }
  };

  useEffect(() => {
    fetchLocations(debouncedSearch);
  }, [debouncedSearch]);

  if (!isFormOpen) {
    return (
      <button
        onClick={() => setIsFormOpen(true)}
        className="w-full bg-white/20 rounded-xl h-24 flex items-center justify-center text-white font-medium font-geologica transition-all duration-200 hover:bg-white/30"
      >
        <div className="w-8 h-8 flex items-center justify-center text-white/20 font-thin text-[100px]">
          +
        </div>
      </button>
    );
  }

  return (
    <div className="bg-white/10 border border-white/20 rounded-xl overflow-hidden">
      <div className="flex items-center justify-between p-4 border-b border-white/20">
        <h3 className="text-white font-medium font-geologica">
          Локация события
        </h3>
        <button
          onClick={() => setIsFormOpen(false)}
          className="text-white/70 hover:text-white text-xl"
        >
          ×
        </button>
      </div>

      <div className="p-6 space-y-4">
        {selectedLocation ? (
          <div className="space-y-4">
            <SearchEventCard
              type="location"
              id={selectedLocation.id}
              image={selectedLocation.image}
              title={selectedLocation.name}
              subtitle={selectedLocation.subtitle}
              address={selectedLocation.address}
            />
            <button
              onClick={handleRemoveLocation}
              className="w-full py-2 px-4 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
            >
              Изменить локацию
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <SearchInput
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            {loading && (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="h-4 w-4 animate-spin text-white" />
                <span className="ml-2 text-white/70">Поиск...</span>
              </div>
            )}

            {error && (
              <div className="text-center py-4 text-red-400">{error}</div>
            )}

            {!debouncedSearch && !loading && (
              <div className="text-center py-4 text-white/70">
                Введите название локации для поиска
              </div>
            )}

            {results.length > 0 && (
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {results.map((item) => (
                  <SearchEventCard key={`location-${item.id}`} {...item} />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
