const { baseClass } = require("../common/baseclass");
const { expect } = require('@playwright/test');

class Dashboard extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.pageHeader = page.locator('//div[@id="tableTitle"]');
    this.versionDropdownSidekick = page.locator(
      `//p[normalize-space(text())='Sidekick Mobile']//ancestor::div[contains(@class,'MuiGrid-item')]//label[normalize-space()='Android Version']//following-sibling::div`,
    );
    this.versionDropdownCamLife = page.locator(
      `//p[normalize-space(text())='CampLife']//ancestor::div[contains(@class,'MuiGrid-item')]//label[normalize-space()='Android Version']//following-sibling::div`,
    );
    this.listItems = page.locator('ul[role="listbox"] > li');
  }

  ButtonName(buttonName) {
    return this.page.locator(
      `//button[@type='button' and contains(., '${buttonName}')]`,
    );
  }

  ButtonText(name) {
    return this.page.locator(
      `//button[@type='button' and contains(., '${name}')]`,
    );
  }

  apkDownloadButton(appName) {
    return this.page.locator(
      `//p[normalize-space(text())='${appName}']//ancestor::div[contains(@class,'MuiGrid-item')]//button[p[normalize-space(.)='Download android']]`,
    );
  }

  async selectLatestVersion(dropdownLocator) {
    await dropdownLocator.waitFor({ state: "visible" });
    await dropdownLocator.click();

    // Wait for at least one non-"Loading..." list item
    await this.page.waitForFunction(() => {
      const items = document.querySelectorAll('ul[role="listbox"] > li');
      return Array.from(items).some(
        (el) => el.textContent.trim() !== "Loading...",
      );
    });

    const count = await this.listItems.count();
    for (let i = 0; i < count; i++) {
      const text = (await this.listItems.nth(i).innerText()).trim();
      if (text !== "Loading...") {
        await this.listItems.nth(i).click();
        break;
      }
    }
  }
  async waitForResponse(urlPart, method = "POST") {
    const response = await this.page.waitForResponse(
      res => res.url().includes(urlPart) && res.request().method() === method
    );
    return response;
  }

  async downloadFile(appName) {
    await this.clickAction(this.apkDownloadButton(appName).first());
    const response = await this.waitForResponse("/download", "POST");
    expect(response).not.toBeNull();
    await this.takeScreenShot("DashboardPhotos","download-file");
  }
}

module.exports = { Dashboard };
