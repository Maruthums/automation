const { baseClass } = require("../common/baseclass");

class UserRoles extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    // Main navigation
    this.adminUsersLink = page.locator("#admin-users");
    this.adminUserRolesLink = page.locator("#users-roles");

    // Header and actions
    this.userRolesTitle = page.locator('//h5[@id="tableTitle"]');
    this.addUserRoleButton = page.locator("#create-new-role");
    this.roleName = page.locator("#outlined-required");
    this.sideKickPerm = page.locator("#portal-permissions-header");
    this.adminAccess = page.locator(
      '//td[normalize-space()="Admin Access"]/ancestor::tr//input[@type="checkbox"]',
    );
    this.userRoleSave = page.locator("#save-role-button");
    this.userRoleConfirmButton = page.locator(
      "//button[@type='button' and normalize-space()='CONFIRM']",
    );

    // Table navigation
    this.nextButton = page.locator('[aria-label="next page"]');
    this.tableRows = page.locator(
      `//tr[contains(@id,'enhanced-table-checkbox')]`,
    );

    // Toast notifications
    this.alertToast = page.locator(
      "//div[@role='alert' and contains(@class, 'Toastify')]",
    );
  }

  async saveAndWaitForSuccess() {
    await Promise.all([
      this.page.waitForResponse(
        (res) => res.url().includes("/roles") && res.status() === 200,
      ),
      this.clickAction(this.userRoleSave),
    ]);

    await this.alertToast.waitFor({ state: "visible", timeout: 5000 });
    await this.takeScreenShot("UserRoles", "create-user-role");
    await this.waitForToastToDisappear();
    await this.tableRows.first().waitFor({ state: "visible", timeout: 5000 });
  }

  /**
   * Set permission for a section
   */
  async setRolePermission(section, permission, level) {
    if (permission === "Select All") {
      const deselectAll = this.page.locator(
        `//td[normalize-space()="${section}"]//following-sibling::td//button[normalize-space()="Deselect All"]`,
      );
      if (await deselectAll.isVisible()) {
        return; // already applied
      }
      const selectAll = this.page.locator(
        `//td[normalize-space()="${section}"]//following-sibling::td//button[normalize-space()="Select All"]`,
      );
      await this.clickAction(selectAll);
      return;
    }

    // Expand section if collapsible
    const sectionPanel = this.page.locator(
      `//td[normalize-space()='${section}']//ancestor::div[@id="panel1-header"]`,
    );
    if (await sectionPanel.isVisible()) {
      await this.clickAction(sectionPanel);
    }

    // Select checkbox for the given permission
    const permissionRow = this.page.locator(
      `//td[normalize-space()='${permission}']`,
    );
    await permissionRow.locator("//preceding-sibling::td//input").click();

    // Select level from dropdown
    await permissionRow
      .locator("//following-sibling::td//div[@role='combobox']")
      .click();
    const listItems = this.page.locator(`[role="listbox"] > li`);
    const count = await listItems.count();
    for (let i = 0; i < count; i++) {
      const item = listItems.nth(i);
      if ((await item.textContent()).trim() === level) {
        await item.click();
        break;
      }
    }
  }

  /**
   * Find a row containing text in a paginated table
   */
  async findRowInPaginatedTable(searchText) {
    let pageIndex = 1;

    while (true) {
      const rows = await this.tableRows.all();
      for (const row of rows) {
        const text = (await row.textContent()) || "";
        if (text.includes(searchText)) {
          return row;
        }
      }

      // If next page is disabled, exit
      if (await this.nextButton.isDisabled()) {
        break;
      }

      await this.clickAction(this.nextButton);
      pageIndex++;
    }
    return null;
  }

  /**
   * Perform action (edit/duplicate/delete) on a row
   */
  async clickRowAction(rowLocator, action = "edit") {
    const actions = {
      edit: "//button[@aria-label='Edit User']",
      duplicate: "//button[@aria-label='Copy User']",
      delete: "//button[@aria-label='Delete User']",
    };

    const actionLocator = rowLocator.locator(actions[action.toLowerCase()]);
    await this.clickAction(actionLocator);

    if (action.toLowerCase() === "delete") {
      await this.clickAction(this.userRoleConfirmButton);
      await this.waitForToast("Role Deleted Successfully");
    } else {
      await this.waitForToastToDisappear();
    }
  }
}

module.exports = { UserRoles };
