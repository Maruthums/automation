const { When, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { ScheduleBuilder } = require("../pages/ScheduleBuilder");
const constants = require("../common/constants");

let scheBuild;

When(
  "add a new schedule builder for a Family Camp",
  async function (dataTable) {
    scheBuild = new ScheduleBuilder(pageFixture.page);
    await scheBuild.clickAction(scheBuild.toolsLink);
    await scheBuild.clickAction(scheBuild.scheBuildLink);
    await scheBuild.validateToHaveText(
      scheBuild.scheBuildTitle,
      /My Week Schedule Builder/,
    );

    const tabs = dataTable.raw().slice(1); // skip header row

    for (const [tabName] of tabs) {
      console.log(`Executing schedule builder CREATE flow for: ${tabName}`);
      await scheBuild.createScheduleBuilder(tabName);
    }

    // Final save & publish after all tabs done
    await scheBuild.clickAction(scheBuild.savePubButton);
    await scheBuild.waitForPublishOrSave();
    await scheBuild.waitForTime(3000);
    await scheBuild.takeScreenShot("ScheduleBuilder", `add-schedule-builder`);
  },
);

Then("search and edit the schedule builder", async function (dataTable) {
  // Filter by camp (optional but speeds up)
  await scheBuild.selectValuefromListDropdown(
    scheBuild.campFilter,
    await scheBuild.listOption(constants.FAMILY_CAMP),
  );
  await scheBuild.waitForSpinner();

  // Find the row
  const editrowLocator = await scheBuild.findRowInPaginatedTable(
    scheBuild.rowSelector,
    `${constants.FAMILY_CAMP} ${constants.CURRENT_YEAR}`,
  );
  if (!editrowLocator) throw new Error("Schedule builder not found in table");

  // Click edit
  await scheBuild.clickRowAction(editrowLocator, "edit");
  await scheBuild.waitForSpinner();

  // DataTable will contain only 'General'
  const tabs = dataTable.raw().slice(1); // skip header row
  for (const [tabName] of tabs) {
    console.log(`Executing schedule builder EDIT flow for: ${tabName}`);
    await scheBuild.editScheduleBuilder(tabName);
  }

  // Save & Publish after edit
  await scheBuild.clickAction(scheBuild.savePubButton);
  await scheBuild.waitForPublishOrSave();
  await scheBuild.takeScreenShot("ScheduleBuilder", `edit-schedule-builder`);
});

Then("duplicate the schedule builder", async function (dataTable) {
  await scheBuild.selectValuefromListDropdown(
    scheBuild.campFilter,
    await scheBuild.listOption(constants.FAMILY_CAMP),
  );
  await scheBuild.waitForSpinner();

  // Find the row
  const duplicateRowLocator = await scheBuild.findRowInPaginatedTable(
    scheBuild.rowSelector,
    `${constants.FAMILY_CAMP} ${constants.CURRENT_YEAR}`,
  );
  if (!duplicateRowLocator)
    throw new Error("Schedule builder not found in table");

  // Click duplicate
  await scheBuild.clickRowAction(duplicateRowLocator, "duplicate");
  await scheBuild.waitForSpinner();

  // DataTable will contain only 'General'
  const tabs = dataTable.raw().slice(1); // skip header row
  for (const [tabName] of tabs) {
    console.log(`Executing schedule builder DUPLICATE flow for: ${tabName}`);
    await scheBuild.duplicateScheduleBuilder(tabName);
  }

  // Save & Publish after duplicate
  await scheBuild.clickAction(scheBuild.savePubButton);
  await scheBuild.waitForSpinner();
  await scheBuild.waitForPublishOrSave();
  await scheBuild.waitForTime(2000);
  await scheBuild.takeScreenShot("ScheduleBuilder", `duplicate-schedule-builder`);
});

Then("delete the schedule builder in our sidekick portal", async function () {
  await scheBuild.selectValuefromListDropdown(
    scheBuild.campFilter,
    await scheBuild.listOption(constants.FAMILY_CAMP),
  );
  await scheBuild.waitForSpinner();

  // Find the row
  const deleteRowLocator = await scheBuild.findRowInPaginatedTable(
    scheBuild.rowSelector,
    `${constants.FAMILY_CAMP} ${constants.CURRENT_YEAR}`,
  );
  if (!deleteRowLocator) throw new Error("Schedule builder not found in table");

  // Click delete
  await scheBuild.clickRowAction(deleteRowLocator, "delete");
  await scheBuild.clickAction(scheBuild.scheBuildDelConfirm);
  await scheBuild.waitForTime(1000);
  await scheBuild.takeScreenShot("ScheduleBuilder", `delete-schedule-builder`);
  await scheBuild.waitForSpinner();
});

Then(
  "search that duplicate schedule builder and delete it in our sidekick portal",
  async function () {
    await scheBuild.selectValuefromListDropdown(
      scheBuild.campFilter,
      await scheBuild.listOption(constants.FAMILY_CAMP),
    );
    await scheBuild.waitForSpinner();

    // Find the row
    const deleteDupRowLocator = await scheBuild.findRowInPaginatedTable(
      scheBuild.rowSelector,
      `${constants.FAMILY_CAMP} ${constants.NEXT_YEAR}`,
    );
    if (!deleteDupRowLocator)
      throw new Error("Schedule builder not found in table");

    // Click delete
    await scheBuild.clickRowAction(deleteDupRowLocator, "delete");
    await scheBuild.clickAction(scheBuild.scheBuildDelConfirm);
    await scheBuild.waitForSpinner();
  },
);
