import Link from "next/link";
import Image from "next/image";

export function GbvFooter() {
  return (
    <footer className="border-t border-border bg-muted/30 py-6 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/gbv-rune.svg"
              alt="GBV"
              width={24}
              height={24}
              className="h-6 w-6"
            />
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <Link href="/gbv/albums" className="hover:text-foreground transition-colors">
              Albums
            </Link>
            <Link href="/gbv/members" className="hover:text-foreground transition-colors">
              Members
            </Link>
            <Link href="/gbv/songs" className="hover:text-foreground transition-colors">
              Songs
            </Link>
            <Link href="/gbv/ask" className="hover:text-foreground transition-colors">
              Chat GBV
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
