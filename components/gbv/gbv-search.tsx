"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Search, Disc3, Users } from "lucide-react";
import { Input } from "@/components/ui/input";
import Link from "next/link";

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

// Cache for search data
let cachedAlbums: Album[] | null = null;
let cachedMembers: Member[] | null = null;

export function GbvSearch() {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  // Fetch data on first focus/interaction
  useEffect(() => {
    const fetchData = async () => {
      if (cachedAlbums && cachedMembers) {
        setAlbums(cachedAlbums);
        setMembers(cachedMembers);
        return;
      }

      setIsLoading(true);
      try {
        const [albumsRes, membersRes] = await Promise.all([
          fetch("/api/gbv/discogs?type=albums"),
          fetch("/api/gbv/discogs?type=artist"),
        ]);

        if (albumsRes.ok) {
          const data = await albumsRes.json();
          cachedAlbums = data.albums || [];
          setAlbums(cachedAlbums);
        }

        if (membersRes.ok) {
          const data = await membersRes.json();
          cachedMembers = data.members || [];
          setMembers(cachedMembers);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredAlbums = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return albums
      .filter((album) => album.title.toLowerCase().includes(lower))
      .slice(0, 5);
  }, [albums, query]);

  const filteredMembers = useMemo(() => {
    if (!query.trim()) return [];
    const lower = query.toLowerCase();
    return members
      .filter((member) => member.name.toLowerCase().includes(lower))
      .slice(0, 3);
  }, [members, query]);

  const hasResults = filteredAlbums.length > 0 || filteredMembers.length > 0;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      setIsOpen(false);
      router.push(`/gbv/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setQuery("");
  };

  return (
    <div ref={containerRef} className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <Input
          type="search"
          placeholder="Search albums, songs, members..."
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          className="h-12 pr-10 gbv-input-white placeholder:text-white/70"
        />
        <button
          type="submit"
          aria-label="Search"
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-white/80 hover:text-white !text-white"
        >
          <Search className="h-4 w-4 !text-white" />
        </button>
      </form>

      {/* Dropdown results */}
      {isOpen && query.trim() && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden z-50 max-h-80 overflow-y-auto">
          {isLoading ? (
            <div className="p-3 text-sm text-gray-500 text-center">Loading...</div>
          ) : !hasResults ? (
            <div className="p-3 text-sm text-gray-500 text-center">No results found</div>
          ) : (
            <>
              {filteredMembers.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
                    Members
                  </div>
                  {filteredMembers.map((member) => (
                    <Link
                      key={member.id}
                      href={`/gbv/members/${member.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-gray-900"
                    >
                      <Users className="h-4 w-4 text-gray-400" />
                      <span>{member.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              {filteredAlbums.length > 0 && (
                <div>
                  <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
                    Albums
                  </div>
                  {filteredAlbums.map((album) => (
                    <Link
                      key={album.id}
                      href={`/gbv/albums/${album.id}`}
                      onClick={handleResultClick}
                      className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-gray-900"
                    >
                      <Disc3 className="h-4 w-4 text-gray-400" />
                      <span className="flex-1 truncate">{album.title}</span>
                      <span className="text-xs text-gray-400">{album.year}</span>
                    </Link>
                  ))}
                </div>
              )}
              {query.trim() && (
                <Link
                  href={`/gbv/search?q=${encodeURIComponent(query.trim())}`}
                  onClick={handleResultClick}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 text-sm text-primary border-t border-gray-100"
                >
                  <Search className="h-4 w-4" />
                  <span>See all results for "{query}"</span>
                </Link>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
