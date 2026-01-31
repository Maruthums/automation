const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const path = require("path");

class CamperHeadshotManager extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.toolsLink = this.page.locator("//span[normalize-space()='Tools']");
    this.campHeadshotLink = this.page.locator(
      "//p[normalize-space()='Camper Headshot Manager']",
    );
    this.campHeadshotTitle = this.page.locator('//h6[@id="tableTitle"]');
    this.campHeadPlcHolder = this.page.locator("#outlined-basic");
    this.campHeadInfoHeader = this.page.locator(
      '[aria-label="custom pagination table"]>thead>tr>th>span',
    );
    this.campHeadInfoRows = this.page.locator(
      "[id*=enhanced-table-checkbox]>td",
    );
    this.campNameFilter = this.page.locator(
      "//label[normalize-space()='Camp']//following-sibling::div",
    );
    this.campWeekFilter = this.page.locator(
      "//label[normalize-space()='Week']//following-sibling::div",
    );
    this.campYearFilter = this.page.locator(
      "//label[normalize-space()='Year']//following-sibling::div",
    );
    this.noHeadshotTab = this.page.getByRole("tab", { name: "No Headshot" });
    this.expiredHeadshotTab = this.page.getByRole("tab", {
      name: "Expired Headshot",
    });
    this.validHeadshotTab = this.page.getByRole("tab", { name: "Valid" });
    this.fileSelection = this.page.locator(
      "//button[normalize-space()='SELECT FILE']//parent::div//parent::div//preceding-sibling::input",
    );
    this.saveButton = this.page.getByRole("button", {
      name: "SAVE",
      exact: true,
    });
    this.viewHistoryLink = this.page.locator(
      `//p[normalize-space()='View History']`,
    );
  }

  async listOption(optionName) {
    return await this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async applyFilters(year, week, campName) {
    await this.selectValuefromListDropdown(
      this.campYearFilter,
      await this.listOption(year),
    );
    await this.waitForSpinner();

    await this.selectValuefromListDropdown(
      this.campWeekFilter,
      await this.listOption(week),
    );
    await this.waitForSpinner()

    await this.selectValuefromListDropdown(
      this.campNameFilter,
      await this.listOption(campName),
    );
    await this.waitForSpinner();
  }

  async switchToTab(tabName) {
    const tab = this.page.getByRole("tab", { name: new RegExp(tabName, "i") });
    await tab.click();
    await expect(tab).toHaveAttribute("aria-selected", "true"); // confirm active
  }

  async isCamperVisible(camperName, statusType) {
    await this.waitForSpinner();

    // Search camper
    await this.fillInput(this.campHeadPlcHolder, camperName);
    await this.campHeadPlcHolder.press("Enter");
    await this.waitForSpinner();

    // Ensure results loaded
    await this.waitForLocator(this.campHeadInfoRows.first());

    // Find rows matching camper name (with or without gender suffix)
    const camperContent = this.page.locator(
      `//td[p[normalize-space()='${camperName}' or starts-with(normalize-space(), '${camperName} ')]]`,
    );
    const camperCount = await camperContent.count();
    expect(camperCount).toBeGreaterThan(0);

    // Normalize & check each row
    for (let i = 0; i < camperCount; i++) {
      let rowText = (await camperContent.nth(i).textContent())?.trim();
      rowText = rowText.replace(/\s*\([MF]\)$/, ""); // remove gender suffix
      expect(rowText).toBe(camperName);
    }

    // Build image locator by status
    let imgLocator;
    switch (statusType) {
      case "No Headshot":
        imgLocator = this.page.locator(
          `//td[p[normalize-space()='${camperName}' or starts-with(normalize-space(), '${camperName} ')]]` +
            `//preceding-sibling::td//img[contains(@src,'/profile.png')]`,
        );
        await this.takeScreenShot("CamperHeadshotManager",  `no-headshot-${camperName}`);
        break;

      case "Expired Headshot":
        imgLocator = this.page.locator(
          `//td[p[normalize-space()='${camperName}' or starts-with(normalize-space(), '${camperName} ')]]` +
            `//preceding-sibling::td//div[contains(@style,'grayscale(100%)')]//img`,
        );
        await this.takeScreenShot("CamperHeadshotManager",  `expired-headshot-${camperName}`);
        break;

      case "Valid":
        imgLocator = this.page.locator(
          `//td[p[normalize-space()='${camperName}' or starts-with(normalize-space(), '${camperName} ')]]` +
            `//preceding-sibling::td//div[not(contains(@style,'grayscale(100%)'))]//img[not(contains(@src,'/profile.png'))]`,
        );
        await this.takeScreenShot("CamperHeadshotManager",  `valid-headshot-${camperName}`);
        break;

      default:
        throw new Error(`Unknown statusType: ${statusType}`);
    }

    // Handle multiple rows for images
    const imgCount = await imgLocator.count();
    if (imgCount === 0) {
      throw new Error(
        `Camper '${camperName}' with status '${statusType}' not found`,
      );
    }

    for (let i = 0; i < imgCount; i++) {
      await expect(imgLocator.nth(i)).toBeVisible();
    }

    console.log(
      `Found ${imgCount} row(s) for camper '${camperName}' under '${statusType}' tab`,
    );
  }

  // async uploadHeadshot(camperName, photoPath) {
  //     const uploadButton = this.page.locator(`//td[a[normalize-space()='${camperName}']]//following-sibling::td//input[@type='file']`);
  //     await uploadButton.setInputFiles(photoPath);
  // }
}

module.exports = { CamperHeadshotManager };
