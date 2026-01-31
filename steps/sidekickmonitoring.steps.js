const { Given, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { expect } = require("@playwright/test");
const { SidekickMonitoring } = require("../pages/SidekickMonitoring");

let sidekickMonitoring;

Given(
  "the user navigates to the Sidekick Monitoring Page via the Tools",
  async function () {
    sidekickMonitoring = new SidekickMonitoring(pageFixture.page);
    // Navigate via tools menu
    await sidekickMonitoring.clickAction(sidekickMonitoring.toolsLink);
    await sidekickMonitoring.clickAction(
      sidekickMonitoring.sidekickMonitoringLink,
    );

    // Validate page title
    await sidekickMonitoring.validateToHaveText(
      sidekickMonitoring.pageTitle,
      /Sidekick Device Monitoring/,
    );
  },
);

Then("validate the sidekick devices list", async function () {
  await expect(sidekickMonitoring.table).toBeVisible();

  // Ensure at least one table is present
  await expect(sidekickMonitoring.table).toHaveCount(1);

  // Validate rows
  const rowCount = await sidekickMonitoring.getRowCount();
  expect(rowCount).toBeGreaterThan(0);
  await sidekickMonitoring.takeScreenShot("SidekickMonitoring",  "sidekick-devices-list");
  console.log(`✅ Number of devices listed: ${rowCount}`);
});
