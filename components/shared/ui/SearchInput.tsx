"use client";

import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useDebounce } from "react-use";
import { Input } from "@/components/shared/ui/Input";

interface Props {
  className?: string;
}

export const SearchInput: React.FC<Props> = ({ className }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = useState<string>("");
  const ref = React.useRef<HTMLDivElement>(null);

  useDebounce(() => setDebouncedSearch(searchQuery), 500, [searchQuery]);

  useEffect(() => {
    console.log("Запрос с фильтром:" + debouncedSearch);
  }, [debouncedSearch]);

  return (
    <>
      <div
        ref={ref}
        className={cn(
          "flex rounded-2xl flex-1 justify-between relative h-11 z-30",
          className
        )}
      >
        <Search className="absolute scale-x-[-1] top-1/2 translate-y-[-50%] left-3 h-5 text-white" />
        <Input
          className="rounded-2xl outline-none border-none w-full bg-white-glass pl-11"
          type="text"
          placeholder="поиск..."
          onChange={(e) => setSearchQuery(e.target.value)}
          value={searchQuery as string}
        />
      </div>
    </>
  );
};
