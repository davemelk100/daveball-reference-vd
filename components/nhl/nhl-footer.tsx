"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronUp } from "lucide-react";

export function NHLFooter() {
  const sources = [
    { label: "NHL Web API", url: "https://api-web.nhle.com/" },
    { label: "NHL Stats API", url: "https://api.nhle.com/stats/" },
    { label: "Hockey-Reference", url: "https://www.hockey-reference.com/" },
    { label: "NHL.com", url: "https://www.nhl.com/" },
    { label: "Wikipedia", url: "https://en.wikipedia.org/" },
  ];
  const imageSources = [
    { label: "NHL", url: "https://www.nhl.com/" },
    { label: "NHLE Assets", url: "https://assets.nhle.com/" },
    { label: "Hockey-Reference", url: "https://www.hockey-reference.com/" },
  ];

  const allSources = [
    { category: "Data", items: sources },
    { category: "Images", items: imageSources },
  ];

  return (
    <footer className="border-t border-border bg-muted/30 mt-auto pb-20 sm:pb-0">
      <div className="container py-3">
        <div className="flex flex-col items-center gap-1 text-xs text-muted-foreground/80 text-center">
          <div className="sm:hidden">
            <Popover>
              <PopoverTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/10 hover:text-foreground transition-colors">
                Sources <ChevronUp className="h-3 w-3" />
              </PopoverTrigger>
              <PopoverContent className="w-64 p-3" side="top" align="center">
                {allSources.map((group) => (
                  <div key={group.category} className="mb-3 last:mb-0">
                    <p className="text-xs font-semibold text-muted-foreground mb-1">
                      {group.category}
                    </p>
                    <div className="flex flex-col gap-1">
                      {group.items.map((source) => (
                        <a
                          key={source.label}
                          href={source.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                        >
                          {source.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex items-center justify-center gap-2">
            <span>
              &copy; {new Date().getFullYear()}{" "}
              <a
                href="https://davemelk.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                Melkonian Industries
              </a>
            </span>
            <div className="hidden sm:block">
              <Popover>
                <PopoverTrigger className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-primary/10 hover:text-foreground transition-colors">
                  Sources <ChevronUp className="h-3 w-3" />
                </PopoverTrigger>
                <PopoverContent className="w-64 p-3" side="top" align="end">
                  {allSources.map((group) => (
                    <div key={group.category} className="mb-3 last:mb-0">
                      <p className="text-xs font-semibold text-muted-foreground mb-1">
                        {group.category}
                      </p>
                      <div className="flex flex-col gap-1">
                        {group.items.map((source) => (
                          <a
                            key={source.label}
                            href={source.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs px-2 py-1 rounded hover:bg-primary/10 transition-colors"
                          >
                            {source.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  ))}
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
