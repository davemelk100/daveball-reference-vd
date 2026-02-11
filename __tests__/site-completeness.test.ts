import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";
import { MUSIC_SITES } from "@/lib/music-site";
import {
  REQUIRED_ROUTES,
  REQUIRED_COMPONENTS,
  REQUIRED_CONFIG_FIELDS,
} from "@/lib/schemas/site-registry";

const ROOT = path.resolve(__dirname, "..");

describe("Site completeness", () => {
  for (const site of MUSIC_SITES) {
    describe(`${site.shortName} (${site.id})`, () => {
      for (const route of REQUIRED_ROUTES) {
        it(`has route: ${route}`, () => {
          const filePath = path.join(ROOT, "app", site.id, route);
          expect(fs.existsSync(filePath), `Missing route: app/${site.id}/${route}`).toBe(true);
        });
      }

      for (const component of REQUIRED_COMPONENTS) {
        const resolved = component.replace(/\{siteId\}/g, site.id);
        it(`has component: ${resolved}`, () => {
          const filePath = path.join(ROOT, "components", site.id, resolved);
          expect(fs.existsSync(filePath), `Missing component: components/${site.id}/${resolved}`).toBe(true);
        });
      }

      it("has trivia data file", () => {
        const filePath = path.join(ROOT, "lib", `${site.id}-trivia-data.ts`);
        expect(fs.existsSync(filePath), `Missing trivia data: lib/${site.id}-trivia-data.ts`).toBe(true);
      });

      for (const field of REQUIRED_CONFIG_FIELDS) {
        it(`config has required field: ${field}`, () => {
          expect(site).toHaveProperty(field);
          const value = site[field as keyof typeof site];
          expect(value, `Config field "${field}" is empty`).toBeTruthy();
        });
      }
    });
  }
});
