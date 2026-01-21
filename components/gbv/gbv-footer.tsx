import Link from "next/link";
import Image from "next/image";

export function GbvFooter() {
  return (
    <footer className="bg-transparent py-3 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <nav className="flex items-center gap-4 text-[11px] text-white md:hidden">
            <Link
              href="/gbv/albums"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Albums
            </Link>
            <Link
              href="/gbv/ask"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Chat GBV
            </Link>
            <Link
              href="/gbv/members"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Members
            </Link>
          </nav>
        </div>
        <div className="mt-2 text-[11px] text-white">
          <div className="flex flex-wrap items-center gap-2">
            <span>Sources:</span>
            <a
              href="https://www.discogs.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Discogs
            </a>
            <a
              href="https://www.gbvdb.com/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              GBVDB
            </a>
            <a
              href="https://musicbrainz.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              MusicBrainz
            </a>
            <a
              href="https://coverartarchive.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Cover Art Archive
            </a>
            <a
              href="https://www.wikidata.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Wikidata
            </a>
            <a
              href="https://commons.wikimedia.org/"
              target="_blank"
              rel="noreferrer"
              className="transition-colors hover:underline hover:decoration-current"
            >
              Wikimedia Commons
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
