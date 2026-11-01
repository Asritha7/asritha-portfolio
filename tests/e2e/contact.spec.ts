import { test, expect } from "@playwright/test";
import { validateContactRequest } from "../../src/lib/contact-validation";

const valid = { name: "QA Reviewer", email: "reviewer@example.com", message: "Local test only." };
const requestFor = (body: unknown) =>
  new Request("https://example.com/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

test("contact accepts valid bounded fields", async () => {
  const result = await validateContactRequest(requestFor(valid));
  expect(result.ok).toBe(true);
  if (!result.ok || result.spam) throw new Error("Expected valid contact input");
  expect(result.data.email).toBe("reviewer@example.com");
});

for (const body of [
  null,
  [],
  { ...valid, name: 12 },
  { ...valid, email: "invalid" },
  { ...valid, message: "" },
]) {
  test(`contact rejects malformed fields: ${JSON.stringify(body)}`, async () => {
    const result = await validateContactRequest(requestFor(body));
    expect(result).toMatchObject({ ok: false, status: 400 });
  });
}

for (const [field, length] of [
  ["name", 101],
  ["email", 201],
  ["message", 2001],
] as const) {
  test(`contact rejects oversized ${field}`, async () => {
    expect(
      await validateContactRequest(requestFor({ ...valid, [field]: "a".repeat(length) })),
    ).toMatchObject({ ok: false, status: 400 });
  });
}

test("contact rejects oversized bodies before parsing", async () => {
  expect(await validateContactRequest(requestFor({ padding: "x".repeat(16_385) }))).toMatchObject({
    ok: false,
    status: 413,
  });
});

test("contact honeypot retains silent spam rejection", async () => {
  expect(await validateContactRequest(requestFor({ ...valid, website: "spam" }))).toEqual({
    ok: true,
    spam: true,
  });
});

test("contact rejects malformed JSON and unsupported content type", async () => {
  const malformed = new Request("https://example.com", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: "{",
  });
  expect(await validateContactRequest(malformed)).toMatchObject({ ok: false, status: 400 });
  const text = new Request("https://example.com", { method: "POST", body: "text" });
  expect(await validateContactRequest(text)).toMatchObject({ ok: false, status: 415 });
});

test("contact validation, loading, single submission and success use mocked delivery", async ({
  page,
}) => {
  let calls = 0;
  await page.route("**/api/public/contact", async (route) => {
    calls += 1;
    await new Promise((resolve) => setTimeout(resolve, 300));
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  await page.goto("/#contact", { waitUntil: "networkidle" });
  const send = page.getByRole("button", { name: "Send message" });
  await send.click();
  await expect(page.getByLabel("Name", { exact: true })).toBeFocused();
  expect(calls).toBe(0);
  await page.getByLabel("Name", { exact: true }).fill(valid.name);
  await page.getByLabel("Email", { exact: true }).fill("invalid");
  await page.getByLabel("Message", { exact: true }).fill(valid.message);
  await send.click();
  await expect(page.getByLabel("Email", { exact: true })).toBeFocused();
  expect(calls).toBe(0);
  await page.getByLabel("Email", { exact: true }).fill(valid.email);
  await send.click();
  await expect(page.getByRole("button", { name: "Sending" })).toBeDisabled();
  await page
    .locator("form")
    .evaluate((form) =>
      form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true })),
    );
  await expect(page.getByRole("status")).toContainText("Your message has been sent");
  expect(calls).toBe(1);
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue("");
});

test("contact shows safe failure feedback without exposing provider details", async ({ page }) => {
  await page.route("**/api/public/contact", (route) =>
    route.fulfill({ status: 502, body: '{"error":"private provider details"}' }),
  );
  await page.goto("/#contact", { waitUntil: "networkidle" });
  await page.getByLabel("Name", { exact: true }).fill(valid.name);
  await page.getByLabel("Email", { exact: true }).fill(valid.email);
  await page.getByLabel("Message", { exact: true }).fill(valid.message);
  await page.getByRole("button", { name: "Send message" }).click();
  await expect(page.getByRole("alert")).toContainText("Something went wrong");
  await expect(page.getByRole("alert")).not.toContainText("private provider");
  await expect(page.getByLabel("Message", { exact: true })).toHaveValue(valid.message);
});
