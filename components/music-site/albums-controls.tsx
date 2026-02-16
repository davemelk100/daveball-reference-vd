 "use client";

 import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
 } from "@/components/ui/select";
 import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
 import type { MusicSiteConfig } from "@/lib/music-site";

 type AlbumsControlsProps = {
   site: MusicSiteConfig;
   isAmrep: boolean;
   totalCount: number;
   typeCounts?: { all: number; albums: number; eps: number; singles: number };
   releaseFilter: "all" | "albums" | "eps" | "singles";
   onReleaseFilterChange: (value: "all" | "albums" | "eps" | "singles") => void;
   sortBy: "year-asc" | "year-desc" | "title";
   onSortByChange: (value: "year-asc" | "year-desc" | "title") => void;
 };

 export function AlbumsControls({
   site,
   isAmrep,
   totalCount,
   typeCounts,
   releaseFilter,
   onReleaseFilterChange,
   sortBy,
   onSortByChange,
 }: AlbumsControlsProps) {
   return (
     <div className="flex flex-col gap-4 mb-6 overflow-hidden">
       <div className="flex flex-col lg:flex-row lg:items-center gap-4">
         <div className="flex items-center gap-4 min-w-0">
           <div className="shrink-0">
             <h1 className="font-league">{site.navLabels.discography}</h1>
           </div>
         </div>
         <div className="flex items-center gap-4">
           <Tabs
             value={releaseFilter}
             onValueChange={(v) => onReleaseFilterChange(v as typeof releaseFilter)}
           >
             <TabsList className="text-black">
               <TabsTrigger value="all" className="text-black">
                 All{typeCounts ? ` (${typeCounts.all})` : ""}
               </TabsTrigger>
               <TabsTrigger value="albums" className="text-black">
                 Albums{typeCounts ? ` (${typeCounts.albums})` : ""}
               </TabsTrigger>
               <TabsTrigger value="eps" className="text-black">
                 EPs{typeCounts ? ` (${typeCounts.eps})` : ""}
               </TabsTrigger>
               <TabsTrigger value="singles" className="text-black">
                 Singles{typeCounts ? ` (${typeCounts.singles})` : ""}
               </TabsTrigger>
             </TabsList>
           </Tabs>
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
     </div>
   );
 }
