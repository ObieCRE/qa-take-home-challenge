import { test, expect } from "@playwright/test";

test.describe("Policies", () => {
  test.beforeEach(async ({ page }) => {
    // Log in before each test
    await page.goto("/login");
    await page.getByTestId("username-input").fill("adjuster@obieinsurance.com");
    await page.getByTestId("password-input").fill("claims123");
    await page.getByTestId("login-button").click();
    await page.waitForTimeout(1000);
  });

  test("should filter policies by active status and display correct count", async ({ page }) => {
    await page.goto("/policies");
    await page.waitForTimeout(500);

    // Filter to active policies
    await page.getByTestId("status-filter").selectOption("Active");
    await page.waitForTimeout(300);

    // Verify the count
    const countText = await page.getByTestId("policy-count").innerText();
    expect(countText).toBe("6 policies");

    // Verify the table shows the right number of rows
    const rows = await page.locator("table tbody tr").all();
    expect(rows.length).toBe(6);

    // Verify all visible policies have Active status
    for (const row of rows) {
      const badge = await row.locator(".badge").innerText();
      expect(badge).toBe("Active");
    }
  });
});
