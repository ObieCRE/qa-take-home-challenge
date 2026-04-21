import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "./e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    baseURL: "http://localhost:3200",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
  webServer: [
    {
      command: "yarn workspace server dev",
      port: 3100,
      reuseExistingServer: !process.env.CI,
    },
    {
      command: "yarn workspace web dev",
      port: 3200,
      reuseExistingServer: !process.env.CI,
    },
  ],
});
