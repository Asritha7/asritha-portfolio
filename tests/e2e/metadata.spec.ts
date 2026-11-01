import { test, expect } from "@playwright/test";

const paths = [
  "/",
  "/work",
  "/work/runreviq",
  "/work/job-intake-service",
  "/notes",
  "/notes/keycloak-configuration-drift",
  "/notes/kafka-strimzi-upgrade-checklist",
  "/notes/kubernetes-deployment-debugging",
];

test("canonical content pages have leaf metadata and sitemap entries", async ({
  page,
  request,
}) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const sitemap = await response.text();
  const titles = new Set<string>();
  for (const path of paths) {
    await page.goto(path, { waitUntil: "networkidle" });
    const canonical = `https://asritha.dev${path}`;
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", canonical);
    await expect(page.locator('meta[name="description"]')).toHaveAttribute("content", /\S/);
    await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", /\S/);
    await expect(page.locator('meta[property="og:description"]')).toHaveAttribute("content", /\S/);
    await expect(page.locator('meta[name="twitter:card"]')).toHaveCount(1);
    const title = await page.title();
    expect(titles.has(title)).toBe(false);
    titles.add(title);
    expect(sitemap).toContain(`<loc>${canonical}</loc>`);
  }
});

test("honeypot cannot receive focus and only one technology list is accessible", async ({
  page,
}) => {
  await page.goto("/", { waitUntil: "networkidle" });
  const honeypot = page.locator("#cf-hp");
  await expect(honeypot).toHaveAttribute("aria-hidden", "true");
  await expect(honeypot).toHaveAttribute("tabindex", "-1");
  await expect(honeypot).toHaveAttribute("autocomplete", "off");
  await honeypot.evaluate((element) => (element as HTMLElement).focus());
  await expect(honeypot).not.toBeFocused();
  await expect(page.locator('.marquee-strip[aria-hidden="true"]')).toHaveCount(1);
  await expect(page.locator('ul.sr-only[aria-label="Technologies"]')).toHaveCount(1);
});
