"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export function NHLPlayerSearch() {
  const [query, setQuery] = useState("");

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search players, teams..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="pl-9 h-12"
      />
    </div>
  );
}
