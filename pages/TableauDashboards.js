const { baseClass } = require("../common/baseclass");
const { faker } = require("@faker-js/faker");
const { expect } = require("@playwright/test");

class TableauDashboards extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.tableauSidebar = page.locator("//span[normalize-space()='Tableau']");
    this.pageTitle = page.locator("#tableTitle");
    this.newDashboardButton = page.locator(
      "//button[normalize-space()='NEW DASHBOARD']",
    );
    this.modalTitle = page.locator("//h6[normalize-space()='New Dashboard']");
    this.titleInputField = page.locator(
      "//input[@name='title' or @placeholder='Title']",
    );
    this.shortTitleInputField = page.locator(
      "//input[@name='shortTitle' or @placeholder='Title']",
    );
    this.descriptionInputField = page.locator(
      "//input[@name='description' or @placeholder='Title']",
    );
    this.groupDropdown = page.locator("//div[normalize-space()='Select...']");
    this.addGroupButton = page.locator(
      "//button[normalize-space()='Add Group']",
    );
    this.newGroupInputField = page.locator(
      "//input[@placeholder='Group Name']",
    );
    this.addGroupButton2 = page.locator(
      "//button[normalize-space()= 'ADD GROUP']",
    );
    this.doneButton = page.locator("//div[normalize-space()='Done']");
    this.tableauEmbedLinkInputField = page.locator(
      "//label[normalize-space()='Tableau Embed Link*']",
    );
    this.saveButton = page.locator("//button[normalize-space()='Save']");
    this.toastMessage = page.locator(
      "//div[@role='alert' and contains(@class,'Toastify')]",
    );
    this.collapseAllButton = page.locator(
      "//p[normalize-space()='collapse all']",
    );
    this.expandAllButton = page.locator("//p[normalize-space()='expand all']");
    this.cancelButton = this.page.locator(
      "//button[normalize-space()='Cancel']",
    );
    this.confirmButton = this.page.locator(
      `//button[normalize-space()='CONFIRM']`,
    );
  }

  /**
   * Helper: Selects dynamic group by name
   */
  async selectDynamicGroup(groupName) {
    const dynamicGroupCheckbox = this.page.locator(
      `//div[normalize-space()='${groupName}']//preceding-sibling::span//input[@type="checkbox"]`,
    );

    await dynamicGroupCheckbox.waitFor({ state: "attached", timeout: 10000 });
    await dynamicGroupCheckbox.check();
  }

  /**
   * Fill form & create new group dynamically
   */
  async creatingNewGroup() {
    const titleInputFieldValue = "Automation " + faker.commerce.productName();
    const shortTitleInputFieldValue =
      "Automation " +
      faker.string.alpha({
        length: 5,
        casing: "upper",
      });
    const descriptionInputFieldValue = "Automation " + faker.lorem.sentence(10);
    const newGroupInputFieldValue = `Automation Group_${faker.word.adjective()}_${faker.number.int(1000)}`;

    // Fill dashboard fields
    await this.fillInput(this.titleInputField, titleInputFieldValue);
    await this.fillInput(this.shortTitleInputField, shortTitleInputFieldValue);
    await this.fillInput(
      this.descriptionInputField,
      descriptionInputFieldValue,
    );

    // Add new group
    await this.clickAction(this.groupDropdown);
    await this.clickAction(this.addGroupButton);
    await this.fillInput(this.newGroupInputField, newGroupInputFieldValue);
    await this.clickAction(this.addGroupButton2);
    await this.fillInput(
      this.tableauEmbedLinkInputField,
      "https://dashboard.pinecove.com/#/views/CampNamesNeededByCamp/ShirtSizes?:id=1",
    );
    // Return test data
    return {
      title: titleInputFieldValue,
      shortTitle: shortTitleInputFieldValue,
      description: descriptionInputFieldValue,
      group: newGroupInputFieldValue,
    };
  }

  async collapseGroups() {
    await this.clickAction(this.collapseAllButton);
  }

  async expandGroups() {
    try {
      // check if collapse all button is visible
      const isCollapseVisible = await this.collapseAllButton.isVisible();

      if (isCollapseVisible) {
        console.log("Already expanded → Collapse All button visible.");
      } else {
        console.log("Currently collapsed → clicking Expand All...");
        await this.clickAction(this.expandAllButton);
      }
    } catch (error) {
      console.error("Error in expandGroups:", error);
    }
  }

  async openDashboardOptions(dashboardTitle) {
    const optionsButton = this.page.locator(
      `//p[normalize-space()='${dashboardTitle}']//parent::div//parent::div//following-sibling::div//button`,
    );
    await this.waitForSpinner();
    await optionsButton.waitFor({ state: "visible", timeout: 10000 });
    let menuOpened = false;
    for (let attempt = 1; attempt <= 3; attempt++) {
      await optionsButton.click({ force: true });
      // Look for the latest visible menu
      const menu = this.page.locator("//ul[@role='menu']").last();
      try {
        await menu.waitFor({ state: "visible", timeout: 3000 });
        menuOpened = true;
        break;
      } catch {
        console.log(
          `Retrying to open menu for "${dashboardTitle}" (attempt ${attempt})...`,
        );
        await this.page.waitForTimeout(500);
      }
    }

    if (!menuOpened) {
      throw new Error(
        `Failed to open options menu for dashboard: ${dashboardTitle}`,
      );
    }
  }

  async dashboardMenus(dashboardTitle, menus) {
    // Always try twice in case the menu closes/flaky click
    for (let attempt = 1; attempt <= 3; attempt++) {
      await this.openDashboardOptions(dashboardTitle);

      const actionButton = this.page.locator(
        `//li[normalize-space()='${menus}']`,
      );
      try {
        await actionButton.waitFor({ state: "visible", timeout: 5000 });
        await this.clickAction(actionButton);
        return; // success, exit function
      } catch (error) {
        console.log(
          `Retrying to click menu "${menus}" (attempt ${attempt})...`,
        );
        await this.page.waitForTimeout(500);
      }
    }
    throw new Error(
      `Failed to click dashboard menu "${menus}" for "${dashboardTitle}"`,
    );
  }

  async listOption(optionName) {
    return await this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async renameAndDeleteIfExists(groupName) {
    const groupLocator = this.page.locator(
      `//p[normalize-space()='${groupName}']`,
    );
    if (await groupLocator.isVisible()) {
      const renamed = `${groupName}_Renamed`;
      await this.renameGroup(groupName, renamed);
      await this.deleteGroup(renamed);
    }
  }

  async openGroupSettings(groupName) {
    const settingsButton = this.page.locator(
      `//p[normalize-space()='${groupName}']/ancestor::div[@role='button']//div[3]//button`,
    );
    await this.clickAction(settingsButton);
  }

  async renameGroup(groupName, newGroupName) {
    // Open settings
    await this.openGroupSettings(groupName);

    // Click "Rename" option
    const renameOption = this.page
      .locator('//ul[@role="menu"]//li[normalize-space()="Rename"]')
      .first();
    await renameOption.click({ force: true });

    // Wait for rename input to appear
    const renameInput = this.page.locator("//input[@type='text']");
    await renameInput.waitFor({ state: "visible", timeout: 10000 });

    // Clear old value and type new name
    await renameInput.press("Control+A"); // or Meta+A on Mac
    await renameInput.press("Backspace");
    await renameInput.fill(newGroupName);

    // Click check icon (confirm)
    const confirmButton = this.page.locator(
      `//button[.//*[name()='svg' and @data-testid='CheckIcon']]`,
    );
    await confirmButton.click();

    // Wait for renamed group to appear
    await this.page
      .locator(`//p[normalize-space()='${newGroupName}']`)
      .waitFor({ state: "visible", timeout: 10000 });
  }

  async deleteGroup(groupName) {
    await this.openGroupSettings(groupName);
    const deleteOption = this.page
      .locator('//ul[@role="menu"]//li[normalize-space()="Delete Group"]')
      .first();
    await deleteOption.click({ force: true });
    await this.page.locator('//button[normalize-space()="CONFIRM"]').click();
    await this.waitForSpinner();
    await this.page
      .locator(`//p[normalize-space()='${groupName}']`)
      .waitFor({ state: "detached" });
    console.log(`Group "${groupName}" deleted.`);
  }

  async waitForTime(timeOut){
    await this.page.waitForTimeout(timeOut);
  }

  async waitForToast(expectedMessage) {
    const splitToastMsg = expectedMessage?.split(' ');
    const toastLocator = this.page.locator("//div[@role='alert']").last();
    await toastLocator.waitFor({ state: "visible", timeout: 10000 });
    await this.takeScreenShot("TableauDashboards",splitToastMsg?.includes('Added') ? "favorite" : "Unfavorite");
    const toastText = await toastLocator.innerText();
    console.log("Toast message captured:", toastText);
    await expect(toastLocator).toContainText(expectedMessage);
  }
}
module.exports = { TableauDashboards };
