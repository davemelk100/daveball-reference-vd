import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MUSIC_SITES } from "@/lib/music-site";

const ROOT = path.resolve(__dirname, "..");

const SHARED_COMPONENTS = [
  "TriviaPanel",
  "RecordOfDayCard",
  "DashboardDailyRow",
  "DashboardDiscographyGrid",
  "DashboardMembersGrid",
] as const;

describe("Component consistency", () => {
  for (const site of MUSIC_SITES) {
    describe(`${site.shortName} dashboard`, () => {
      const dashboardPath = path.join(
        ROOT,
        "components",
        site.id,
        `${site.id}-dashboard-content.tsx`
      );

      it("dashboard content file exists", () => {
        expect(fs.existsSync(dashboardPath)).toBe(true);
      });

      const content = fs.existsSync(dashboardPath)
        ? fs.readFileSync(dashboardPath, "utf-8")
        : "";

      for (const component of SHARED_COMPONENTS) {
        it(`uses shared component: ${component}`, () => {
          expect(content).toContain(component);
        });
      }
    });
  }
});
