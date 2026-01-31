const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const path = require("path");

class CamperAccounts extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.campAcctsLink = this.page.locator(
      "//span[normalize-space()='Camper Accounts']",
    );
    this.campAcctsTitle = this.page.locator('//div[@id="tableTitle"]');
    this.campAcctsPlcHolder = this.page.locator(
      "//input[@type='text' and contains(@placeholder, 'Name, Email or Events')]",
    );
    this.campInfoHeader = this.page.locator(
      '[aria-label="custom pagination table"]>thead>tr>th>span',
    );
    this.campInfoRows = this.page.locator("[id*=enhanced-table-checkbox]>td");
    this.campNameFilter = this.page.locator(
      "//label[normalize-space()='Camp']//following-sibling::div",
    );
    this.campWeekFilter = this.page.locator(
      "//label[normalize-space()='Week']//following-sibling::div",
    );
    this.fileSelection = this.page.locator(
      "//button[normalize-space()='SELECT FILE']//parent::div//parent::div//preceding-sibling::input",
    );
    this.saveButton = this.page.getByRole("button", {
      name: "Save",
      exact: true,
    });
    this.hamburgerMenu = this.page.locator('#camper-photo-more-icon');
    this.removeButton = this.page.locator(
      "//li[@role='menuitem' and normalize-space()='Remove']",
    );
    this.confirmButton = this.page.locator(
      "//button[@type='button' and normalize-space()='CONFIRM']",
    );
  }

  async listOption(optionName) {
    return await this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async fetchCampInfo(camperEmail) {
    const campinfoHeader = this.campInfoHeader;
    const campinData = this.campInfoRows;

    //const wantedHeaders = ['Camper', 'Account Email', 'Events'];
    await this.waitForSpinner();

    // Fill search/filter input
    await this.fillInput(this.campAcctsPlcHolder, camperEmail);
    await this.campAcctsPlcHolder.press("Enter");
    await this.waitForSpinner();
    // Wait for headers and data rows to appear
    await this.waitForLocator(campinfoHeader.first());
    await this.waitForLocator(campinData.first());

    // Get header texts
    const headerCount = await campinfoHeader.count();
    let emailColIndex = -1;
    //const headersMap = {};testuser_1754917367519@yopmail.com
    for (let i = 0; i < headerCount; i++) {
      const headerText = (await campinfoHeader.nth(i).textContent())?.trim();
      if (headerText === "Account Email") {
        emailColIndex = i;
        break;
      }
    }
    if (emailColIndex === -1) {
      throw new Error(`'Account Email' header not found`);
    }

    // Find all rows matching the camperEmail
    const emailcontent = await this.page.getByText(camperEmail);
    const emailCount = await emailcontent.count();

    expect(emailCount).toBeGreaterThan(0);

    for (let index = 0; index < emailCount; index++) {
      const actualEmail = (await emailcontent.nth(index).textContent())?.trim();
      expect(actualEmail).toBe(camperEmail);
    }
  }

  async uploadPhotoForCamper(camperEmail, fileName) {
    let PathofPhoto = path.resolve(
      __dirname,
      `../Photos/CamperPhotos/${fileName}`,
    );
    const emailcontent = await this.page.getByText(camperEmail);

    const imgLocator = await emailcontent
      .nth(0)
      .locator("//preceding-sibling::td//button//img");
    const imgCount = await imgLocator.count();
    if (imgCount > 0) {
      // Image exists
      const srcValue = await imgLocator.getAttribute("src");
      if (srcValue.includes("profile")) {
        const headshotButton = await emailcontent
          .nth(0)
          .locator("//preceding-sibling::td//button");
        await this.clickAction(headshotButton);
        await this.waitForLocator(this.fileSelection);
        await this.fileSelection.setInputFiles(PathofPhoto);
        await this.clickAction(this.saveButton);
        await this.waitForSpinner();
      } else {
        console.log(
          `Headshot already present for ${camperEmail} (row: 1)`,
        );
      }
      await this.takeScreenShot("CamperAccountsPhotos", `Headshot-${camperEmail}`);
    } else {
      console.log(
        `No <img> tag found for ${camperEmail} (row: 1), skipping.`,
      );
      await this.takeScreenShot("CamperAccountsPhotos", `No-Headshot-${camperEmail}`);
    }
  }

  async removePhotoFromCamper(camperEmail) {
    const emailcontent = await this.page.getByText(camperEmail);
    console.log("Enter the removed function");

    expect(await emailcontent.count()).toBeGreaterThan(0);

    const imageCreated = await this.page.getByText("Created");
    const imageCreatedCount = await imageCreated.count();

    if(imageCreatedCount > 0) {
      console.log("Image already in created status (row: 1), skipping.")
    } else {
      const imgLocator = emailcontent
      .nth(0)
      .locator("//preceding-sibling::td//button//img");
      const imgCount = await imgLocator.count();

      if (imgCount > 0) {
        // <img> exists
        const srcValue = await imgLocator.getAttribute("src");
        if (srcValue && !srcValue.includes("profile")) {
          // Headshot exists → remove it
          const headshotViewButton = emailcontent
            .nth(0)
            .locator(
              "//following-sibling::td//a[normalize-space()='View Photos']",
            );
          const [newPage] = await Promise.all([
            this.page.context().waitForEvent("page"),
            this.clickAction(headshotViewButton),
          ]);
          return newPage;
        } else {
          console.log(
            `No custom headshot for ${camperEmail} (row: 1), skipping.`,
          );
        }
      } else {
        console.log(
          `No <img> found for ${camperEmail} (row: 1), skipping.`,
        );
      }
    }

  }
}

module.exports = { CamperAccounts };
