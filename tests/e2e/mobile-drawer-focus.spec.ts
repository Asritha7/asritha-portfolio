import { test, expect } from "@playwright/test";

test.skip(({ viewport }) => !viewport || viewport.width >= 768, "Mobile drawer is only visible at <768px widths");

test("mobile drawer: focus returns to menu button after close", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /open menu|menu/i }).first();
  await menuButton.click();

  // Drawer should be open; press Escape to close
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);

  const focusedLabel = await page.evaluate(() => {
    const el = document.activeElement as HTMLElement | null;
    return el?.getAttribute("aria-label") ?? el?.textContent?.trim() ?? "";
  });
  expect(focusedLabel.toLowerCase()).toMatch(/menu/);
});

test("mobile drawer: tapping a link closes the drawer", async ({ page }) => {
  await page.goto("/");
  const menuButton = page.getByRole("button", { name: /open menu|menu/i }).first();
  await menuButton.click();
  const drawer = page.locator("#mobile-nav");
  await expect(drawer).toHaveCount(1);
  await drawer.getByRole("link", { name: /^contact$/i }).click();
  await expect(drawer).toHaveCount(0);
  await expect(page).toHaveURL(/#contact$/);
});
