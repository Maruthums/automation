const { Given, When, Then } = require("@cucumber/cucumber");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../common/pageFixture");
const { TableauDashboards } = require("../pages/TableauDashboards");

let tableauDashboards;
let createdDashboardData = {};

Given(
  "the user navigates to the Tableau Dashboards Page via the Tableau sidebar",
  async function () {
    tableauDashboards = new TableauDashboards(pageFixture.page);
    await tableauDashboards.clickAction(tableauDashboards.tableauSidebar);
    await tableauDashboards.validateToHaveText(
      tableauDashboards.pageTitle,
      /Tableau Dashboards/,
    );
  },
);

When('the user clicks on "NEW DASHBOARD" button', async function () {
  await tableauDashboards.clickAction(tableauDashboards.newDashboardButton);
});

Then('the "New Dashboard" modal should open', async function () {
  await tableauDashboards.modalTitle.waitFor({ state: "visible" });
  await tableauDashboards.validateToContainsText(
    tableauDashboards.modalTitle,
    "New Dashboard",
  );
});

Then("the user fills all the fields", async function () {
  createdDashboardData = await tableauDashboards.creatingNewGroup();
});

Then("the same newly added group should be selected", async function () {
  tableauDashboards = new TableauDashboards(pageFixture.page);
  await tableauDashboards.selectDynamicGroup(createdDashboardData.group);
  await tableauDashboards.clickAction(tableauDashboards.doneButton);
});

Then('the user clicks on "SAVE" button', async function () {
  await tableauDashboards.clickAction(tableauDashboards.saveButton);
  await tableauDashboards.takeScreenShot("TableauDashboards", "edit-user-role");
  await tableauDashboards.page.reload({ waitUntil: "domcontentloaded" });
});

Then(
  'the user clicks on "COLLAPSE ALL" button all groups should collapse',
  async function () {
    await tableauDashboards.collapseGroups();
  },
);

Then(
  'if the user clicks on "EXPAND ALL" button all groups should expand',
  async function () {
    await tableauDashboards.expandGroups();
    await tableauDashboards.openDashboardOptions(createdDashboardData.title);
  },
);

Then("user favorite the created dashboard", async function () {
  await tableauDashboards.dashboardMenus(
    createdDashboardData.title,
    "Favorite",
  );
  await tableauDashboards.waitForSpinner();
  await tableauDashboards.waitForToast("Added to favorite");
  await tableauDashboards.waitForTime(2000);
  await tableauDashboards.waitForToastToDisappear();

  // Unfavorite (menu reopened automatically)
  await tableauDashboards.dashboardMenus(
    createdDashboardData.title,
    "Unfavorite",
  );
  await tableauDashboards.waitForSpinner();
  await tableauDashboards.waitForToast("Removed from favorite");
  await tableauDashboards.waitForToastToDisappear();
});

Then("user edit the created dashboard", async function () {
  tableauDashboards = new TableauDashboards(pageFixture.page);
  await tableauDashboards.dashboardMenus(createdDashboardData.title, "Edit"); // pass data for validation
  await tableauDashboards.waitForSpinner();

  // Wait for edit form to show up
  await tableauDashboards.titleInputField.waitFor({
    state: "visible",
    timeout: 10000,
  });

  await expect(tableauDashboards.titleInputField).toHaveValue(
    createdDashboardData.title,
  );
  await expect(tableauDashboards.shortTitleInputField).toHaveValue(
    createdDashboardData.shortTitle,
  );
  await expect(tableauDashboards.descriptionInputField).toHaveValue(
    createdDashboardData.description,
  );
  console.log(
    `Dashboard "${createdDashboardData.title}" details are validated.`,
  );
  await tableauDashboards.clickAction(tableauDashboards.cancelButton);
});

Then("user open in tableau with the created dashboard", async function () {
  const [newPage] = await Promise.all([
    tableauDashboards.page.context().waitForEvent("page"),
    tableauDashboards.dashboardMenus(
      createdDashboardData.title,
      "Open in Tableau",
    ),
  ]);
  const newTableau = new TableauDashboards(newPage);
  await newTableau.page.close();
});

Then("user delete the created dashboard", async function () {
  await tableauDashboards.dashboardMenus(createdDashboardData.title, "Delete");
  await tableauDashboards.takeScreenShot("TableauDashboards", "deleted-dashboard");
  await tableauDashboards.clickAction(tableauDashboards.confirmButton);
  await tableauDashboards.waitForSpinner();
  console.log(`Dashboard "${createdDashboardData.title}" deleted.`);
});

Then("check if the user can rename and delete groups", async function () {
  await tableauDashboards.renameAndDeleteIfExists(createdDashboardData.group);
});
