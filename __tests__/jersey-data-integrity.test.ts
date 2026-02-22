import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

import {
  mlbJerseyQuestions,
  getDailyJerseyQuestions as getMLBDaily,
  getJerseyTodayStorageKey as getMLBKey,
} from "@/lib/mlb-jersey-data";
import {
  nbaJerseyQuestions,
  getDailyJerseyQuestions as getNBADaily,
  getJerseyTodayStorageKey as getNBAKey,
} from "@/lib/nba-jersey-data";
import {
  nflJerseyQuestions,
  getDailyJerseyQuestions as getNFLDaily,
  getJerseyTodayStorageKey as getNFLKey,
} from "@/lib/nfl-jersey-data";
import {
  nhlJerseyQuestions,
  getDailyJerseyQuestions as getNHLDaily,
  getJerseyTodayStorageKey as getNHLKey,
} from "@/lib/nhl-jersey-data";

const ROOT = path.resolve(__dirname, "..");

const SPORTS = [
  { id: "mlb", questions: mlbJerseyQuestions, getDaily: getMLBDaily, getKey: getMLBKey },
  { id: "nba", questions: nbaJerseyQuestions, getDaily: getNBADaily, getKey: getNBAKey },
  { id: "nfl", questions: nflJerseyQuestions, getDaily: getNFLDaily, getKey: getNFLKey },
  { id: "nhl", questions: nhlJerseyQuestions, getDaily: getNHLDaily, getKey: getNHLKey },
] as const;

// ─── File existence ───

describe("Jersey data files exist", () => {
  for (const sport of SPORTS) {
    it(`lib/${sport.id}-jersey-data.ts exists`, () => {
      const filePath = path.join(ROOT, "lib", `${sport.id}-jersey-data.ts`);
      expect(fs.existsSync(filePath)).toBe(true);
    });
  }
});

// ─── Per-sport data integrity ───

for (const sport of SPORTS) {
  describe(`${sport.id.toUpperCase()} jersey data integrity`, () => {
    const questions = sport.questions;

    // Pool size
    it("has at least 60 questions", () => {
      expect(questions.length).toBeGreaterThanOrEqual(60);
    });

    // Unique IDs
    it("has no duplicate question IDs", () => {
      const ids = questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(ids.length);
    });

    // Unique players (extract name from question text)
    it("has no duplicate players", () => {
      const players = questions.map((q) => {
        const match = q.question.match(/did (.+?) wear/);
        return match ? match[1].toLowerCase() : q.question;
      });
      const seen = new Set<string>();
      const dupes: string[] = [];
      for (const p of players) {
        if (seen.has(p)) dupes.push(p);
        seen.add(p);
      }
      expect(dupes, `Duplicate players: ${dupes.join(", ")}`).toHaveLength(0);
    });

    // Question format
    it("every question matches expected format", () => {
      for (const q of questions) {
        expect(q.question).toMatch(/What number did .+ wear .+\?/);
      }
    });

    // Options validation
    it("every question has exactly 4 options", () => {
      for (const q of questions) {
        expect(q.options, `Question ${q.id} has ${q.options.length} options`).toHaveLength(4);
      }
    });

    it("every option is a non-empty string", () => {
      for (const q of questions) {
        for (const opt of q.options) {
          expect(typeof opt).toBe("string");
          expect(opt.trim().length).toBeGreaterThan(0);
        }
      }
    });

    it("no question has duplicate options", () => {
      for (const q of questions) {
        const unique = new Set(q.options);
        expect(unique.size, `Question ${q.id} has duplicate options`).toBe(q.options.length);
      }
    });

    // correctAnswer validation
    it("correctAnswer is a valid index (0-3)", () => {
      for (const q of questions) {
        expect(q.correctAnswer).toBeGreaterThanOrEqual(0);
        expect(q.correctAnswer).toBeLessThanOrEqual(3);
        expect(Number.isInteger(q.correctAnswer)).toBe(true);
      }
    });

    // Explanation
    it("every question has a non-empty explanation", () => {
      for (const q of questions) {
        expect(q.explanation.trim().length, `Question ${q.id} has empty explanation`).toBeGreaterThan(0);
      }
    });

    // Explanation mentions the correct answer number
    it("explanation references the correct jersey number", () => {
      for (const q of questions) {
        const correctNumber = q.options[q.correctAnswer];
        expect(
          q.explanation.includes(`#${correctNumber}`) || q.explanation.includes(correctNumber),
          `Question ${q.id}: explanation doesn't mention #${correctNumber}`
        ).toBe(true);
      }
    });
  });
}

