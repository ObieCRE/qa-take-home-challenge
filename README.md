# Obie QA Engineer - Take-Home Challenge

Welcome! This repo contains **Obie**, a small insurance management application with a React frontend and Node.js API backend. Your task is to write end-to-end tests using **Playwright** and **TypeScript**.

## The Application

Obie lets insurance professionals manage policies and claims. It includes:

| Page                    | Description                                                             |
| ----------------------- | ----------------------------------------------------------------------- |
| **Login**               | Email/password authentication (3 test accounts available)               |
| **Dashboard**           | Summary stats - active policies, open claims, written premium, reserves |
| **Policies**            | Searchable, sortable, filterable table of insurance policies            |
| **Policy Detail**       | Policy information with related claims                                  |
| **Claims**              | Searchable, sortable, filterable table of claims                        |
| **File a Claim (FNOL)** | Form to submit a First Notice of Loss with server-side validation       |

### Test Accounts

| Email                  | Password        | Role        |
| ---------------------- | --------------- | ----------- |
| `adjuster@obieinsurance.com`    | `claims123`     | Adjuster    |
| `underwriter@obieinsurance.com` | `underwrite456` | Underwriter |
| `admin@obieinsurance.com`       | `admin789`      | Admin       |

## Prerequisites

This project uses [Yarn 4](https://yarnpkg.com/) (Berry) as the package manager. If you don't have it installed:

```bash
# Enable Corepack (ships with Node.js 16+)
corepack enable

# That's it - Yarn 4 will auto-install when you run `yarn` in this project
```

> **Note:** If you're using nvm or similar, make sure Corepack is enabled for your active Node version. You need **Node.js 18+**.

## Getting Started

```bash
# Install dependencies
yarn

# Install Playwright browsers
yarn playwright install chromium

# Start both servers (API :3100, Web :3200)
yarn dev

# Run the example test
yarn test:e2e

# Run tests with the Playwright UI
yarn test:e2e:ui
```

## Your Task

We've provided two starter tests in the `e2e/` directory:

- **`login.spec.ts`** - A working example to show the basic setup
- **`policies.spec.ts`** - A **flaky test** that passes sometimes but isn't reliable. Your first job is to identify what's wrong with it and fix it.

From there, expand the test suite to cover the application meaningfully.

### What to Test

Write Playwright tests that cover the following areas. You don't need to test _everything_ - focus on demonstrating good judgment about **what** to test and **how** to structure your tests.

1. **Authentication** - Login success/failure, logout, protected routes
2. **Dashboard** - Stats render correctly, data makes sense
3. **Policies List** - Search, filter by status & line of business, column sorting
4. **Policy Detail** - Navigation, data displayed, related claims
5. **Claims List** - Search, filter, sort
6. **File a Claim (FNOL)** - Happy path, validation errors, edge cases (inactive policy, loss date outside policy period, description too short)

### What We're Looking For

- **Test design** - Are the right things being tested? Do tests cover meaningful user flows?
- **Reliability** - Tests should pass consistently, not depend on timing hacks
- **Readability** - Clear test names, well-organized, easy to understand
- **TypeScript** - Proper typing, no `any` where avoidable

### What We're _Not_ Looking For

- 100% coverage - quality over quantity
- Visual/screenshot testing - unless you want to
- CI/CD setup - local execution is fine

### Time Expectation

This should take roughly **2-3 hours** - we don't want this to take up your full day! Focus on quality over quantity. If there are things you didn't get to, please describe what you would have done with more time and how you would have approached it. We value your thinking as much as your code.

We'll iterate on the code together in the next round, so don't over-engineer it.

## Requirements

For your submission to be considered complete, please ensure the following:

1. **Fix the flaky test** - `e2e/policies.spec.ts` has reliability issues. Fix it and briefly explain what was wrong
2. **Tests run and pass** - `yarn test:e2e` should execute your tests successfully with no manual steps required
3. **Meaningful coverage** - Write tests with real depth, not just "element is visible" checks. We'd rather see a few well-thought-out tests than broad but shallow coverage
4. **At least one FNOL validation test** - The File a Claim form is the richest testing surface in this app; demonstrate that you can reason about its business rules
5. **No modifications to application code** - Test the app as-is; don't change the frontend or backend source
6. **Include a “My Approach” section in this README** - Add a section at the bottom covering:
   - What you chose to test and why
   - What you fixed in the flaky test and what was wrong
   - What you would improve, add, or refactor with more time
   - Any trade-offs or decisions worth calling out

### Submission

Please create a private GitHub repo and add **@schester44 @obie-andrewpaynter @freakaziod210 @overlandandseas @TBakes** as contributors.

## Project Structure

```
├── apps/
│   ├── server/
│   │   └── src/
│   │       ├── index.ts    # Express API server
│   │       └── data.ts     # In-memory insurance data
│   └── web/
│       └── src/
│           ├── App.tsx     # Router + layout
│           ├── api.ts      # API client
│           ├── pages/      # Page components
│           └── components/ # Shared components
├── e2e/
│   └── login.spec.ts       # Example test (start here)
├── playwright.config.ts    # Playwright configuration
├── package.json            # Yarn workspaces root
└── .yarnrc.yml             # Yarn 4 configuration
```

## API Reference

All API routes require a `Bearer` token (obtained via login) except `/api/auth/login`.

| Method | Route                                                              | Description                    |
| ------ | ------------------------------------------------------------------ | ------------------------------ |
| `POST` | `/api/auth/login`                                                  | Login → `{ token, user }`      |
| `POST` | `/api/auth/logout`                                                 | Logout                         |
| `GET`  | `/api/dashboard`                                                   | Dashboard statistics           |
| `GET`  | `/api/policies?status=&lineOfBusiness=&search=&sortBy=&sortOrder=` | List policies                  |
| `GET`  | `/api/policies/:id`                                                | Policy detail + related claims |
| `GET`  | `/api/claims?status=&policyId=&search=&sortBy=&sortOrder=`         | List claims                    |
| `GET`  | `/api/claims/:id`                                                  | Claim detail                   |
| `POST` | `/api/claims`                                                      | File a new claim (FNOL)        |

## Tips

- The app uses `data-testid` attributes on key elements - use them!
- The backend stores data in-memory, so it resets on restart
- Playwright's [auto-waiting](https://playwright.dev/docs/actionability) handles most timing issues - avoid explicit waits
- Consider using [Playwright fixtures](https://playwright.dev/docs/test-fixtures) for auth state

---

Questions? Comments?
Please don't hesitate to email us.
