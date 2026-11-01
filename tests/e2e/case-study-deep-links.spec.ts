import { test, expect } from "@playwright/test";

const ROUTES = [
  "/work",
  "/work/goldman-sachs-platform-engineering",
  "/work/runreviq",
  "/work/job-intake-service",
  "/work/aws-microservices-cdk-ecs",
  "/work/automation-framework",
  "/work/keycloak-identity-flow",
  "/work/kafka-strimzi-upgrade",
  "/work/kubernetes-cicd-reliability",
  "/work/rfid-pin-authentication-research",
  "/notes",
];

for (const route of ROUTES) {
  test(`deep link loads and renders an <h1> for ${route}`, async ({ page }) => {
    const res = await page.goto(route);
    expect(res?.status(), `status for ${route}`).toBeLessThan(400);
    await expect(page.locator("h1").first()).toBeVisible();
    const y = await page.evaluate(() => window.scrollY);
    if (!page.url().includes("#")) expect(y).toBeLessThan(120);
    else await expect(page.locator(`#${new URL(page.url()).hash.slice(1)}`)).toBeVisible();
  });
}
