import { test, expect } from "@playwright/test";

const MUSIC_SITES = [
  { id: "gbv", name: "GBV", albumId: 55972 },
  { id: "amrep", name: "AmRep", albumId: 1 },
  { id: "rev", name: "Rev", albumId: 1 },
];

const SPORTS_SITES = [
  { id: "mlb", name: "MLB" },
  { id: "nfl", name: "NFL" },
  { id: "nba", name: "NBA" },
  { id: "nhl", name: "NHL" },
  { id: "uspbl", name: "USPBL" },
];

for (const site of MUSIC_SITES) {
  test.describe(`${site.name} smoke tests`, () => {
    test("dashboard loads with trivia panel and record of day", async ({ page }) => {
      await page.goto(`/${site.id}`);
      await expect(page.locator("body")).toBeVisible();
      // Check for key dashboard sections
      await expect(page.locator("text=Trivia").first()).toBeVisible({ timeout: 10_000 });
    });

    test("albums page renders grid", async ({ page }) => {
      await page.goto(`/${site.id}/albums`);
      await expect(page.locator("body")).toBeVisible();
      // Should have cards or grid items
      const cards = page.locator("[class*='grid']").first();
      await expect(cards).toBeVisible({ timeout: 10_000 });
    });

    test("members page renders", async ({ page }) => {
      await page.goto(`/${site.id}/members`);
      await expect(page.locator("body")).toBeVisible();
      const grid = page.locator("[class*='grid']").first();
      await expect(grid).toBeVisible({ timeout: 10_000 });
    });

    test("album detail page renders", async ({ page }) => {
      await page.goto(`/${site.id}/albums/${site.albumId}`);
      await expect(page.locator("body")).toBeVisible();
    });

    test("search page loads", async ({ page }) => {
      await page.goto(`/${site.id}/search`);
      await expect(page.locator("body")).toBeVisible();
    });

    test("site switcher is visible in left nav", async ({ page }) => {
      await page.goto(`/${site.id}`);
      const switcher = page.locator("button", { hasText: "Sites" });
      await expect(switcher).toBeVisible({ timeout: 10_000 });
    });
  });
}

for (const site of SPORTS_SITES) {
  test.describe(`${site.name} smoke tests`, () => {
    test("home page loads", async ({ page }) => {
      await page.goto(`/${site.id}`);
      await expect(page.locator("body")).toBeVisible();
    });

    test("site switcher is visible in left nav", async ({ page }) => {
      await page.goto(`/${site.id}`);
      const switcher = page.locator("button", { hasText: "Sites" });
      await expect(switcher).toBeVisible({ timeout: 10_000 });
    });
  });
}