// ─── Daily question selection ───

for (const sport of SPORTS) {
  describe(`${sport.id.toUpperCase()} getDailyJerseyQuestions`, () => {
    it("returns exactly 5 questions", () => {
      const questions = sport.getDaily(new Date("2026-02-21"));
      expect(questions).toHaveLength(5);
    });

    it("returns the same questions for the same date", () => {
      const date = new Date("2026-03-15");
      const first = sport.getDaily(date);
      const second = sport.getDaily(date);
      expect(first.map((q) => q.id)).toEqual(second.map((q) => q.id));
    });

    it("returns different questions for different dates", () => {
      const day1 = sport.getDaily(new Date("2026-01-01"));
      const day2 = sport.getDaily(new Date("2026-01-02"));
      const ids1 = day1.map((q) => q.id);
      const ids2 = day2.map((q) => q.id);
      expect(ids1).not.toEqual(ids2);
    });

    it("returns no duplicate questions within a day", () => {
      const questions = sport.getDaily(new Date("2026-06-15"));
      const ids = questions.map((q) => q.id);
      expect(new Set(ids).size).toBe(5);
    });

    it("all returned questions come from the question pool", () => {
      const questions = sport.getDaily(new Date("2026-07-04"));
      const poolIds = new Set(sport.questions.map((q) => q.id));
      for (const q of questions) {
        expect(poolIds.has(q.id), `Question ${q.id} not in pool`).toBe(true);
      }
    });

    it("uses current date when no argument is passed", () => {
      const questions = sport.getDaily();
      expect(questions).toHaveLength(5);
    });

    it("cycles through all questions over enough days", () => {
      const seenIds = new Set<number>();
      const cycleLength = Math.floor(sport.questions.length / 5);
      const baseDate = new Date("2026-01-01");
      for (let i = 0; i < cycleLength; i++) {
        const d = new Date(baseDate);
        d.setDate(d.getDate() + i);
        const daily = sport.getDaily(d);
        for (const q of daily) seenIds.add(q.id);
      }
      // After one full cycle, we should see most of the pool
      expect(seenIds.size).toBeGreaterThanOrEqual(cycleLength * 5 * 0.9);
    });
  });
}

// ─── Storage key ───

for (const sport of SPORTS) {
  describe(`${sport.id.toUpperCase()} getJerseyTodayStorageKey`, () => {
    it("returns correct format", () => {
      const key = sport.getKey(new Date(2026, 1, 21)); // Feb 21, 2026 (local)
      expect(key).toBe(`${sport.id}-jersey-2026-2-21`);
    });

    it("uses 1-based month", () => {
      const key = sport.getKey(new Date(2026, 11, 1)); // Dec 1, 2026 (local)
      expect(key).toBe(`${sport.id}-jersey-2026-12-1`);
    });

    it("different dates produce different keys", () => {
      const key1 = sport.getKey(new Date("2026-01-01"));
      const key2 = sport.getKey(new Date("2026-01-02"));
      expect(key1).not.toBe(key2);
    });

    it("uses current date when no argument is passed", () => {
      const key = sport.getKey();
      expect(key).toMatch(new RegExp(`^${sport.id}-jersey-\\d{4}-\\d{1,2}-\\d{1,2}$`));
    });
  });
}
