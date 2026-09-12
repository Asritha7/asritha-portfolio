import { test, expect } from "@playwright/test";

test.describe("Navigation: Back to all work + Home", () => {
  test("'← Back to all work' on a case study lands at /work top", async ({ page }) => {
    await page.goto("/");
    // Scroll to experience/work area on home before navigating in
    await page.evaluate(() => window.scrollTo(0, 1500));
    await page.goto("/work/aws-microservices-cdk-ecs");
    await expect(page).toHaveURL(/\/work\/aws-microservices-cdk-ecs$/);

    const backLink = page.getByRole("link", { name: /back to all work/i }).first();
    await backLink.click();

    await expect(page).toHaveURL(/\/work(\?|$|\/$)/);
    const y = await page.evaluate(() => window.scrollY);
    expect(y).toBeLessThan(120);
  });

  test("'← Home' on /work always navigates to homepage top", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, 2000));
    await page.goto("/work");

    const homeLink = page.getByRole("link", { name: /^←\s*home$/i });
    await homeLink.click();

    await expect(page).toHaveURL(/\/$/);
    const y = await page.evaluate(() => window.scrollY);
    expect(y).toBeLessThan(80);
  });
});

test.describe("Hash deep links smooth-scroll to section", () => {
  const sections = ["work", "experience", "principles", "capabilities", "contact"];

  for (const id of sections) {
    test(`deep link /#${id} scrolls section into view`, async ({ page }) => {
      await page.goto(`/#${id}`);
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
    await page.goto("/");
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
