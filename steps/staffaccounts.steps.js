const { Given, When, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { LoginPage } = require("../pages/LoginPage");
const { StaffAccounts } = require("../pages/StaffAccounts");
const { Households } = require("../pages/iCampProRegister");
require("../common/hooks");
const { staffAccountData } = require("../common/testData");

let loginPage = null;
let staffAccounts = null;
let houseHold = null;

Given(
  "the user login to the iCampPro portal",
  async function () {
    loginPage = new LoginPage(pageFixture.page);
    houseHold = new Households(pageFixture.page);
    await loginPage.navigateToICamp();
    await loginPage.loginICamp();
    await houseHold.takeScreenShot("StaffAccountsPhotos", "login-icamp");
  },
);

Then("the staff should be hired status", async function () {

  const sharedData = staffAccountData;

  for(const element of sharedData) {
    await houseHold.clickAction(houseHold.staff);
    await houseHold.clickAction(houseHold.staffSeason);
    const season = await houseHold.page.locator(
      `//button[normalize-space()='${element.campType}']`,
    );
    await houseHold.clickAction(season);
    await houseHold.clickAction(houseHold.onRoster);
    await houseHold.clickAction(houseHold.staffSearch);
    await houseHold.fillInput(houseHold.staffSearch, element.staffName);
    const staff = await houseHold.page.locator(
      `//span[normalize-space()='${element.staffName}']`,
    );
    await houseHold.clickAction(staff);
    await houseHold.clickAction(houseHold.staffClose);
    await houseHold.takeScreenShot("StaffAccountsPhotos", `hired-${element?.staffName}`);
  }
});

When(
  "Check the staffs and headshots upload in sidekick portal",
  async function () {
    const sharedData = staffAccountData;
    staffAccounts = new StaffAccounts(pageFixture.page);
    await loginPage.navigate();
    await staffAccounts.clickAction(staffAccounts.staffAcctsLink);
    await staffAccounts.validateToHaveText(
      staffAccounts.staffAcctsTitle,
      /Staff Accounts/,
    );
    await staffAccounts.waitForSpinner();
    await staffAccounts.clickAction(staffAccounts.staffingSeason);
    const firstOption = staffAccounts.page
      .locator("//ul[@role='listbox']//li")
      .first();
    await firstOption.click();
    await staffAccounts.waitForSpinner();

    for (const element of sharedData) {
      const { staffSeason, campType, staffName } = element;

      await staffAccounts.selectValuefromListDropdown(
        staffAccounts.staffingSeason,
        await staffAccounts.listOption(staffSeason),
      );
      await staffAccounts.waitForSpinner();
      await staffAccounts.selectValuefromListDropdown(
        staffAccounts.campNameFilter,
        await staffAccounts.listOption(campType),
      );
      await staffAccounts.waitForSpinner();
        
      await staffAccounts.fetchStaffInfo(staffName);
      await staffAccounts.uploadPhotoForStaff(staffName, element.fileName);
      await staffAccounts.takeScreenShot("StaffAccountsPhotos", `upload-photo-${staffName}-${element.fileName}`);
    }
  },
);

When(
  "Check the staffs and headshots remove in sidekick portal",
  async function () {
    const sharedData = staffAccountData;
    staffAccounts = new StaffAccounts(pageFixture.page);
    await staffAccounts.clickAction(staffAccounts.staffAcctsLink);
    await staffAccounts.clickAction(staffAccounts.staffingSeason);
    const firstOption = staffAccounts.page
      .locator("//ul[@role='listbox']//li")
      .first();
    await firstOption.click();
    await staffAccounts.waitForSpinner();
    for (const element of sharedData) {
      const { staffSeason, campType, staffName } = element;
      
      await staffAccounts.selectValuefromListDropdown(
        staffAccounts.staffingSeason,
        await staffAccounts.listOption(staffSeason),
      );
      await staffAccounts.waitForSpinner();
      await staffAccounts.selectValuefromListDropdown(
        staffAccounts.campNameFilter,
        await staffAccounts.listOption(campType),
      );
      await staffAccounts.waitForSpinner();
      await staffAccounts.fillInput(
        staffAccounts.staffAcctsPlcHolder,
        staffName,
      );
      await staffAccounts.staffAcctsPlcHolder.press("Enter");
      await staffAccounts.waitForSpinner();
       
      const newPage = await staffAccounts.removePhotoFromStaff(staffName);
      if (!newPage) {
        console.log(`No photo found for ${staffName}, skipping remove...`);
        continue; // or return, depending on loop
      }
      const newstaffAccounts = new StaffAccounts(newPage);
      await newstaffAccounts.waitForLocator(newstaffAccounts.hamburgerMenu);
      await newstaffAccounts.clickAction(newstaffAccounts.hamburgerMenu);
      await newstaffAccounts.waitForLocator(newstaffAccounts.removeButton); // <-- locator for remove/delete button inside popup
      await newstaffAccounts.clickAction(newstaffAccounts.removeButton);
      await newstaffAccounts.clickAction(newstaffAccounts.confirmButton);
      await staffAccounts.takeScreenShot("StaffAccountsPhotos", `remove-photo-${staffName}-${element.fileName}`);
      await newstaffAccounts.page.waitForTimeout(1000);
      await newstaffAccounts.page.close();
    }
  },
);
