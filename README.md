# Playwright Cucumber Pinecove

This project uses **Playwright** with **Cucumber.js** for Bridge Mgmt UI testing.
It includes reporting, screenshots, and modular step definitions for better maintainability.

---

## 🚀 Setup

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

---

## 🧪 Running Tests

### Run entire test suite

```bash
npm run test
```

### Run a single feature file

```bash
npx cucumber-js "<featureName>"
```

### Run failed scenarios only

```bash
npm run test:failed
```

---

## 📊 Reports

* After test execution, reports are generated in the `reports/` folder.
* To generate and view the report:

```bash
npm run report
```

### Reports include:

* HTML reports (via **cucumber-html-reporter**)
* Test execution results (scenarios, steps, and failures)

---

## 📸 Screenshots & Photos

* Screenshots are captured automatically on test failures.
* Stored in the `test-result/screenshots/`.

---

## 📝 Test Data Implementation

* All test data is maintained in the testData.js file.
* Related input photos must be placed in their respective folders under the Photos/ directory.
* Update the values inside testData.js with your required test data before running automation.

### ⚠️ Key Notes

* Always update testData.js with your own values before running automation.
* Ensure photo files are placed in the correct folder paths with the same fileName mentioned in testData.js.
* Weekly data (like camper registrations) must be refreshed before running validation tests.

---

## 📦 Covered Modules

* Dashboard
* Camper Accounts
* Staff Accounts
* Admin User -> User Management
* Admin User -> Roles
* Snowflake Dashboard
* Sidekick App Monitoring
* Tools -> Camper Headshot Manager
* Tools -> My Week Schedule Builder
* Tools -> Camp Update Post
* Tools -> Cabin Photos
* Tools -> Family Photos
* Reports
* Survey -> Response
* Tableau Dashboard
* Settings
* Settings -> Camp Maps
* iCampPro Registration