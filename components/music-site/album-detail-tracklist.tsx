type AlbumTrack = {
  position?: string;
  title: string;
  duration?: string;
};

type AlbumDetailTracklistProps = {
  tracks?: AlbumTrack[];
  variant: "gbv" | "amrep";
  emptyLabel: string;
};

export function AlbumDetailTracklist({
  tracks,
  variant,
  emptyLabel,
}: AlbumDetailTracklistProps) {
  if (!tracks || tracks.length === 0) {
    return <p className="text-muted-foreground">{emptyLabel}</p>;
  }

  if (variant === "amrep") {
    return (
      <div className="space-y-2">
        {tracks.map((track, idx) => (
          <div
            key={`${track.title}-${idx}`}
            className="flex items-center justify-between border-b border-border pb-2 last:border-0"
          >
            <div>
              <span className="text-sm font-medium">
                {track.position || idx + 1}. {track.title}
              </span>
            </div>
            <span className="text-xs text-muted-foreground">
              {track.duration || "—"}
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="divide-y">
      {tracks.map((track, index) => (
        <div key={index} className="flex items-center justify-between py-2">
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground w-8">
              {track.position || index + 1}
            </span>
            <span>{track.title}</span>
          </div>
          {track.duration && (
            <span className="text-sm text-muted-foreground">
              {track.duration}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}
