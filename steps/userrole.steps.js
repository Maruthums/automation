const { When, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { UserRoles } = require("../pages/UserRoles");
const { UserManagement } = require("../pages/UserManagement");
const constants = require("../common/constants");

let userRoles;
let userMgmt;

/**
 * Helper to apply permissions from DataTable
 */
async function applyPermissions(dataTable) {
  for (const row of dataTable.hashes()) {
    await userRoles.setRolePermission(row.Section, row.Permission, row.Level);
  }
}

When(
  "I add a new user role with defined permissions",
  async function (dataTable) {
    userRoles = new UserRoles(pageFixture.page);
    userMgmt = new UserManagement(pageFixture.page);
    await userMgmt.clickAction(userMgmt.adminUsersLink);
    await userRoles.clickAction(userRoles.adminUserRolesLink);
    await userRoles.validateToHaveText(userRoles.userRolesTitle, /User Roles/);

    await userRoles.clickAction(userRoles.addUserRoleButton);
    await userRoles.fillInput(userRoles.roleName, constants.ROLE_NAME);
    await userRoles.clickAction(userRoles.sideKickPerm);
    await userRoles.clickAction(userRoles.adminAccess);

    await applyPermissions(dataTable);
    await userRoles.saveAndWaitForSuccess();
  },
);

Then(
  "I search that user role for edit with new permissions",
  async function (dataTable) {
    const rowLocator = await userRoles.findRowInPaginatedTable(
      constants.ROLE_NAME,
    );
    if (!rowLocator) throw new Error("Role not found in table");

    await userRoles.clickRowAction(rowLocator, "edit");
    await userRoles.clickAction(userRoles.sideKickPerm);

    await applyPermissions(dataTable);
    await userRoles.clickAction(userRoles.userRoleSave);
    await userRoles.takeScreenShot("UserRoles", "edit-user-role");
  },
);

Then("I search that user role and duplicate it", async function () {
  const rowLocator = await userRoles.findRowInPaginatedTable(
    constants.ROLE_NAME,
  );
  if (!rowLocator) throw new Error("Role not found in table");

  await userRoles.clickRowAction(rowLocator, "duplicate");
  await userRoles.clickAction(userRoles.userRoleSave);
});

Then("I search that user role and delete it", async function () {
  const rowLocator = await userRoles.findRowInPaginatedTable(
    constants.ROLE_NAME,
  );
  if (!rowLocator) throw new Error("Role not found in table");

  await userRoles.clickRowAction(rowLocator, "delete");
  await userRoles.takeScreenShot("UserRoles", "delete-user-role");
});

Then("I search that duplicate user role and delete it", async function () {
  const rowLocator = await userRoles.findRowInPaginatedTable(
    constants.ROLE_NAME + " (Copy)",
  );
  if (!rowLocator) throw new Error("Duplicate role not found in table");

  await userRoles.clickRowAction(rowLocator, "delete");
  await userRoles.takeScreenShot("UserRoles", "delete-duplicate-user-role");
});
