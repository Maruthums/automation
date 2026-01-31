const { When } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { CamperAccounts } = require("../pages/CamperAccounts");
require("../common/hooks");
const { camperAccountData } = require("../common/testData");
const constants = require("../common/constants");

let camperAccounts = null;

When(
  "Check the campers and headshots upload in sidekick portal",
  async function () {
    const sharedData = camperAccountData;

    camperAccounts = new CamperAccounts(pageFixture.page);
    await camperAccounts.clickAction(camperAccounts.campAcctsLink);
    await camperAccounts.validateToHaveText(
      camperAccounts.campAcctsTitle,
      /Camper Accounts/,
    );

    for (const element of sharedData) {
      const { email, campType, campName, fileName } = element;

      if (campName == constants.EXTENDED_CAMP) {
        await camperAccounts.selectValuefromListDropdown(
          camperAccounts.campNameFilter,
          await camperAccounts.listOption(campName),
        );
        await camperAccounts.waitForSpinner();
        await camperAccounts.selectValuefromListDropdown(
          camperAccounts.campWeekFilter,
          await camperAccounts.listOption("All"),
        );
        await camperAccounts.waitForSpinner();
      } else {
        await camperAccounts.selectValuefromListDropdown(
          camperAccounts.campNameFilter,
          await camperAccounts.listOption(campName),
        );
      }
      await camperAccounts.fetchCampInfo(email);
      await camperAccounts.uploadPhotoForCamper(email, fileName);
    }
  },
);

When(
  "Check the campers and headshots remove in sidekick portal",
  async function () {
    const sharedData = camperAccountData;
    camperAccounts = new CamperAccounts(pageFixture.page);
    for (const element of sharedData) {
      const { email, campType, campName } = element;
      if (campName == constants.EXTENDED_CAMP) {
        await camperAccounts.selectValuefromListDropdown(
          camperAccounts.campNameFilter,
          await camperAccounts.listOption(campName),
        );
        await camperAccounts.waitForSpinner();
        await camperAccounts.selectValuefromListDropdown(
          camperAccounts.campWeekFilter,
          await camperAccounts.listOption("All"),
        );
        await camperAccounts.fillInput(
          camperAccounts.campAcctsPlcHolder,
          email,
        );
        await camperAccounts.campAcctsPlcHolder.press("Enter");
        await camperAccounts.waitForSpinner();
      } else {
        await camperAccounts.selectValuefromListDropdown(
          camperAccounts.campNameFilter,
          await camperAccounts.listOption(campName),
        );
        await camperAccounts.waitForSpinner();
        await camperAccounts.fillInput(
          camperAccounts.campAcctsPlcHolder,
          email,
        );
        await camperAccounts.campAcctsPlcHolder.press("Enter");
        await camperAccounts.waitForSpinner();
      }
      const newPage = await camperAccounts.removePhotoFromCamper(email);
      if(newPage) {
        const newcamperAccounts = new CamperAccounts(newPage);
        await newcamperAccounts.waitForLocator(newcamperAccounts.hamburgerMenu);
        await newcamperAccounts.clickAction(newcamperAccounts.hamburgerMenu);
        await newcamperAccounts.waitForLocator(newcamperAccounts.removeButton); // <-- locator for remove/delete button inside popup
        await newcamperAccounts.clickAction(newcamperAccounts.removeButton);
        await newcamperAccounts.clickAction(newcamperAccounts.confirmButton);
        await newcamperAccounts.page.waitForTimeout(1000);
        await newcamperAccounts.page.close();
      }
    }
  },
);
