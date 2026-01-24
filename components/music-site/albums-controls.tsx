 "use client";

 import { Input } from "@/components/ui/input";
 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import { Search } from "lucide-react";
 import type { MusicSiteConfig } from "@/lib/music-site";

 type AlbumsControlsProps = {
   site: MusicSiteConfig;
   isAmrep: boolean;
   totalCount: number;
   releaseFilter: "all" | "albums" | "singles";
   onReleaseFilterChange: (value: "all" | "albums" | "singles") => void;
   sortBy: "year-asc" | "year-desc" | "title";
   onSortByChange: (value: "year-asc" | "year-desc" | "title") => void;
   search: string;
   onSearchChange: (value: string) => void;
 };

 export function AlbumsControls({
   site,
   isAmrep,
   totalCount,
   releaseFilter,
   onReleaseFilterChange,
   sortBy,
   onSortByChange,
   search,
   onSearchChange,
 }: AlbumsControlsProps) {
   return (
     <div className="flex flex-col gap-4 mb-6">
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
         <div>
           <h1 className="font-league">{site.navLabels.discography}</h1>
           <p className="text-sm text-muted-foreground">
             {isAmrep
               ? "Releases"
               : releaseFilter === "albums"
                 ? "Albums"
                 : releaseFilter === "singles"
                   ? "Singles"
                   : "All"}{" "}
             <span className="align-baseline">({totalCount})</span>
           </p>
         </div>
         <Tabs
           value={releaseFilter}
           onValueChange={(v) => onReleaseFilterChange(v as typeof releaseFilter)}
           className="sm:ml-auto"
         >
           <TabsList className="text-black">
             <TabsTrigger value="all" className="text-black">
               All
             </TabsTrigger>
             <TabsTrigger value="albums" className="text-black">
               Albums
             </TabsTrigger>
             <TabsTrigger value="singles" className="text-black">
               Singles
             </TabsTrigger>
           </TabsList>
         </Tabs>
       </div>
       <div className="flex gap-4 w-full">
         <div className="relative flex-1">
           <Search
             className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 ${
               isAmrep ? "text-black" : "text-white/80"
             }`}
           />
           <Input
             placeholder="Search titles..."
             value={search}
             onChange={(e) => onSearchChange(e.target.value)}
             className="pl-9 w-full text-white gbv-input-white"
           />
         </div>
         <Select value={sortBy} onValueChange={(v) => onSortByChange(v as typeof sortBy)}>
           <SelectTrigger className="w-44 text-white">
             <SelectValue className="text-white" />
           </SelectTrigger>
           <SelectContent className="text-black">
             <SelectItem value="year-asc" className="text-black">
               Year (oldest)
             </SelectItem>
             <SelectItem value="year-desc" className="text-black">
               Year (newest)
             </SelectItem>
             <SelectItem value="title" className="text-black">
               Title A-Z
             </SelectItem>
           </SelectContent>
         </Select>
       </div>
     </div>
   );
 }
