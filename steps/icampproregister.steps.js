const { Given, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { Households } = require("../pages/iCampProRegister");
const { LoginPage } = require("../pages/LoginPage");
require("../common/hooks");

let loginPage;
let houseHold;
//let sharedData;
Given(
  "the user logs into the iCampPro portal",
  async function () {
    loginPage = new LoginPage(pageFixture.page);
    houseHold = new Households(pageFixture.page);
    await loginPage.navigateToICamp();
    await loginPage.loginICamp();
  },
);

Then("the page title should be {string}", async function (pageTitle) {
  await loginPage.validateToHaveText(houseHold.pageTitle, pageTitle);
  await loginPage.clickAction(houseHold.household);
  await loginPage.validateToHaveText(
    houseHold.householdHeader,
    "Household Management",
  );
});

Then(
  "Click Add Household member link and create the campers with data",
  async function (dataTable) {
    sharedData = await houseHold.campersSetup(
      dataTable,
      /* isThisLast */ false,
    );
  },
);
