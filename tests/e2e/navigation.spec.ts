import { test, expect } from "@playwright/test";

test.describe("Navigation: return to the originating page", () => {
  test("case-study Back returns to the filtered work index", async ({ page }) => {
    await page.goto("/work?category=backend", { waitUntil: "networkidle" });
    await page.locator('a[href="/work/job-intake-service"]').click();
    await expect(page).toHaveURL(/\/work\/job-intake-service$/);

    const backLink = page.getByRole("link", { name: /back to work/i }).first();
    await backLink.click();

    await expect(page).toHaveURL(/\/work\/?\?category=backend$/);
  });

  test("work Back returns to the homepage", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.getByRole("link", { name: "View my work" }).first().click();

    const homeLink = page.getByRole("link", { name: /^←\s*back$/i });
    await homeLink.click();

    await expect(page).toHaveURL(/\/$/);
  });
});

test.describe("Hash deep links smooth-scroll to section", () => {
  const sections = ["work", "experience", "principles", "capabilities", "contact"];

  for (const id of sections) {
    test(`deep link /#${id} scrolls section into view`, async ({ page }) => {
      await page.goto(`/#${id}`, { waitUntil: "networkidle" });
      const section = page.locator(`#${id}`);
      await expect(section).toBeVisible();
      // Allow smooth scroll to settle
      await page.waitForTimeout(800);
      const inView = await section.evaluate((el) => {
        const r = el.getBoundingClientRect();
        return r.top >= -2 && r.top < window.innerHeight * 0.6;
      });
      expect(inView).toBe(true);
    });
  }

  test("hash change after load smooth-scrolls", async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.evaluate(() => {
      window.location.hash = "contact";
    });
    await page.waitForTimeout(800);
    const inView = await page.locator("#contact").evaluate((el) => {
      const r = el.getBoundingClientRect();
      return r.top >= -2 && r.top < window.innerHeight * 0.6;
    });
    expect(inView).toBe(true);
  });
});
