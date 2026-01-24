# White-label Music Site System

This project supports multiple branded "topic" sites (e.g. GBV, AmRep) that
share a common shell and can be themed via config + CSS.

## Architecture Overview

```
lib/music-site.ts              # Site configuration registry
components/music-site/         # Shared components (37 files)
components/{topic}/            # Topic re-exports (thin wrappers)
app/{topic}/                   # Topic routes
styles/globals.css             # Theme CSS (.{topic}-shell classes)
```

## Shared Components

All core functionality lives in `components/music-site/`:

| Component | Description |
|-----------|-------------|
| `site-chat-content.tsx` | AI chat interface |
| `site-dashboard-content.tsx` | Homepage dashboard |
| `site-albums-content.tsx` | Albums/releases grid |
| `site-members-content.tsx` | Members/artists grid |
| `site-remote-image.tsx` | Image component with site-aware defaults |
| `site-nav.tsx` | Left nav + footer nav |
| `site-header.tsx` | Site header |
| `site-footer.tsx` | Site footer |
| `site-layout.tsx` | Layout wrapper |
| `trivia-panel.tsx` | Daily trivia card |
| `record-of-day-card.tsx` | Record of the day card |
| `album-grid.tsx` | Album grid display |
| `member-avatar.tsx` | Member photo with fallbacks |
| ... and more |

## Add a New Topic

### 1. Add Site Configuration

Update `lib/music-site.ts` with a new `MusicSiteConfig`:

```typescript
export const NEW_SITE: MusicSiteConfig = {
  id: "newtopic",
  name: "New Topic Name",
  shortName: "NT",
  basePath: "/newtopic",
  chatLabel: "Chat NT",
  headerTitle: "New Topic",
  headerTextClass: "text-white", // or "text-black"
  logoSrc: "/newtopic-logo.svg",
  chatIconSrc: "/newtopic-chat.svg",
  placeholderIconSrc: "/newtopic-placeholder.svg",
  shellClass: "newtopic-shell",
  navLabels: {
    discography: "Albums",
    members: "Members",
    sideProjects: "Side Projects",
  },
  sources: [
    { label: "Source Name", url: "https://example.com" },
  ],
  imageSources: [
    { label: "Image Source", url: "https://example.com" },
  ],
  searchPlaceholder: "Search New Topic...",
  seo: {
    title: "New Topic",
    titleTemplate: "%s | New Topic",
    description: "Description for SEO",
    keywords: ["keyword1", "keyword2"],
    ogImage: "https://example.com/og.png",
    ogImageAlt: "New Topic",
  },
};

// Add to registry
export const MUSIC_SITES = [GBV_SITE, AMREP_SITE, NEW_SITE] as const;
```

### 2. Add Theme Styles

Add a `.newtopic-shell` section in `styles/globals.css`:

```css
.newtopic-shell {
  --primary: 220 80% 50%;
  --primary-foreground: 0 0% 100%;
  /* ... customize colors */
}

.newtopic-shell .your-custom-class {
  /* topic-specific overrides */
}
```

### 3. Add Component Re-exports

Create `components/newtopic/` with thin wrappers:

```typescript
// components/newtopic/newtopic-dashboard-content.tsx
import { SiteDashboardContent } from "@/components/music-site/site-dashboard-content";
export const NewtopicDashboardContent = SiteDashboardContent;

// components/newtopic/newtopic-chat-content.tsx
import { SiteChatContent } from "@/components/music-site/site-chat-content";
export const NewtopicChatContent = SiteChatContent;

// ... repeat for other components
```

### 4. Add Routes

Create `app/newtopic/` with routes:

```typescript
// app/newtopic/layout.tsx
import { createSiteMetadata, getSiteJsonLd, NEW_SITE } from "@/lib/music-site";

export const metadata = createSiteMetadata(NEW_SITE);

export default function Layout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getSiteJsonLd(NEW_SITE)) }}
      />
      {children}
    </>
  );
}

// app/newtopic/page.tsx
import { NewtopicDashboardContent } from "@/components/newtopic/newtopic-dashboard-content";
export default function Page() {
  return <NewtopicDashboardContent />;
}
```

### 5. Add Data

Create data files in `lib/`:

- `lib/newtopic-albums-data.ts` - Album/release data
- `lib/newtopic-artists-data.ts` - Member/artist data
- `lib/newtopic-trivia-data.ts` - Trivia questions
- `lib/newtopic-records-of-day.ts` - Record of the day entries

### 6. Add Chat API (Optional)

Create `/app/api/newtopic/ask/route.ts` if the topic supports chat.

### 7. Add Chat Prompts

Update `CHAT_PROMPTS` in `site-chat-content.tsx`:

```typescript
const CHAT_PROMPTS: Record<string, string[]> = {
  gbv: [...],
  amrep: [...],
  newtopic: [
    "Prompt 1",
    "Prompt 2",
  ],
};
```

## Data Schema Requirements

### Albums/Releases

```typescript
interface Album {
  id: number;
  title: string;
  year: number;
  thumb?: string;        // Cover image URL
  format?: string;       // "LP", "CD", "7\"", etc.
  releaseType?: string;  // "album", "single", "ep", etc.
}
```

### Members/Artists

```typescript
interface Member {
  id: number;
  name: string;
  active: boolean;
  imageUrl?: string | null;
}
```

### Trivia

```typescript
interface TriviaQuestion {
  id: string;
  question: string;
  answers: string[];
  correctIndex: number;
  explanation?: string;
}
```

### Record of the Day

```typescript
interface RecordOfDay {
  title: string;
  artist?: string;
  year: number;
  highlight: string;
  albumId?: number;  // Links to album detail page
}
```

## Notes

- The `MUSIC_SITES` registry in `lib/music-site.ts` drives path detection,
  metadata, and layout theming.
- `components/layout-wrapper.tsx` automatically recognizes new topics based
  on `MUSIC_SITES`—no additional routing updates are needed.
- All shared components use `getMusicSiteFromPathname()` to detect the current
  site and apply appropriate styling/behavior.
- Topic-specific components in `components/{topic}/` are thin re-exports that
  maintain backwards compatibility while using shared implementations.
