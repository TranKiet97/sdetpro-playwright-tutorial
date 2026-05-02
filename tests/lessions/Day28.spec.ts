import { test, expect } from "@playwright/test";

// Fixture: Setup and provide by defaults: 5 fixtures (page, context, browser, request, and baseURL).
test("Link text - CSS", async ({ page }) => {
  await page.goto("/");
  const linkText = page.locator("a:has-text('Multiple Windows')");
  await expect(linkText).toBeVisible();
});

test("Link text - Filtering", async ({ page }) => {
  await page.goto("/");
  const links = page.locator("a");
  // filtering can use chainable
  await links.filter({ hasText: "Dropdown" }).first().click();
  await expect(page.locator("h3")).toHaveText("Dropdown List");
});

test("Default dropdown handling", async ({ page }) => {
  await page.goto("/dropdown");
  const dropdown = page.locator("#dropdown");
  await dropdown.selectOption({"label": "Option 2"});
  await expect(dropdown).toHaveValue("2");
});

test("iFrame handling", async ({ page }) => {
  await page.goto("/iframe");
  const frame = page.frameLocator("iframe[id^='mce']");
  const editor = frame.locator("body p");
  await expect(editor).toHaveText("Your content goes here.");
});

test("Execute JS Snippet without parameters", async ({ page }) => {
  await page.goto("/floating_menu");
  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });

  await expect(page.locator('#menu')).toBeInViewport();
});

test("Execute JS Snippet with parameters", async ({ page }) => {
  await page.goto("/floating_menu");
  const scrollPercentage = 0.5;
  await page.evaluate((percentage) => {
    window.scrollTo(0, document.body.scrollHeight*percentage);
  }, scrollPercentage);

  await expect(page.locator('#menu')).toBeInViewport();
});
