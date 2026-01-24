import { SiteSearch } from "@/components/music-site/site-search";

export function GbvSearch(props: { placeholder?: string; inputClassName?: string } = {}) {
  return <SiteSearch {...props} />;
}
