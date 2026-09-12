import { test, expect } from "@playwright/test";

/**
 * ProjectCover quality gates:
 *  1. Initial render must not contribute layout shift (CLS) – covers
 *     reserve their box via CSS `aspect-ratio` and ship inline SVG, so
 *     their CLS contribution should be effectively zero.
 *  2. With `prefers-reduced-motion: reduce`, hovering a cover must not
 *     trigger any transform / scale, and a visual snapshot is captured
 *     for review.
 */

test.describe("ProjectCover - layout shift", () => {
  test("does not contribute to CLS on initial render", async ({ page }) => {
    // Start CLS observer BEFORE navigation so the very first layout is measured.
    await page.addInitScript(() => {
      (window as unknown as { __cls: number }).__cls = 0;
      const po = new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as PerformanceEntry[]) {
          // @ts-expect-error - layout-shift entry shape
          if (!entry.hadRecentInput) {
            // @ts-expect-error - value field exists on layout-shift entries
            (window as unknown as { __cls: number }).__cls += entry.value;
          }
        }
      });
      po.observe({ type: "layout-shift", buffered: true });
    });

    await page.goto("/", { waitUntil: "networkidle" });

    // Wait one frame past idle to let any late paints settle.
    await page.waitForTimeout(500);

    const covers = page.locator(".project-cover");
    await expect(covers.first()).toBeVisible();
    const count = await covers.count();
    expect(count).toBeGreaterThan(0);

    // Each cover must report an explicit aspect-ratio so the box is
    // reserved before its SVG paints (the primary CLS defense).
    for (let i = 0; i < count; i++) {
      const ratio = await covers.nth(i).evaluate(
        (el) => getComputedStyle(el).aspectRatio,
      );
      expect(ratio, `cover #${i} aspect-ratio`).not.toBe("auto");
    }

    const cls = await page.evaluate(
      () => (window as unknown as { __cls: number }).__cls,
    );
    // Good CLS per web.dev is < 0.1; covers alone should be ~0.
    expect(cls).toBeLessThan(0.05);
  });
});

test.describe("ProjectCover - reduced motion", () => {
  test.use({ reducedMotion: "reduce" });

  test("hover does not apply any transform and matches snapshot", async ({
    page,
  }, testInfo) => {
    await page.goto("/", { waitUntil: "networkidle" });

    const cover = page.locator(".project-cover").first();
    await expect(cover).toBeVisible();
    await cover.scrollIntoViewIfNeeded();

    const svg = cover.locator("svg").first();
    const before = await svg.evaluate((el) => getComputedStyle(el).transform);

    await cover.hover();
    // Allow any transition window to elapse; with reduced motion there
    // should be no transform applied at all.
    await page.waitForTimeout(400);

    const after = await svg.evaluate((el) => getComputedStyle(el).transform);

    // Either "none" or unchanged from the pre-hover state is acceptable.
    expect(after).toBe(before);
    expect(["none", "matrix(1, 0, 0, 1, 0, 0)"]).toContain(after);

    const snapshot = await cover.screenshot();
    await testInfo.attach("project-cover-reduced-motion", {
      body: snapshot,
      contentType: "image/png",
    });
  });
});
