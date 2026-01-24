import { SiteSearch } from "@/components/music-site/site-search";

export function AmrepSearch(props: { placeholder?: string; inputClassName?: string } = {}) {
  return <SiteSearch {...props} />;
}

export { AmrepSearch as GbvSearch };
