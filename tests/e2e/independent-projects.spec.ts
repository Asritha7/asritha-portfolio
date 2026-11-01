import { test, expect } from "@playwright/test";

for (const slug of ["runreviq", "job-intake-service"]) {
  test(`${slug} is discoverable from home and links to its source`, async ({ page }) => {
    await page.goto("/", { waitUntil: "networkidle" });
    await page.locator(`#public-work a[href="/work/${slug}"]`).click();
    await expect(page).toHaveURL(new RegExp(`/work/${slug}$`));
    await expect(page.getByRole("link", { name: "View GitHub" })).toHaveAttribute(
      "href",
      `https://github.com/Asritha7/${slug}`,
    );
  });
}
