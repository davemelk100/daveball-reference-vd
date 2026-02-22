import { test, expect } from "@playwright/test";

const SPORTS = [
  { id: "mlb", name: "MLB" },
  { id: "nba", name: "NBA" },
  { id: "nfl", name: "NFL" },
  { id: "nhl", name: "NHL" },
];

for (const sport of SPORTS) {
  test.describe(`${sport.name} Jersey Numbers quiz`, () => {
    test.beforeEach(async ({ page }) => {
      // Clear jersey localStorage before each test
      await page.goto(`/${sport.id}`);
      await page.evaluate((id) => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(`${id}-jersey-`))
          .forEach((k) => localStorage.removeItem(k));
      }, sport.id);
      await page.reload();
    });

    test("panel renders with Jersey Numbers heading", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await expect(
        page.locator("h2", { hasText: "Jersey Numbers" }).first()
      ).toBeVisible({ timeout: 10_000 });
    });

    test("shows question text matching expected format", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await expect(
        page.locator("text=/What number did .+ wear with the .+\\?/").first()
      ).toBeVisible({ timeout: 10_000 });
    });

    test("shows 4 answer option buttons", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      // Find the jersey panel by its heading, then look for option buttons inside its container
      const panel = page.locator("div", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const buttons = panel.locator("button[class*='outline']");
      await expect(buttons).toHaveCount(4);
    });

    test("shows 1 of 5 counter", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await expect(
        page.locator("text=1 of 5").first()
      ).toBeVisible({ timeout: 10_000 });
    });

    // ─── CRUD: Create (answer a question) ───

    test("answering a question shows green/red feedback", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const options = panel.locator("button[class*='outline']");
      await options.first().click();
      // After clicking, at least one button should have green or red styling
      const feedback = panel.locator("[class*='border-green-500'], [class*='border-red-500']");
      await expect(feedback.first()).toBeVisible();
    });

    test("answering a question shows explanation text", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const options = panel.locator("button[class*='outline']");
      await options.first().click();
      // Explanation area should appear
      const explanation = panel.locator("div[class*='bg-muted']");
      await expect(explanation.first()).toBeVisible();
    });

    // ─── CRUD: Read (persisted answers restored on reload) ───

    test("answer persists in localStorage after answering", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const options = panel.locator("button[class*='outline']");
      await options.first().click();

      const stored = await page.evaluate((id) => {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${id}-jersey-`));
        return keys.length > 0 ? JSON.parse(localStorage.getItem(keys[0])!) : null;
      }, sport.id);

      expect(stored).not.toBeNull();
      expect(stored).toHaveLength(1);
      expect(stored[0]).toHaveProperty("questionId");
      expect(stored[0]).toHaveProperty("selectedAnswer");
      expect(stored[0]).toHaveProperty("isCorrect");
    });

    test("answers survive page reload", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const options = panel.locator("button[class*='outline']");
      await options.first().click();

      // Reload page
      await page.reload();
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });

      // Verify the answer is still reflected (feedback visible, buttons disabled)
      const panelAfter = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const feedback = panelAfter.locator("[class*='border-green-500'], [class*='border-red-500']");
      await expect(feedback.first()).toBeVisible();
    });

    // ─── CRUD: Update (answering more questions updates stored state) ───

    test("answering multiple questions updates localStorage", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();

      // Answer question 1
      let options = panel.locator("button[class*='outline']");
      await options.first().click();

      // Navigate to question 2
      await panel.locator("button", { hasText: "Next" }).click();
      await expect(page.locator("text=2 of 5").first()).toBeVisible();

      // Answer question 2
      options = panel.locator("button[class*='outline']");
      await options.first().click();

      const stored = await page.evaluate((id) => {
        const keys = Object.keys(localStorage).filter((k) => k.startsWith(`${id}-jersey-`));
        return keys.length > 0 ? JSON.parse(localStorage.getItem(keys[0])!) : null;
      }, sport.id);

      expect(stored).toHaveLength(2);
    });

    // ─── CRUD: Delete (clearing localStorage resets quiz) ───

    test("clearing localStorage resets the quiz", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();

      // Answer a question
      let options = panel.locator("button[class*='outline']");
      await options.first().click();

      // Clear storage and reload
      await page.evaluate((id) => {
        Object.keys(localStorage)
          .filter((k) => k.startsWith(`${id}-jersey-`))
          .forEach((k) => localStorage.removeItem(k));
      }, sport.id);
      await page.reload();
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });

      // Should be back on question 1 with no feedback
      await expect(page.locator("text=1 of 5").first()).toBeVisible();
      const panelAfter = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const feedback = panelAfter.locator("[class*='border-green-500'], [class*='border-red-500']");
      await expect(feedback).toHaveCount(0);
    });

    // ─── Navigation ───

    test("Prev button is disabled on question 1", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      const prevBtn = panel.locator("button", { hasText: "Prev" });
      await expect(prevBtn).toBeDisabled();
    });

    test("Next button advances to next question", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      await panel.locator("button", { hasText: "Next" }).click();
      await expect(page.locator("text=2 of 5").first()).toBeVisible();
    });

    test("can navigate back with Prev button", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      await panel.locator("button", { hasText: "Next" }).click();
      await expect(page.locator("text=2 of 5").first()).toBeVisible();
      await panel.locator("button", { hasText: "Prev" }).click();
      await expect(page.locator("text=1 of 5").first()).toBeVisible();
    });

    // ─── Yesterday's answers ───

    test("Yesterday's Answers toggle shows answers", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      await panel.locator("button", { hasText: "Yesterday's Answers" }).click();

      // Should show "Back to Today" link
      await expect(panel.locator("button", { hasText: "Back to Today" })).toBeVisible();
      // All options should be disabled in yesterday mode
      const options = panel.locator("button[class*='outline']");
      for (let i = 0; i < 4; i++) {
        await expect(options.nth(i)).toBeDisabled();
      }
    });

    // ─── Completion ───

    test("completing all 5 questions shows score badge and share button", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();

      for (let i = 0; i < 5; i++) {
        const options = panel.locator("button[class*='outline']");
        await options.first().click();
        if (i < 4) {
          await panel.locator("button", { hasText: "Next" }).click();
        }
      }

      // Score badge should appear (e.g. "Today: 3/5")
      await expect(panel.locator("text=/Today: \\d\\/5/")).toBeVisible();
      // Share button should appear
      await expect(panel.locator("button", { hasText: "Share" }).first()).toBeVisible();
    });

    test("completed state persists across reload", async ({ page }) => {
      await page.goto(`/${sport.id}`);
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panel = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();

      for (let i = 0; i < 5; i++) {
        const options = panel.locator("button[class*='outline']");
        await options.first().click();
        if (i < 4) {
          await panel.locator("button", { hasText: "Next" }).click();
        }
      }

      await page.reload();
      await page.waitForSelector("text=Jersey Numbers", { timeout: 10_000 });
      const panelAfter = page.locator("div.space-y-4", { has: page.locator("h2", { hasText: "Jersey Numbers" }) }).first();
      await expect(panelAfter.locator("text=/Today: \\d\\/5/")).toBeVisible();
    });
  });
}
