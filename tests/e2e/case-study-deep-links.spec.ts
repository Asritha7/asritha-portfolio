import { test, expect } from "@playwright/test";

const ROUTES = [
  "/work",
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
    expect(y).toBeLessThan(120);
  });
}
