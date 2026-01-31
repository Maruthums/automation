const { Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { Dashboard } = require("../pages/Dashboard");
const constants = require("../common/constants");

let dashboard;

Then("the page header should be {string}", async function (pageHeader) {
  dashboard = new Dashboard(pageFixture.page);
  await dashboard.validateToHaveText(dashboard.pageHeader, pageHeader);
});

Then("click the {string} button", async function (buttonName) {
  dashboard = new Dashboard(pageFixture.page);
  await dashboard.clickAction(dashboard.ButtonName(buttonName));
});

Then(
  "the default button text should display {string}",
  async function (buttonText) {
    await dashboard.validateToHaveText(
      dashboard.ButtonText(buttonText),
      buttonText,
    );
  },
);

Then(
  "Under Sidekick Mobile tab select latest version and download the Sidekick APK file",
  async function () {
    await dashboard.selectLatestVersion(dashboard.versionDropdownSidekick);
    await dashboard.downloadFile(constants.SIDEKICK_APK_FILE);
  },
);

Then(
  "Under the CamLife tab select latest version and download the CampLife APK file",
  async function () {
    await dashboard.selectLatestVersion(dashboard.versionDropdownCamLife);
    await dashboard.downloadFile(constants.CAMPLIFE_APK_FILE);
  },
);
