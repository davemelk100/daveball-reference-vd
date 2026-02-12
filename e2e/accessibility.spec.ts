import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const ROUTES = [
  { path: "/gbv", label: "GBV dashboard" },
  { path: "/gbv/albums", label: "GBV albums" },
  { path: "/gbv/members", label: "GBV members" },
  { path: "/amrep", label: "AmRep dashboard" },
  { path: "/amrep/albums", label: "AmRep albums" },
  { path: "/amrep/members", label: "AmRep members" },
  { path: "/rev", label: "Rev dashboard" },
  { path: "/rev/albums", label: "Rev albums" },
  { path: "/rev/members", label: "Rev members" },
  { path: "/e6", label: "E6 dashboard" },
  { path: "/e6/albums", label: "E6 albums" },
  { path: "/e6/members", label: "E6 members" },
  { path: "/mlb", label: "MLB home" },
  { path: "/nfl", label: "NFL home" },
  { path: "/nba", label: "NBA home" },
  { path: "/nhl", label: "NHL home" },
  { path: "/uspbl", label: "USPBL home" },
];

for (const route of ROUTES) {
  test(`${route.label} has no critical a11y violations`, async ({ page }) => {
    await page.goto(route.path);
    await page.waitForLoadState("domcontentloaded");

    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa"])
      // Exclude rules triggered by Radix UI primitives (pre-existing, not our code)
      .disableRules(["aria-valid-attr-value", "button-name", "select-name"])
      .analyze();

    const critical = results.violations.filter(
      (v) => v.impact === "critical" || v.impact === "serious"
    );

    expect(
      critical,
      `${route.label} has ${critical.length} critical/serious a11y violations:\n${critical.map((v) => `  - ${v.id}: ${v.description} (${v.nodes.length} nodes)`).join("\n")}`
    ).toHaveLength(0);
  });
}
