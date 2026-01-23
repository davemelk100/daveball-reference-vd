"use client";

import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Search, Disc3, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import { getMusicSiteFromPathname } from "@/lib/music-site";
import { amrepArtists } from "@/lib/amrep-artists-data";
import { amrepReleases } from "@/lib/amrep-releases-data";

interface Album {
  id: number;
  title: string;
  year: number;
}

interface Member {
  id: number;
  name: string;
  active: boolean;
}

interface SearchOption {
  type: "member" | "album" | "see-all";
  id: string;
  href: string;
  label: string;
  sublabel?: string;
}

// Cache for search data
let cachedAlbums: Album[] | null = null;
let cachedMembers: Member[] | null = null;

export function AmrepSearch({
  placeholder,
  inputClassName = "",
}: {
  placeholder?: string;
  inputClassName?: string;
} = {}) {
  const pathname = usePathname();
  const site = getMusicSiteFromPathname(pathname);
  const isAmrep = site.id === "amrep";
  const [query, setQuery] = useState("");
  const effectivePlaceholder = placeholder || site.searchPlaceholder;
  const [isOpen, setIsOpen] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listboxId = "gbv-search-listbox";

  // Fetch data on first focus/interaction
  useEffect(() => {
    const fetchData = async () => {
      if (isAmrep) {
        try {
          const res = await fetch("/api/amrep/discogs?type=releases&per_page=100");
          if (res.ok) {
            const data = await res.json();
            const releases = Array.isArray(data?.releases) ? data.releases : [];
            setAlbums(
              releases.map((release: any) => ({
                id: release.id,
                title: `${release.artist} — ${release.title}`,
                year: release.year,
              }))
            );
          } else {
            setAlbums(
              amrepReleases.map((release) => ({
                id: release.id,
                title: `${release.artist} — ${release.title}`,
                year: release.year,
              }))
            );
          }
        } catch {
          setAlbums(
            amrepReleases.map((release) => ({
              id: release.id,
              title: `${release.artist} — ${release.title}`,
              year: release.year,
            }))
          );
        }

        setMembers(
          amrepArtists.map((artist) => ({
            id: artist.id,
            name: artist.name,
            active: artist.active,
          }))
        );
        cachedAlbums = albums;
        cachedMembers = members;
        return;
      }

      if (cachedAlbums && cachedMembers) {
        setAlbums(cachedAlbums);
        setMembers(cachedMembers);
        return;
      }

      setIsLoading(true);
      try {
        const [membersRes, albumsRes] = await Promise.all([
          fetch("/api/gbv/discogs?type=artist&include_member_images=true&member_image_limit=60"),
          fetch("/api/gbv/discogs?type=albums"),
        ]);

        if (membersRes.ok) {
          const data = await membersRes.json();
          const nextMembers = data.members || [];
          setMembers(nextMembers);
          cachedMembers = nextMembers;
        }

        if (albumsRes.ok) {
          const data = await albumsRes.json();
          const nextAlbums = data.albums || [];
          setAlbums(nextAlbums);
          cachedAlbums = nextAlbums;
        }
      } catch {
        // ignore
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen && query.trim().length > 0) {
      fetchData();
    }
  }, [isOpen, query, isAmrep, albums, members]);

  const options = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();

    const filteredMembers = members.filter((m) =>
      m.name.toLowerCase().includes(lower)
    );
    const filteredAlbums = albums.filter((a) =>
      a.title.toLowerCase().includes(lower)
    );

    const memberOptions: SearchOption[] = filteredMembers.map((m) => ({
      type: "member",
      id: `member-${m.id}`,
      href: `${site.basePath}/members/${m.id}`,
      label: m.name,
    }));

    const albumOptions: SearchOption[] = filteredAlbums.map((a) => ({
      type: "album",
      id: `album-${a.id}`,
      href: `${site.basePath}/albums/${a.id}`,
      label: a.title,
      sublabel: a.year ? String(a.year) : undefined,
    }));

    const seeAllOption: SearchOption = {
      type: "see-all",
      id: "see-all",
      href: `${site.basePath}/search?q=${encodeURIComponent(query.trim())}`,
      label: `See all results for "${query.trim()}"`,
    };

    return [...memberOptions, ...albumOptions, seeAllOption].slice(0, 10);
  }, [query, members, albums, site.basePath]);

  const handleResultClick = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, []);

  const navigateToOption = useCallback(
    (option: SearchOption) => {
      handleResultClick();
      router.push(option.href);
    },
    [handleResultClick, router],
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!query.trim()) return;
      navigateToOption({
        type: "see-all",
        id: "see-all",
        href: `${site.basePath}/search?q=${encodeURIComponent(query.trim())}`,
        label: `See all results for "${query.trim()}"`,
      });
    },
    [query, navigateToOption, site.basePath],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen || options.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((prev) => Math.min(prev + 1, options.length - 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        if (activeIndex >= 0 && options[activeIndex]) {
          e.preventDefault();
          navigateToOption(options[activeIndex]);
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        setActiveIndex(-1);
        break;
    }
  }, [isOpen, options, activeIndex, navigateToOption]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setActiveIndex(-1);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const activeOptionId = activeIndex >= 0 && options[activeIndex]
    ? `${listboxId}-${options[activeIndex].id}`
    : undefined;

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          ref={inputRef}
          type="search"
          placeholder={effectivePlaceholder}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={handleKeyDown}
          className={`h-12 pr-10 gbv-input-white placeholder:text-white/70 ${inputClassName}`}
          role="combobox"
          aria-expanded={isOpen && query.trim().length > 0}
          aria-haspopup="listbox"
          aria-controls={listboxId}
          aria-activedescendant={activeOptionId}
          aria-autocomplete="list"
        />
        <button
          type="submit"
          aria-label="Search"
          className={`absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 ${
            isAmrep ? "text-black hover:text-black" : "text-white/80 hover:text-white"
          }`}
        >
          <Search className={`h-4 w-4 ${isAmrep ? "text-black" : "!text-white"}`} />
        </button>
      </form>

      {isOpen && query.trim() && (
        <div
          id={listboxId}
          role="listbox"
          aria-label="Search results"
          className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto"
        >
          {isLoading ? (
            <div className="p-3 text-sm text-gray-500 text-center" role="status">Loading...</div>
          ) : options.length === 0 ? (
            <div className="p-3 text-sm text-gray-500 text-center" role="status">No results found</div>
          ) : (
            <>
              {options.map((option, index) => (
                <div
                  key={option.id}
                  id={`${listboxId}-${option.id}`}
                  role="option"
                  aria-selected={index === activeIndex}
                  onClick={() => navigateToOption(option)}
                  onMouseEnter={() => setActiveIndex(index)}
                  className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-900 cursor-pointer ${
                    index === activeIndex ? "bg-blue-50 outline outline-2 outline-blue-500" : "hover:bg-gray-100"
                  }`}
                >
                  {option.type === "member" && <Users className="h-4 w-4 text-gray-400" />}
                  {option.type === "album" && <Disc3 className="h-4 w-4 text-gray-400" />}
                  {option.type === "see-all" && <Search className="h-4 w-4" />}
                  <span className="flex-1 truncate">{option.label}</span>
                  {option.sublabel && (
                    <span className="text-xs text-gray-400">{option.sublabel}</span>
                  )}
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export { AmrepSearch as GbvSearch };
