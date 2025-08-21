import React from "react";
<<<<<<< HEAD
import type { Metadata } from "next";
import { SearchPage } from "@/components/pages/SearchPage";

export const metadata: Metadata = {
  title: "Spichka - поиск",
  description: "Спичка — платформа камерных событий и живых встреч",
};

=======
import { SearchPage } from "@/components/pages/SearchPage";

>>>>>>> origin/main
export default async function SearchPageServer() {
  return <SearchPage />;
}
