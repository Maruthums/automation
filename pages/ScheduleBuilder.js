const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const constants = require("../common/constants");
const { schedulerData } = require("../common/testData");

class ScheduleBuilder extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.toolsLink = this.page.locator("//span[normalize-space()='Tools']");
    this.scheBuildLink = this.page.locator(
      "//p[normalize-space()='My Week Schedule Builder']",
    );
    this.scheBuildTitle = this.page.locator('//div[@id="tableTitle"]');
    this.campFilter = this.page.locator(
      "//label[normalize-space()='Camp']//following-sibling::div",
    );
    this.createButton = this.page.locator(
      "//button[@type='button' and normalize-space()='Create New Schedule']",
    );
    this.chooseYear = this.page.locator("#simple-select-Year");
    this.chooseCamp = this.page.locator("#simple-select-Camp");
    this.nextButton = this.page.locator(
      "//button[@type='button' and normalize-space()='NEXT']",
    );
    this.scheGeneral = this.page.locator("//p[normalize-space()='General']");
    this.scheCoveKids = this.page.locator("//p[normalize-space()='Cove Kids']");
    this.scheCrew = this.page.locator("//p[normalize-space()='Crew']");
    this.scheImpact = this.page.locator("//p[normalize-space()='Impact']");
    this.whatBringIcon = this.page.locator(
      "//p[normalize-space()='What to Bring']",
    );
    this.gender = this.page.locator("#simple-select-Gender");
    this.locationIcon = this.page.locator("//p[normalize-space()='Location']");
    this.activityIcon = this.page.locator("//p[normalize-space()='Activity']");
    this.mealIcon = this.page.locator(
      "//p[normalize-space()='Meal/Transition']",
    );
    this.headlineIcon = this.page.locator("//p[normalize-space()='Headline']");
    this.scheTime = this.page.locator(
      `//input[@type='text' and @placeholder="HH:MM AM/PM"]`,
    );
    this.wearCheck = this.page.locator(
      "//span[normalize-space()='Wear']//preceding-sibling::span//input[@type='checkbox']",
    );
    this.wearFill = this.page.locator("//input[@name='What to wear']");
    this.packCheck = this.page.locator(
      "//span[normalize-space()='Pack']//preceding-sibling::span//input[@type='checkbox']",
    );
    this.packFill = this.page.locator("//input[@name='What to pack']");
    this.scheLocation = this.page.locator("//input[@name='Location']");
    this.schePickUp = this.page.locator("//p[normalize-space()='pick up']");
    this.scheDropOff = this.page.locator("//p[normalize-space()='drop off']");
    this.scheMeet = this.page.locator("//p[normalize-space()='MEET']");
    this.scheActivityName = this.page.locator(
      `//input[@name='Activity Name' and @placeholder="Text"]`,
    );
    this.scheDesc = this.page.locator(
      `//input[@name='Description' and @placeholder="Text"]`,
    );
    this.scheAddPopUp = this.page.locator(
      "//button[normalize-space()='Add a Popup']",
    );
    this.schePopUpTypePara = this.page.locator(
      '[id="simple-select-Popup Type"]',
    );
    this.schePopupName = this.page.locator(`//input[@name='Popup Name']`);
    this.schePopupTitle = this.page.locator(`//input[@name='Title']`);
    this.schePopupDesc = this.page.locator(`//textarea[@name='Description']`);
    this.schePopUpTypeList = this.page.locator(
      '[id="simple-select-Popup Type"]',
    );
    this.scheAddListItem = this.page.locator(
      "//button[normalize-space()='Add List Item']",
    );
    this.scheListItem = this.page.locator("//input[@name='List Item']");
    this.schePgmLoc = this.page.locator('[id="simple-select-Popup Type"]');
    this.schePgmPickup = this.page.locator("//p[normalize-space()='PICK UP']");
    this.covekidsPgmLoc = this.page.locator(
      `//p[normalize-space()='Cove Kids']//parent::div//following-sibling::div//input[@name="Location"]`,
    );
    this.crewPgmLoc = this.page.locator(
      `//p[normalize-space()='Crew']//parent::div//following-sibling::div//input[@name="Location"]`,
    );
    this.impactPgmLoc = this.page.locator(
      `//p[normalize-space()='Impact']//parent::div//following-sibling::div//input[@name="Location"]`,
    );
    this.scheMeal = this.page.locator("#simple-select-Category");
    this.scheFlush = this.page.locator("#simple-select-Category");
    this.scheCustom = this.page.locator("#simple-select-Category");
    this.scheBreakFast = this.page.locator("#simple-select-Meal");
    this.scheLunch = this.page.locator("#simple-select-Meal");
    this.scheDinner = this.page.locator("#simple-select-Meal");
    this.scheSnack = this.page.locator("#simple-select-Meal");
    this.scheHeadline = this.page.locator("//input[@name='Headline Name']");
    this.scheGenAction = this.page.locator(
      "//p[normalize-space()='General']//following::p[normalize-space()='ACTIONS'][1]",
    );
    this.scheGenAction2 = this.page.locator(
      "//p[normalize-space()='General']//following::p[normalize-space()='ACTIONS'][2]",
    );
    this.scheCopyEntireDay = this.page.locator(
      "//p[normalize-space()='Copy Entire Day']",
    );
    this.scheDelElement = this.page.locator(
      "//p[normalize-space()='Delete Element']",
    );
    this.scheDelElemConfirm = this.page.locator(
      "//button[@type='button' and normalize-space()='CONFIRM']",
    );
    this.saveEntireDayButton = this.page.locator(
      "//button[@type='button' and normalize-space()='SAVE']",
    );
    this.savePubButton = this.page.locator(
      "//button[@type='button' and normalize-space()='Save and Publish']",
    );
    this.rowSelector = this.page.locator(
      `//table[@aria-label="sortable table"]`,
    );
    this.nextPageSelector = this.page.locator('[aria-label="Go to next page"]');
    this.editIcon = this.page.locator(
      "//li[@role='menuitem' and normalize-space()='Edit']",
    );
    this.duplicateIcon = this.page.locator(
      "//li[@role='menuitem' and normalize-space()='Duplicate']",
    );
    this.deleteIcon = this.page.locator(
      "//li[@role='menuitem' and normalize-space()='Delete']",
    );
    this.scheBuildDelConfirm = this.page.locator(
      "//button[@type='button' and normalize-space()='CONFIRM']",
    );
    this.chooseVersion = this.page.locator("#simple-select-Version");
    this.dupSaveButton = this.page.locator(
      "//button[@type='button' and normalize-space()='SAVE']",
    );

    // generic success toast/snackbar
    this.successToast = this.page.locator(
      "//div[@role='dialog']//p[contains(translate(., 'ABCDEFGHIJKLMNOPQRSTUVWXYZ','abcdefghijklmnopqrstuvwxyz'),'successfully')]",
    );
  }

  async listOption(optionName) {
    return await this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async selectFromDropdown(fieldLocator, optionName) {
    await this.selectValuefromListDropdown(
      fieldLocator,
      await this.listOption(optionName),
    );
  }

  async selectSpecificDays() {
    const daysToSelect = schedulerData.daysToSelect;

    for (const day of daysToSelect) {
      const checkbox = this.page.locator(
        `//li[@role='menuitem' and .//span[normalize-space()='${day}']]//input[@type='checkbox' and not(@disabled)]`,
      );
      if (await checkbox.isEnabled()) {
        await checkbox.check();
        console.log(`Selected: ${day}`);
      } else {
        console.log(`Skipped (disabled): ${day}`);
      }
    }
  }


  async processBuilderFlow(flowType, tabName) {
    if (flowType === "create") {
      await this.clickAction(this.locators.createButton);
      await this.selectFromDropdown(this.chooseYear, constants.CURRENT_YEAR);
      await this.waitForSpinner();
      await this.selectFromDropdown(this.chooseCamp, constants.FAMILY_CAMP);
      await this.waitForSpinner();
      await this.clickAction(this.locators.nextButton);
    }

    await this.goToTab(tabName);

    switch (flowType) {
      case "create":
        await this.fillScheduleActivities();
        break;
      case "edit":
        await this.editScheduleActivities();
        break;
      case "duplicate":
        await this.duplicateScheduleActivities();
        break;
    }

    // Always copy entire day at the end
    await this.clickAction(this.scheGenAction);
    await this.clickAction(this.scheCopyEntireDay);
    await this.selectSpecificDays();
    await this.clickAction(this.saveEntireDayButton);
  }

  async goToTab(tabName) {
    switch (tabName) {
      case "General":
        await this.clickAction(this.scheGeneral);
        break;
      case "Cove Kids":
        await this.clickAction(this.scheCoveKids);
        break;
      case "Crew":
        await this.clickAction(this.scheCrew);
        break;
      case "Impact":
        await this.clickAction(this.scheImpact);
        break;
      default:
        throw new Error(`Unknown tab: ${tabName}`);
    }
    await this.validateToContainsText(
      this.page.locator(`//p[normalize-space()='${tabName}']`),
      new RegExp(tabName),
    );
  }

  //---------- CREATE FLOW ----------
  async createScheduleBuilder(tabName) {
    if (tabName === "General") {
      await this.clickAction(this.createButton);
      await this.selectValuefromListDropdown(
        this.chooseYear,
        await this.listOption(constants.CURRENT_YEAR),
      );
      await this.waitForSpinner();
      await this.selectValuefromListDropdown(
        this.chooseCamp,
        await this.listOption(constants.FAMILY_CAMP),
      );
      await this.waitForSpinner();
      await this.clickAction(this.nextButton);
    }
    await this.goToTab(tabName);
    await this.fillScheduleActivities();
  }

  async fillScheduleActivities() {
    // Fill the 3 morning activities
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.morning.activities[0],
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.morning.times[0]),
    );
    await this.fillInput(this.scheDesc, schedulerData.morning.descriptions[0]);
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.morning.activities[1],
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.morning.times[1]),
    );
    await this.fillInput(this.scheLocation, schedulerData.morning.locations[0]);
    await this.fillInput(this.scheDesc, schedulerData.morning.descriptions[1]);
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.morning.activities[2],
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.morning.times[2]),
    );
    await this.fillInput(this.scheLocation, schedulerData.morning.locations[1]);

    // What to Bring
    await this.clickAction(this.whatBringIcon);
    await this.selectValuefromListDropdown(
      this.gender,
      await this.listOption("All"),
    );
    await this.clickAction(this.wearCheck);
    await this.fillInput(this.wearFill, schedulerData.whatToBring.wear);
    await this.clickAction(this.packCheck);
    await this.fillInput(this.packFill, schedulerData.whatToBring.pack);

    // Fill the breakfast
    await this.clickAction(this.mealIcon.first());
    await this.selectValuefromListDropdown(
      this.scheMeal,
      await this.listOption(schedulerData.meal.type),
    );
    await this.selectValuefromListDropdown(
      this.scheBreakFast,
      await this.listOption(schedulerData.meal.breakfast.type),
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.meal.breakfast.time),
    );
    await this.fillInput(this.schePopupDesc, schedulerData.meal.breakfast.desc);

    // Kids Program Begin
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.kidsProgramBegin.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.kidsProgramBegin.time),
    );
    await this.clickAction(this.scheAddPopUp);
    await this.selectValuefromListDropdown(
      this.schePgmLoc,
      await this.listOption("Program Locations"),
    );
    await this.fillInput(
      this.covekidsPgmLoc,
      schedulerData.schedule.coveKidsLocation,
    );
    await this.fillInput(this.crewPgmLoc, schedulerData.schedule.crewLocation);
    await this.fillInput(
      this.impactPgmLoc,
      schedulerData.schedule.impactLocation,
    );

    // Speaker Session
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.speakerSession.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.speakerSession.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.schedule.speakerSession.location,
    );
    await this.fillInput(
      this.scheDesc,
      schedulerData.schedule.speakerSession.desc,
    );

    // Rite Night Meeting
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.riteNightMeeting.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.riteNightMeeting.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.schedule.riteNightMeeting.location,
    );
    await this.fillInput(
      this.scheDesc,
      schedulerData.schedule.riteNightMeeting.desc,
    );

    // Lunch
    await this.clickAction(this.mealIcon.first());
    await this.selectValuefromListDropdown(
      this.scheMeal,
      await this.listOption(schedulerData.meal.type),
    );
    await this.selectValuefromListDropdown(
      this.scheLunch,
      await this.listOption(schedulerData.meal.lunch.type),
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.meal.lunch.time),
    );
    await this.fillInput(this.schePopupDesc, schedulerData.meal.lunch.desc);

    // Extended Family Free Time
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.extendedFamilyFreeTime.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.extendedFamilyFreeTime.time),
    );
    await this.fillInput(
      this.scheDesc,
      schedulerData.schedule.extendedFamilyFreeTime.desc,
    );
    await this.clickAction(this.scheAddPopUp);
    await this.selectValuefromListDropdown(
      this.schePopUpTypeList,
      await this.listOption("List"),
    );
    await this.fillInput(
      this.schePopupName,
      schedulerData.schedule.extendedFamilyFreeTime.popup.name,
    );
    await this.fillInput(
      this.schePopupTitle,
      schedulerData.schedule.extendedFamilyFreeTime.popup.title,
    );
    await this.fillInput(
      this.scheListItem,
      schedulerData.schedule.extendedFamilyFreeTime.popup.listItem,
    );

    // Free Time Continues
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.freeTimeContinues.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.freeTimeContinues.time),
    );
    await this.clickAction(this.scheAddPopUp);
    await this.selectValuefromListDropdown(
      this.schePopUpTypeList,
      await this.listOption("List"),
    );
    await this.fillInput(
      this.schePopupName,
      schedulerData.schedule.extendedFamilyFreeTime.popup.name,
    );
    await this.fillInput(
      this.schePopupTitle,
      schedulerData.schedule.freeTimeContinues.popupTitle,
    );

    // Pick Up Cove Kids
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.pickUpCoveKids.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.pickUpCoveKids.time),
    );
    // Flush & Brush
    await this.clickAction(this.mealIcon.first());
    await this.selectValuefromListDropdown(
      this.scheFlush,
      await this.listOption(schedulerData.meal.flushAndBrush.type),
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.meal.flushAndBrush.time),
    );
    await this.fillInput(
      this.schePopupDesc,
      schedulerData.meal.flushAndBrush.desc,
    );

    // Evening Program
    await this.clickAction(this.headlineIcon);
    await this.fillInput(
      this.scheHeadline,
      schedulerData.schedule.eveningProgram.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.eveningProgram.time),
    );

    // Kids Program Begin (Evening)
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.kidsProgramBegin.eveningName,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(
        schedulerData.schedule.kidsProgramBegin.eveningTime,
      ),
    );
    await this.clickAction(this.scheAddPopUp);
    await this.selectValuefromListDropdown(
      this.schePgmLoc,
      await this.listOption("Program Locations"),
    );
    await this.fillInput(
      this.covekidsPgmLoc,
      schedulerData.schedule.coveKidsLocation,
    );
    await this.fillInput(this.crewPgmLoc, schedulerData.schedule.crewLocation);
    await this.fillInput(
      this.impactPgmLoc,
      schedulerData.schedule.impactLocation,
    );

    // Adult Date Night
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.adultDateNight.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.adultDateNight.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.schedule.adultDateNight.location,
    );

    // Kids Program End
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.kidsProgramEnd.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.kidsProgramEnd.time),
    );
    await this.clickAction(this.scheAddPopUp);
    await this.selectValuefromListDropdown(
      this.schePgmLoc,
      await this.listOption("Program Locations"),
    );
    await this.clickAction(this.schePgmPickup);
    await this.fillInput(
      this.covekidsPgmLoc,
      schedulerData.schedule.coveKidsLocation,
    );
    await this.fillInput(this.crewPgmLoc, schedulerData.schedule.crewLocation);
    await this.fillInput(
      this.impactPgmLoc,
      schedulerData.schedule.impactReleasedLocation,
    );

    // Snacks & Games
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.schedule.snacksAndGames.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.schedule.snacksAndGames.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.schedule.snacksAndGames.location,
    );

    // Copy the entire day to 4 other days of the week
    await this.clickAction(this.scheGenAction);
    await this.clickAction(this.scheCopyEntireDay);
    await this.selectSpecificDays();
    await this.clickAction(this.saveEntireDayButton);
  }

  //---------- EDIT FLOW ----------
  async editScheduleBuilder(tabName) {
    // currently only General tab is taken for editing
    if (tabName !== "General") {
      throw new Error(
        `Editing is currently supported only for 'General'. Received: ${tabName}`,
      );
    }
    await this.goToTab("General");
    await this.editScheduleActivities();
  }

  async editScheduleActivities() {
    // Update & fill 2 morning activities
    await this.page
      .locator(`//p[normalize-space()='${schedulerData.morning.activities[2]}']`)
      .first()
      .click();
    await this.clearAndFill(
      this.scheActivityName,
      schedulerData.editFlow.morning1.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.morning1.time),
    );
    await this.clearAndFill(
      this.scheLocation,
      schedulerData.editFlow.morning1.location,
    );
    await this.fillInput(this.scheDesc, schedulerData.editFlow.morning1.desc);

    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.editFlow.morning2.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.morning2.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.editFlow.morning2.location,
    );
    await this.fillInput(this.scheDesc, schedulerData.editFlow.morning2.desc);

    // Update & fill 2 morning activities
    await this.page
      .locator(`//p[normalize-space()='${schedulerData.schedule.riteNightMeeting.name}']`)
      .first()
      .click();
    await this.clearAndFill(
      this.scheActivityName,
      schedulerData.editFlow.morning3.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.morning3.time),
    );
    await this.clearAndFill(
      this.scheLocation,
      schedulerData.editFlow.morning3.location,
    );
    await this.clearAndFill(
      this.scheDesc,
      schedulerData.editFlow.morning3.desc,
    );

    await this.page
      .locator(`//p[normalize-space()='${schedulerData.schedule.kidsProgramBegin.eveningName}']`)
      .first()
      .click();
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.kidsProgramBegin.time),
    );
    await this.clickAction(this.schePgmPickup);

    // Update & Fill the Lunch
    await this.page.locator(`//p[normalize-space()='${schedulerData.meal.lunch.type}']`).first().click();
    await this.clearAndFill(
      this.schePopupDesc,
      schedulerData.editFlow.lunch.desc,
    );

    // Update & Fill the 2 aftenoon activities
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.editFlow.afternoon1.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.afternoon1.time),
    );

    await this.page
      .locator(`//p[normalize-space()='${schedulerData.schedule.pickUpCoveKids.name}']`)
      .first()
      .click();
    await this.clickAction(this.scheGenAction2);
    await this.clickAction(this.scheDelElement);
    await this.clickAction(this.scheDelElemConfirm);

    // Update & Fill 2 evening activities
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.editFlow.evening1.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.evening1.time),
    );

    await this.page
      .locator(`//p[normalize-space()='${schedulerData.schedule.snacksAndGames.name}']`)
      .first()
      .click();
    await this.clearAndFill(
      this.scheActivityName,
      schedulerData.editFlow.evening2.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.editFlow.evening2.time),
    );
    await this.clearAndFill(
      this.scheLocation,
      schedulerData.editFlow.evening2.location,
    );
    await this.fillInput(this.scheDesc, schedulerData.editFlow.evening2.desc);

    // Copy the entire day to 4 other days of the week
    await this.clickAction(this.scheGenAction);
    await this.clickAction(this.scheCopyEntireDay);
    await this.selectSpecificDays();
    await this.clickAction(this.saveEntireDayButton);
  }

  //---------- DUPLICATE FLOW ----------
  async duplicateScheduleBuilder(tabName) {
    await this.selectValuefromListDropdown(
      this.chooseVersion,
      await this.listOption("Master"),
    );
    await this.clickAction(this.dupSaveButton);

    await this.waitForSpinner();

    // currently only General tab is taken for duplicate
    if (tabName !== "General") {
      throw new Error(
        `Editing is currently supported only for 'General'. Received: ${tabName}`,
      );
    }
    await this.goToTab("General");
    await this.duplicateScheduleActivities();
  }

  async duplicateScheduleActivities() {
    // Update & fill the morning activities
    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.duplicateFlow.morning1.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.duplicateFlow.morning1.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.duplicateFlow.morning1.location,
    );

    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.duplicateFlow.morning2.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.duplicateFlow.morning2.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.duplicateFlow.morning2.location,
    );

    await this.clickAction(this.activityIcon.first());
    await this.fillInput(
      this.scheActivityName,
      schedulerData.duplicateFlow.morning3.name,
    );
    await this.selectValuefromListDropdown(
      this.scheTime,
      await this.listOption(schedulerData.duplicateFlow.morning3.time),
    );
    await this.fillInput(
      this.scheLocation,
      schedulerData.duplicateFlow.morning3.location,
    );
    await this.fillInput(
      this.scheDesc,
      schedulerData.duplicateFlow.morning3.desc,
    );

    // Copy the entire day to 4 other days of the week
    await this.clickAction(this.scheGenAction);
    await this.clickAction(this.scheCopyEntireDay);
    await this.selectSpecificDays();
    await this.clickAction(this.saveEntireDayButton);
  }

  async findRowInPaginatedTable(rowSelector, searchText) {
    let pageCount = 1;
    while (true) {
      const rowCount = await rowSelector.locator("//p[1]").count();
      for (let i = 0; i < rowCount; i++) {
        const row = rowSelector.nth(i); // this is a Locator
        const rowText = await row.textContent();
        if (rowText.includes(searchText)) {
          console.log(`Found "${searchText}" on page ${pageCount}`);
          return row; // Locator
        }
      }
    }
  }

  async clickRowAction(rowLocator, action = "edit") {
    const moreIcon = rowLocator
      .locator("#schedule-more-icon-0")
      .first();
    await this.clickAction(moreIcon);

    await this.page
      .locator("ul[role='menu']")
      .waitFor({ state: "visible", timeout: 10000 });
    let actionLocator;

    switch (action.toLowerCase()) {
      case "edit":
        actionLocator = this.page.locator(
          "//li[@role='menuitem' and normalize-space()='Edit']",
        );
        break;
      case "duplicate":
        actionLocator = this.page.locator(
          "//li[@role='menuitem' and normalize-space()='Duplicate']",
        );
        break;
      case "delete":
        actionLocator = this.page.locator(
          "//li[@role='menuitem' and normalize-space()='Delete']",
        );
        break;
      default:
        throw new Error(`Unknown row action: ${action}`);
    }
    await this.clickAction(actionLocator);
    await this.page
      .locator("ul[role='menu']")
      .waitFor({ state: "hidden", timeout: 10000 })
      .catch(() => {});
  }

  async waitForPublishOrSave() {
    // If a success toast/snackbar appears, wait for it briefly (optional)
    if (
      await this.successToast
        .first()
        .isVisible({ timeout: 1000 })
        .catch(() => false)
    ) {
      await expect(this.successToast).toBeVisible({ timeout: 10000 });
      await this.successToast
        .waitFor({ state: "hidden", timeout: 10000 })
        .catch(() => {});
    }
    await this.waitForSpinner();
  }

  async waitForTime(timeOut){
    await this.page.waitForTimeout(timeOut);
  }
}

module.exports = { ScheduleBuilder };
