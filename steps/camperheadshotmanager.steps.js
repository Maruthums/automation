const { When } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { CamperHeadshotManager } = require("../pages/CamperHeadshotManager");
require("../common/hooks");
const { camperHeadshotData } = require("../common/testData");

let camperHeadshotManager;

When(
  "Check the campers and headshots status on every tab switch",
  async function () {
    const sharedData = camperHeadshotData;

    camperHeadshotManager = new CamperHeadshotManager(pageFixture.page);
    await camperHeadshotManager.clickAction(camperHeadshotManager.toolsLink);
    await camperHeadshotManager.clickAction(
      camperHeadshotManager.campHeadshotLink,
    );
    await camperHeadshotManager.validateToHaveText(
      camperHeadshotManager.campHeadshotTitle,
      /Camper Headshot Manager/,
    );

    for (const element of sharedData) {
      const { camperName, campName, year, week, tab } = element;

      // Apply filters (year, week, camp)
      await camperHeadshotManager.applyFilters(year, week, campName);

      // Switch to the correct tab
      await camperHeadshotManager.switchToTab(tab);

      // Search & validate camper in that tab’s table
      await camperHeadshotManager.isCamperVisible(camperName, tab);
    }
  },
);
