const { Given, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { LoginPage } = require("../pages/LoginPage");

require("../common/hooks");

let loginPage;

Given("the user logs into the Sidekick portal", async function () {
  loginPage = new LoginPage(pageFixture.page);
  await loginPage.navigate();
  await loginPage.injectToken();
});

Then("the pagetitle should be {string}", async function (pageTitle) {
  await loginPage.getPageTitle(pageTitle);
  await loginPage.takeScreenShot("Login", pageTitle);
});

Then(
  "the logged user info should display {string}",
  async function (profileName) {
    await loginPage.validateToHaveText(loginPage.profileName, profileName);
    await loginPage.takeScreenShot("Login", profileName);
  },
);
