const { Given, When } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { Reports } = require("../pages/Reports");
require("../common/hooks");

let reports;

Given("user is logged in and on the Reports page", async function () {
  reports = new Reports(pageFixture.page);
  await reports.clickAction(reports.reportsSidebar);
  await reports.validateToHaveText(reports.pageTitle, /Reports/);
});

When("user selects filters and downloads reports", async function (dataTable) {
  const filters = dataTable.hashes();

  for (const { year, camp, week, report } of filters) {
    console.log(
      `\nRunning reports check for ${year} | ${camp} | ${week} | ${report}`,
    );
    await reports.applyFilters(year, camp, week);
    await reports.downloadReports(year, camp, week, report);
  }
});
