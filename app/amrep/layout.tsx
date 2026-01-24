import { SiteLayout } from "@/components/music-site/site-layout";
import {
  createSiteMetadata,
  getMusicSiteById,
} from "@/lib/music-site";

const site = getMusicSiteById("amrep");

export const metadata = createSiteMetadata(site);

export default function AmrepLayout({ children }: { children: React.ReactNode }) {
  return (
    <SiteLayout siteId={site.id}>{children}</SiteLayout>
  );
}
