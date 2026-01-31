const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const constants = require("../common/constants");

class UserManagement extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    // Navigation
    this.adminUsersLink = page.locator("#admin-users");
    this.userMgmtTitle = page.locator("#users-management");

    // Form fields
    this.addUserButton = page.locator("#add-user-button");
    this.firstName = page.locator("#first-name");
    this.lastName = page.locator("#last-name");
    this.email = page.locator("#email");
    this.password = page.locator("#password");
    this.confirmPassword = page.locator("#confirm-password");
    this.campAssociation = page.locator("#camp-association");
    this.userType = page.locator("#user-type");
    this.userRole = page.locator("#role");

    // Optional associations
    this.addCampLifeButton = page.locator("#add-camplife-association");
    this.campLifeAssociation = page.locator("#tags-standard");
    this.campLifeAssociation1 = page.locator(
      '//p[normalize-space()="Edmund Bogan"]',
    );
    this.userFollowCamp = page.locator("#follow-camp-checkbox");
    this.userHousehold = page.locator("#household-checkbox");

    // Actions
    this.userSaveButton = page.locator("#save-button");
    this.userMgmtPlcHolder = page.locator("#search-user");
    this.deleteUserAlert = page.locator("#button-2");
  }

  async listOption(optionName) {
    return this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async addAdminUser() {
    const { firstName, lastName, email, password, userType, userRole } =
      constants.ADMIN_USER;

    await this.clickAction(this.addUserButton);

    await this.fillInput(this.firstName, firstName);
    await this.fillInput(this.lastName, lastName);
    await this.fillInput(this.email, email);
    await this.fillInput(this.password, password);
    await this.fillInput(this.confirmPassword, password);

    await this.selectValuefromListDropdown(
      this.campAssociation,
      await this.listOption(constants.FAMILY_CAMP),
    );
    await this.selectValuefromListDropdown(
      this.userType,
      await this.listOption(userType),
    );
    await this.selectValuefromListDropdown(
      this.userRole,
      await this.listOption(userRole),
    );

    await this.clickAction(this.userSaveButton);
    await this.takeScreenShot("UserManagement", "add-user");
    return { firstName, lastName, email };
  }

  async findUserRow(firstName, lastName) {
    await this.userMgmtPlcHolder.fill("");
    await this.fillInput(this.userMgmtPlcHolder, firstName);

    let userRow = this.page.locator(
      `//tr[td[contains(text(),'${firstName}')]]`,
    );

    if (!(await userRow.count())) {
      await this.userMgmtPlcHolder.fill("");
      await this.fillInput(this.userMgmtPlcHolder, lastName);
      userRow = this.page.locator(`//tr[td[contains(text(),'${lastName}')]]`);
    }

    await userRow.first().waitFor({ state: "visible" });
    return userRow.first();
  }

  async editAdminUser(firstName, lastName, email) {
    const userRow = await this.findUserRow(firstName, lastName);
    const editButton = userRow.locator("#edit-user-button");

    await this.clickAction(editButton);

    await expect(this.firstName).toHaveValue(firstName);
    await expect(this.lastName).toHaveValue(lastName);
    await expect(this.email).toHaveValue(email);

    await this.selectValuefromListDropdown(
      this.campAssociation,
      await this.listOption(constants.YOUTH_CAMP),
    );

    await this.clickAction(this.userSaveButton);
    await this.takeScreenShot("UserManagement", `edit-user-${firstName}-${lastName}`);
    console.log(`User "${firstName} ${lastName}" edited successfully.`);
  }

  async toggleUserStatus(firstName, lastName) {
    const userRow = await this.findUserRow(firstName, lastName);
    const statusCell = userRow.locator("td:nth-child(6)"); // adjust index
    const oldStatus = (await statusCell.textContent()).trim();

    await this.clickAction(userRow.locator("#status-toggle"));
    await this.page.waitForTimeout(1000);

    const newStatus = (await statusCell.textContent()).trim();

    if (oldStatus === newStatus) {
      throw new Error(`Status did not change. Still "${newStatus}".`);
    }

    console.log(
      `Status changed from "${oldStatus}" ➝ "${newStatus}" successfully`,
    );
    return { oldStatus, newStatus };
  }

  async deleteAdminUser(firstName, lastName) {
    const userRow = await this.findUserRow(firstName, lastName);
    await this.clickAction(userRow.locator("#delete-user-button"));
    await this.clickAction(this.deleteUserAlert);

    await this.waitForSpinner();
    await this.takeScreenShot("UserManagement", `delete-user-${firstName}-${lastName}`);
    await expect(userRow).toHaveCount(0);
    console.log(`User "${firstName} ${lastName}" deleted successfully.`);
  }
}

module.exports = { UserManagement };
