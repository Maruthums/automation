const { Given } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { expect } = require("@playwright/test");
const { SnowflakeDashboard } = require("../pages/SnowflakeDashboard");

let snowflakeDashboard;

Given(
  "navigates the user to snowflake dashboard via sidebar",
  async function () {
    snowflakeDashboard = new SnowflakeDashboard(pageFixture.page);
    await snowflakeDashboard.clickAction(snowflakeDashboard.sidebar);
    await snowflakeDashboard.validateToHaveText(
      snowflakeDashboard.pageTitle,
      /Registration & Performance Dashboard/,
    );
    await snowflakeDashboard.takeScreenShot("SnowflakeDashboard",  "registration-Performance");
    await Promise.all([
      snowflakeDashboard.page.waitForResponse(
        (resp) =>
          resp.url().includes("snowflake/registration-dashboard") &&
          resp.status() === 200,
      ),
    ]);

    await expect(snowflakeDashboard.defaultCampLocator).toBeVisible();
    await snowflakeDashboard.defaultCampLocator.click();

    await snowflakeDashboard.validateToHaveText(
      snowflakeDashboard.pageTitle,
      /Towers Camper Goals/,
    );
    await snowflakeDashboard.takeScreenShot("SnowflakeDashboard",  "towers-camper-goals");
    await Promise.all([
      snowflakeDashboard.page.waitForResponse(
        (resp) =>
          resp.url().includes("snowflake/registration-details") &&
          resp.status() === 200,
      ),
    ]);

    const totalText =
      await snowflakeDashboard.registrationsTotalLocator.textContent();
    const totalNumber = parseInt(totalText.replace(/,/g, ""), 10);
    await expect(totalNumber).toBeGreaterThan(0);

    await expect(snowflakeDashboard.registrationsGenderLocator).toBeVisible();
    await snowflakeDashboard.validateToHaveText(
      snowflakeDashboard.registrationsGenderLocator,
      /Registrations by Gender/,
    );
    await snowflakeDashboard.takeScreenShot("SnowflakeDashboard",  "registrations-gender");
    await expect(snowflakeDashboard.registrationsBoysLocator).toBeVisible();
    await expect(snowflakeDashboard.registrationsGirlsLocator).toBeVisible();
  },
);
