import React from "react";
import { cn } from "@/lib/utils";

import { SearchInput } from "@/components/shared/ui/SearchInput";

interface Props {
  className?: string;
}

export const SearchPage: React.FC<Props> = ({ className }) => {
  return (
    <main className={cn("flex flex-col gap-6 pt-4 pb-24 px-2", className)}>
      <SearchInput />
    </main>
  );
};
