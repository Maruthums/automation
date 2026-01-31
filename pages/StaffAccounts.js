const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const path = require("path");

class StaffAccounts extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.staffAcctsLink = this.page.locator(
      "//span[normalize-space()='Staff Accounts']",
    );
    this.staffAcctsTitle = this.page.locator('//div[@id="tableTitle"]');
    this.staffAcctsPlcHolder = this.page.locator(
      "//input[@type='text' and contains(@placeholder, 'Name or Camp Name')]",
    );
    this.staffInfoHeader = this.page.locator(
      '[aria-label="custom pagination table"]>thead>tr>th>span',
    );
    this.staffInfoRows = this.page.locator("[id*=enhanced-table-checkbox]>td");
    this.staffingSeason = this.page.locator("#filter-staff-season");
    this.campNameFilter = this.page.locator("#filter-camp");
    this.genderFilter = this.page.locator(
      "//label[normalize-space()='Gender']//following-sibling::div",
    );
    this.fileSelection = this.page.locator(
      "//button[normalize-space()='SELECT FILE']//parent::div//parent::div//preceding-sibling::input",
    );
    this.saveButton = this.page.getByRole("button", {
      name: "SAVE",
      exact: true,
    });
    this.spinner = this.page.locator("#circular-progress");
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

  async fetchStaffInfo(staffName) {
    //const wantedHeaders = ['Headshot', 'Full Name'];
    await this.waitForSpinner();
    // Fill search/filter input
    await this.fillInput(this.staffAcctsPlcHolder, staffName);
    await this.staffAcctsPlcHolder.press("Enter");
    await this.waitForSpinner();
    // Wait for headers and data rows to appear
    await this.waitForLocator(
      await this.page.getByRole("link", { name: staffName, exact: true }),
    );
    // Find all rows matching the staffName
    const namecontent = await this.page.getByRole("link", {
      name: staffName,
      exact: true,
    });
    const nameCount = await namecontent.count();
    for (let index = 0; index < nameCount; index++) {
      const actualName = (await namecontent.nth(index).textContent())?.trim();
      expect(actualName).toBe(staffName);
    }
  }

  async uploadPhotoForStaff(staffName, fileName) {
    console.log(`Uploading photo for staff: ${staffName}`);

    const nameLocator = this.page.getByRole("link", {
      name: staffName,
      exact: true,
    });
    const rowCount = await nameLocator.count();

    if (rowCount === 0) {
      console.warn(`No rows found for ${staffName}`);
      return;
    }

    for (let index = 0; index < rowCount; index++) {
      const row = nameLocator.nth(index).locator("xpath=ancestor::tr");

      const imgLocator = row.getByRole("img", { name: "firstName" }); // <img alt="firstName">

      const imgCount = await imgLocator.count();
      if (imgCount === 0) {
        console.log(
          `No <img> found for ${staffName} (row ${index + 1}), skipping.`,
        );
        continue;
      }

      const srcValue = await imgLocator.first().getAttribute("src");

      if (srcValue && srcValue.includes("profile.png")) {
        // need to upload new headshot
        const photoPath = path.resolve(
          __dirname,
          `../Photos/StaffPhotos/${fileName}`,
        );

        // the <button> wrapping the <img>
        const headshotButton = row.locator("button");

        await this.clickAction(headshotButton);
        await this.waitForLocator(this.fileSelection);
        await this.fileSelection.setInputFiles(photoPath);
        await this.clickAction(this.saveButton);

        await this.waitForSpinner();
        await this.page.waitForTimeout(1000);

        console.log(
          `Uploaded new headshot for ${staffName} (row ${index + 1})`,
        );
      } else {
        console.log(
          `Headshot already present for ${staffName} (row ${index + 1}), skipping.`,
        );
      }
    }
  }

  async removePhotoFromStaff(staffName) {
    console.log(`Attempting to remove photo for ${staffName}`);

    // Get the row that contains staffName
    const row = await this.page.getByRole("link", {
      name: staffName,
      exact: true,
    });
    await this.waitForLocator(row);

    const rowCount = await row.count();

    if (rowCount == 0) {
      console.warn(`No row found for ${staffName}`);
      return;
    }

    const currentRow = await row.nth(0);
    const imgLocator = await currentRow.locator(
      "//parent::td//preceding-sibling::td//button//img",
    );
    const imgCount = await imgLocator.count();

    if (imgCount === 0) {
      console.log(
        `No <img> found for ${staffName} (row 1), skipping.`,
      );
      return;
    }

    const srcValue = await imgLocator.getAttribute("src");
    if (srcValue && srcValue.includes("profile")) {
      console.log(
        `No custom headshot for ${staffName} (row 1), skipping.`,
      );
      return;
    }

    // Headshot exists → open the link in the same row
    //  const headshotLink = currentRow.getByRole("link", { name: staffName });
    const [newPage] = await Promise.all([
      this.page.context().waitForEvent("page"),
      this.clickAction(currentRow),
    ]);
    return newPage;
  }
}

module.exports = { StaffAccounts };
