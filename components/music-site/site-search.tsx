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
   active?: boolean;
 }

 interface SearchOption {
   type: "member" | "album" | "see-all";
   id: string;
   href: string;
   label: string;
   sublabel?: string;
 }

 type SiteSearchProps = {
   placeholder?: string;
   inputClassName?: string;
 };

 type SiteCache = {
   albums: Album[];
   members: Member[];
 };

 const cachedData = new Map<string, SiteCache>();

 export function SiteSearch({ placeholder, inputClassName = "" }: SiteSearchProps) {
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
   const listboxId = "site-search-listbox";

   useEffect(() => {
     const cached = cachedData.get(site.id);
     if (cached) {
       setAlbums(cached.albums);
       setMembers(cached.members);
       return;
     }

     const fetchData = async () => {
       if (isAmrep) {
         try {
           const res = await fetch("/api/amrep/discogs?type=releases&per_page=100");
           if (res.ok) {
             const data = await res.json();
             const releases = Array.isArray(data?.releases) ? data.releases : [];
             const mappedAlbums = releases.map((release: any) => ({
               id: release.id,
               title: `${release.artist} — ${release.title}`,
               year: release.year,
             }));
             const mappedMembers = amrepArtists.map((artist) => ({
               id: artist.id,
               name: artist.name,
               active: artist.active,
             }));
             setAlbums(mappedAlbums);
             setMembers(mappedMembers);
             cachedData.set(site.id, { albums: mappedAlbums, members: mappedMembers });
             return;
           }
         } catch (err) {
           console.error(err);
         }

         const mappedAlbums = amrepReleases.map((release) => ({
           id: release.id,
           title: `${release.artist} — ${release.title}`,
           year: release.year,
         }));
         const mappedMembers = amrepArtists.map((artist) => ({
           id: artist.id,
           name: artist.name,
           active: artist.active,
         }));
         setAlbums(mappedAlbums);
         setMembers(mappedMembers);
         cachedData.set(site.id, { albums: mappedAlbums, members: mappedMembers });
         return;
       }

       setIsLoading(true);
       try {
         const [albumsRes, membersRes] = await Promise.all([
           fetch("/api/gbv/discogs?type=albums"),
           fetch("/api/gbv/discogs?type=artist"),
         ]);

         const mappedAlbums: Album[] = albumsRes.ok
           ? ((await albumsRes.json())?.albums || []).map((album: any) => ({
               id: album.id,
               title: album.title,
               year: album.year,
             }))
           : [];

         const mappedMembers: Member[] = membersRes.ok
           ? ((await membersRes.json())?.members || []).map((member: any) => ({
               id: member.id,
               name: member.name,
               active: member.active,
             }))
           : [];

         setAlbums(mappedAlbums);
         setMembers(mappedMembers);
         cachedData.set(site.id, { albums: mappedAlbums, members: mappedMembers });
       } finally {
         setIsLoading(false);
       }
     };

     fetchData();
   }, [isAmrep, site.id]);

   useEffect(() => {
     const handleClickOutside = (e: MouseEvent) => {
       if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
         setIsOpen(false);
         setActiveIndex(-1);
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

   const options: SearchOption[] = useMemo(() => {
     const opts: SearchOption[] = [];

     filteredMembers.forEach((member) => {
       opts.push({
         type: "member",
         id: `member-${member.id}`,
         href: `${site.basePath}/members/${member.id}`,
         label: member.name,
       });
     });

     filteredAlbums.forEach((album) => {
       opts.push({
         type: "album",
         id: `album-${album.id}`,
         href: `${site.basePath}/albums/${album.id}`,
         label: album.title,
         sublabel: String(album.year),
       });
     });

     if (query.trim()) {
       opts.push({
         type: "see-all",
         id: "see-all",
         href: `${site.basePath}/search?q=${encodeURIComponent(query.trim())}`,
         label: `See all results for "${query}"`,
       });
     }

     return opts;
   }, [filteredMembers, filteredAlbums, query, site.basePath]);

   const hasResults = filteredAlbums.length > 0 || filteredMembers.length > 0;

   useEffect(() => {
     setActiveIndex(-1);
   }, [query]);

   const handleSubmit = (e: React.FormEvent) => {
     e.preventDefault();
     if (query.trim()) {
       setIsOpen(false);
       setActiveIndex(-1);
       router.push(`${site.basePath}/search?q=${encodeURIComponent(query.trim())}`);
     }
   };

   const handleResultClick = useCallback(() => {
     setIsOpen(false);
     setActiveIndex(-1);
     setQuery("");
   }, []);

   const navigateToOption = useCallback((option: SearchOption) => {
     handleResultClick();
     router.push(option.href);
   }, [handleResultClick, router]);

   const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
     if (!isOpen || options.length === 0) {
       if (e.key === "ArrowDown" && query.trim()) {
         e.preventDefault();
         setIsOpen(true);
         setActiveIndex(0);
       }
       return;
     }

     switch (e.key) {
       case "ArrowDown":
         e.preventDefault();
         setActiveIndex((prev) => (prev + 1) % options.length);
         break;
       case "ArrowUp":
         e.preventDefault();
         setActiveIndex((prev) => (prev <= 0 ? options.length - 1 : prev - 1));
         break;
       case "Enter":
         if (activeIndex >= 0 && activeIndex < options.length) {
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
   }, [isOpen, options, activeIndex, navigateToOption, query]);

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
           ) : !hasResults ? (
             <div className="p-3 text-sm text-gray-500 text-center" role="status">No results found</div>
           ) : (
             <>
               {filteredMembers.length > 0 && (
                 <div role="group" aria-label="Members">
                   <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
                     Members
                   </div>
                   {filteredMembers.map((member) => {
                     const optionIndex = options.findIndex(o => o.id === `member-${member.id}`);
                     const isActive = optionIndex === activeIndex;
                     return (
                       <div
                         key={member.id}
                         id={`${listboxId}-member-${member.id}`}
                         role="option"
                         aria-selected={isActive}
                         onClick={() => {
                           handleResultClick();
                           router.push(`${site.basePath}/members/${member.id}`);
                         }}
                         onMouseEnter={() => setActiveIndex(optionIndex)}
                         className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-900 cursor-pointer ${
                           isActive ? "bg-blue-50 outline outline-2 outline-blue-500" : "hover:bg-gray-100"
                         }`}
                       >
                         <Users className="h-4 w-4 text-gray-400" />
                         <span>{member.name}</span>
                       </div>
                     );
                   })}
                 </div>
               )}
               {filteredAlbums.length > 0 && (
                 <div role="group" aria-label="Albums">
                   <div className="px-3 py-1.5 text-xs font-medium text-gray-500 bg-gray-50">
                     Albums
                   </div>
                   {filteredAlbums.map((album) => {
                     const optionIndex = options.findIndex(o => o.id === `album-${album.id}`);
                     const isActive = optionIndex === activeIndex;
                     return (
                       <div
                         key={album.id}
                         id={`${listboxId}-album-${album.id}`}
                         role="option"
                         aria-selected={isActive}
                         onClick={() => {
                           handleResultClick();
                           router.push(`${site.basePath}/albums/${album.id}`);
                         }}
                         onMouseEnter={() => setActiveIndex(optionIndex)}
                         className={`flex items-center gap-2 px-3 py-2 text-sm text-gray-900 cursor-pointer ${
                           isActive ? "bg-blue-50 outline outline-2 outline-blue-500" : "hover:bg-gray-100"
                         }`}
                       >
                         <Disc3 className="h-4 w-4 text-gray-400" />
                         <span className="flex-1 truncate">{album.title}</span>
                         <span className="text-xs text-gray-400">{album.year}</span>
                       </div>
                     );
                   })}
                 </div>
               )}
               {query.trim() && (
                 <div
                   id={`${listboxId}-see-all`}
                   role="option"
                   aria-selected={activeIndex === options.length - 1}
                   onClick={() => {
                     handleResultClick();
                     router.push(`${site.basePath}/search?q=${encodeURIComponent(query.trim())}`);
                   }}
                   onMouseEnter={() => setActiveIndex(options.length - 1)}
                   className={`flex items-center gap-2 px-3 py-2 text-sm text-primary border-t border-gray-100 cursor-pointer ${
                     activeIndex === options.length - 1 ? "bg-blue-50 outline outline-2 outline-blue-500" : "hover:bg-gray-100"
                   }`}
                 >
                   <Search className="h-4 w-4" />
                   <span>See all results for "{query}"</span>
                 </div>
               )}
             </>
           )}
         </div>
       )}
     </div>
   );
 }
