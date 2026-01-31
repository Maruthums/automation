const { Then } = require("@cucumber/cucumber");
const { Campmaps } = require("../pages/Campmaps");
const { pageFixture } = require("../common/pageFixture");

Then("Allow the user to edit the camp map", async function () {
  const campPages = new Campmaps(pageFixture.page);
  await campPages.clickAction(campPages.settingLink);
  await campPages.clickAction(campPages.campMapLink);
  await campPages.clickAction(campPages.viewAllBtn);
  await campPages.clickAction(campPages.campmapselect);
  await campPages.campUpdatePostImageUpload();
});
