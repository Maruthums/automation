const { Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { Settings } = require("../pages/Settings");

let settings;

Then(
  "The user can edit the setting page {string}, {string} , {string}",
  async function (Facesize, StartAge, Year) {
    settings = new Settings(pageFixture.page);
    await settings.clickAction(settings.settingsLink);
    await settings.clickAction(settings.generalLink);
    await settings.faceSizeRatioInput.click();
    await settings.page.keyboard.press("Control+A");
    await settings.page.keyboard.press("Backspace");
    await settings.page.keyboard.type(Facesize);
    await settings.clickAction(settings.faceSizeSaveButton);
    await settings.takeScreenShot("Settings", "general-face-save-action");
    await settings.page.waitForTimeout(2000);

    await settings.fillInput(settings.startAgeInput, StartAge);
    await settings.intervalValueInput.click();
    await settings.page.keyboard.press("ArrowUp");
    await settings.page.waitForTimeout(2000);
    await settings.intervalSaveButton.scrollIntoViewIfNeeded();
    await settings.clickAction(settings.intervalSaveButton);
    await settings.takeScreenShot("Settings", "general-interval-save-action");
    await settings.page.waitForTimeout(5000);
  },
);

Then("The user can edit the publishing page", async function () {
  settings = new Settings(pageFixture.page);
  await settings.clickAction(settings.publishingLink);

  await settings.facialCatalogueInput.click();
  await settings.page.keyboard.press("ArrowUp");
  await settings.clickAction(settings.facialSaveButton);
  await settings.waitForSpinner();
  await settings.takeScreenShot("Settings", "publishing-facial-save-action");

  await settings.galleryDayCampInput.click();
  await settings.page.keyboard.press("ArrowUp");
  await settings.clickAction(settings.gallerySaveButton);
  await settings.waitForSpinner();
  await settings.takeScreenShot("Settings", "publishing-gallery-save-action");

  await settings.familyCountInput.click();
  await settings.page.keyboard.press("ArrowUp");
  await settings.clickAction(settings.familyCountSaveButton);
  await settings.waitForSpinner();
  await settings.takeScreenShot("Settings", "publishing-family-count-save-action");
});
