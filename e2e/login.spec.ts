import { test, expect } from "@playwright/test";

// This is a sample test to get you started.
// Your task is to expand test coverage across the application.

test.describe("Login", () => {
  test("should log in with valid credentials and reach the dashboard", async ({ page }) => {
    await page.goto("/login");

    await page.getByTestId("username-input").fill("adjuster@obieinsurance.com");
    await page.getByTestId("password-input").fill("claims123");
    await page.getByTestId("login-button").click();

    // Should redirect to dashboard
    await expect(page).toHaveURL("/");
    await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
    await expect(page.getByTestId("user-name")).toHaveText("Karen Mitchell");
  });
});
