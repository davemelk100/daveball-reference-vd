"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const BANNER_VERSION = "v1"; // Bump this to show banner again after new updates
const STORAGE_KEY = `updates-banner-dismissed-${BANNER_VERSION}`;

export function UpdatesBanner() {
  const [isDismissed, setIsDismissed] = useState(true); // Start hidden to prevent flash

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    setIsDismissed(dismissed === "true");
  }, []);

  const handleDismiss = () => {
    localStorage.setItem(STORAGE_KEY, "true");
    setIsDismissed(true);
  };

  if (isDismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 border-b">
      <div className="container py-3 pr-12">
        <div className="flex items-center gap-4">
          <div className="shrink-0 hidden sm:block">
            <div className="w-12 h-12 rounded-lg bg-primary/20 flex items-center justify-center text-2xl">
              ⚾
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground">
              Link to each player's baseball cards on their page!
            </p>
          </div>
        </div>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 text-muted-foreground hover:text-foreground"
        onClick={handleDismiss}
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
}
