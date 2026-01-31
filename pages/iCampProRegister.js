const { baseClass } = require("../common/baseclass");
const { faker } = require("@faker-js/faker");
const { getNextGender } = require("../config/genderToggle");

class Households extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.pageTitle = this.page.locator("//h1[normalize-space()='Dashboard']");
    this.household = this.page.locator(
      "//span[normalize-space()='Households']",
    );
    this.householdHeader = this.page.locator(
      "//h1[normalize-space()='Household Management']",
    );
    this.staff = this.page.locator("//span[normalize-space()='Staff']");
    this.staffSeason = this.page.locator("#tiered-heading-dropdown-toggle");
    this.onRoster = this.page.locator("//button[contains(., 'On Roster')]");
    this.staffSearch = this.page.locator("#search");
    this.staffClose = this.page.locator(
      `//div[@aria-labeled-by="modal-title-full-width-height"]//button[@aria-label="Close"]`,
    );
    this.addRegisterbutton = this.page.locator(
      "//button[normalize-space()='Add Registration']",
    );
    this.registrationHeader = this.page.locator(
      "//h1[normalize-space()='Add Registration']",
    );
    this.familyCamp = this.page.locator(
      `//span[contains(text(),'Family Camp')]`,
    );
    this.fcShowAvailable = this.page.locator("#filterBy");
    this.fcAttendees = this.page.locator(
      "//span[contains(text(), ' Attendees: ')]//following-sibling::span",
    );
    this.fcCapacity = this.page.locator(
      "//span[contains(text(), ' Capacity')]",
    );
    this.fcNextButton = this.page.locator("//button[normalize-space()='Next']");
    this.fcCheckout = this.page.locator(
      "//button[normalize-space()='Checkout']",
    );
    this.fcChoose = this.page.locator("//span[normalize-space()='Choose']");
    this.fcCash = this.page.locator("//span[normalize-space()='Cash']");
    this.fcAddRegister = this.page.locator(
      '//button[contains(@class, "primary")]//div[contains(text(), "Add Registration")]',
    );
    this.fcYes = this.page.locator("//button[normalize-space()='Yes']");
    this.fcSuccess = this.page.locator(".modal-dialog h3");
    this.fcDone = this.page.locator("//button[normalize-space()='Done']");
    this.youthCamp = this.page.locator("//span[contains(text(),'Youth Camp')]");
    this.yc7thGrade = this.page.locator(
      "//div[contains(text(),'7th Grade')]//ancestor::button",
    );
    this.ycAddCart = this.page.getByRole("button", {
      name: "Add to Cart",
      exact: true,
    });
    this.ycCheckout = this.page.locator(
      "//button[normalize-space()='Checkout']",
    );
    this.ycSuccess = this.page.locator(".modal-dialog h3");
    this.ycDone = this.page.locator("//button[normalize-space()='Done']");
    this.dayCamp = this.page.locator("//span[contains(text(),'Day Camp')]");
    this.yc6thGrade = this.page.locator(
      "//div[contains(text(),'6th Grade')]//ancestor::button",
    );
    this.addHouseholdMember = this.page.locator(
      "//em[normalize-space()='Add Household Member']",
    );
    this.dialogBox = this.page.locator('div[role="dialog"]');
    this.childfirstName = this.page.locator("#first_name");
    this.childlastName = this.page.locator("#last_name");
    this.childgender = this.page.locator("#gender");
    this.childOption = this.page.getByText("Child", { exact: true });
    this.dateOfBirth = this.page.locator("#date_of_birth");
    this.grade = this.page.locator(
      'div[role="dialog"] select[formcontrolname="grade"]',
    );
    this.save = this.page.locator(
      'div[role="dialog"] button:has-text(" Save ")',
    );

    this.backToHousehold = this.page.locator(
      "//span[normalize-space()='Back to Household List']",
    );
    this.newHousehold = this.page.locator(
      "//button[normalize-space()='New Household']",
    );
    this.newHouseholdHeader = this.page.locator(
      "//h1[normalize-space()='New Household']",
    );
    this.alertMsg = this.page.locator(
      "//div[contains(@class, 'alert alert-danger alert-has-icon') and contains(text(), ' Please complete the required fields above. ')]",
    );
    this.firstName = this.page.locator("#firstName");
    this.lastName = this.page.locator("#lastName");
    this.gender = this.page.locator("#input-gender");
    this.email = this.page.locator("#email");
    this.mobile = this.page.locator("#mobile");
    this.mailStreet = this.page.locator("#mailing_address_street");
    this.mailCity = this.page.locator("#mailing_address_city");
    this.mailState = this.page.locator("#mailing_address_state");
    this.mailZip = this.page.locator("#mailing_address_zip");
    this.saveHousehold = this.page.locator(
      "//button[normalize-space()='Save Household']",
    );
    this.fullName = this.page.locator(
      "//div[normalize-space()='Household']//preceding-sibling::h1",
    );
    this.emailElement = this.page.locator(
      "//span[contains(@class, 'icon-book-address')]//following-sibling::span",
    );
  }

  async listOption(optionName) {
    return await this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  campType(campType) {
    return this.page.locator(`//span[contains(text(),"${campType}")]`);
  }
  GradeSelection(grade) {
    return this.page.locator(
      `//div[contains(text(),"${grade}")]//ancestor::button`,
    );
  }
  registrationTabLocator(campType, campYear, region, campName) {
    return this.page.locator(
      `//h3[contains(text(),"${campType} ${campYear} - ${region} - ${campName} ")]`,
    );
  }
  DateSpan(campName, dateLabel) {
    return this.page.locator(
      `//strong[contains(text(), "${campName} ${dateLabel}")]//following-sibling::span[contains(text(), "/")]`,
    );
  }

  async campRegistration(
    campYear,
    campType,
    region,
    campName,
    gradesToSelect = [],
    dateLabel = "Week",
    useStripTime = false,
  ) {
    // Click camp type tab
    await this.clickAction(this.campType(campType));

    // Wait and select grades (could be multiple or just one)
    for (const grade of gradesToSelect) {
      const gradeBtn = this.GradeSelection(grade);
      await this.waitForLocator(gradeBtn);
      const classAttr = await gradeBtn.getAttribute("class");
      // Logic reversed for Family Camp (click if selected), others (click if selectable)
      if (
        (campType === "Family Camp" && classAttr.includes("selected")) ||
        (campType !== "Family Camp" && classAttr.includes("selectable"))
      ) {
        console.log(`Clicking grade button for: ${grade}`);
        await gradeBtn.click();
      } else {
        console.log(`Grade button already selected: ${grade}`);
      }
    }

    // Set filter to Show Available
    await this.selectDropdownOption(this.fcShowAvailable, "Show Available");

    // Construct registration tab locator and click it
    await this.clickAction(
      this.registrationTabLocator(campType, campYear, region, campName),
    );

    // Locate date spans
    const dateSpans = await this.DateSpan(campName, dateLabel);
    await this.waitForLocator(dateSpans.first());
    const dateCount = await dateSpans.count();
    const today = useStripTime ? this.stripTime(new Date()) : new Date();

    console.log(`Total date spans found: ${dateCount}`);

    for (let i = 0; i < dateCount; i++) {
      const text = (await dateSpans.nth(i).textContent()).trim();
      const [startStr, endStr] = text.split(" - ");
      const startDate = useStripTime
        ? this.stripTime(new Date(startStr))
        : new Date(startStr);
      const endDate = useStripTime
        ? this.stripTime(new Date(endStr))
        : new Date(endStr);

      console.log(`Checking date span: ${startStr} - ${endStr}`);
      if (today >= startDate && today <= endDate) {
        await dateSpans.nth(i).locator("//ancestor::button").click();
        break;
      } else {
        console.log("Date span does not match current date");
      }
    }

    // Special logic for Family Camp: check attendees count and capacity
    if (campType === "Family Camp") {
      const rawText = await this.fetchTextContent(this.fcAttendees);
      const count = rawText?.trim().match(/\d+/)?.[0] ?? null;
      if (!count || parseInt(count, 10) <= 0) {
        throw new Error("No attendees found to register for Family Camp");
      }
      console.log("Attendees count:", count);

      // Check capacity and click the suitable capacity button
      const capacityLocators = this.fcCapacity;
      await this.waitForLocator(this.fcCapacity.first());
      const capacityCount = await capacityLocators.count();

      for (let j = 0; j < capacityCount; j++) {
        const capacityText = await capacityLocators.nth(j).textContent();
        const capacityNum = capacityText?.trim().match(/\d+/)?.[0];
        console.log(`Capacity available: ${capacityNum}`);
        if (capacityNum && parseInt(capacityNum, 10) >= parseInt(count, 10)) {
          await capacityLocators.nth(j).click();
          await this.clickAction(this.ycAddCart);
          break;
        }
      }
    } else {
      // For Youth and Day Camps, simply click "Add to Cart"
      await this.clickAction(this.ycAddCart);
    }

    if (campType === "Family Camp") {
      // Proceed through checkout steps
      await this.clickAction(this.fcNextButton);
      await this.clickAction(this.fcCheckout);
      await this.clickAction(this.fcChoose);
      await this.clickAction(this.fcCash);
      await this.clickAction(this.fcAddRegister);
      await this.clickAction(this.fcYes);
    } else {
      await this.clickAction(this.fcCheckout);
      await this.clickAction(this.fcAddRegister);
    }
    await this.takeScreenShot("iCampPro", `registrations-icamp-pro-${campName}`);
    await this.validateToHaveText(
      this.fcSuccess,
      /Registrations added successfully/,
    );
    await this.clickAction(this.fcDone);
  }

  async campersSetup(dataTable, isThisLast) {
    try {
      const sharedData = [];
      const rows = dataTable.hashes();
      for (const row of rows) {
        let mailStreet = row.mailStreet;
        let mailCity = row.mailCity;
        let mailState = row.mailState;
        let mailZip = row.mailZip;
        let childUsersData = JSON.parse(row.childUsersData);
        let campYear = row.campYear;
        let campType = row.campType;
        let campName = row.campName;
        let region = row.region;
        let dateLabel = row.dateLabel;
        let householdEmail = null;

        householdEmail = await this.householdCreation(
          mailStreet,
          mailCity,
          mailState,
          mailZip,
        );

        for (const child of childUsersData) {
          await this.childCreation(child.dateOfBirth, child.grade);
        }

        await this.clickAction(this.addRegisterbutton);
        await this.validateToHaveText(
          this.registrationHeader,
          "Add Registration",
        );

        // const dateLabel = householdData.dateLabel;
        if (campType === "Family Camp") {
          await this.campRegistration(
            campYear,
            campType,
            region,
            campName,
            ["6th Grade"],
            dateLabel,
            true,
          );
        } else {
          await this.campRegistration(
            campYear,
            campType,
            region,
            campName,
            ["6th Grade"],
            dateLabel,
            true,
          );
        }
        if (!isThisLast) {
          await this.backtoHousehold();
        }
        const householdInfo = {
          email: householdEmail,
          campType: campType,
          campName: campName,
        };
        sharedData.push(householdInfo);
      }
      console.log("this.sharedData");
      console.log(sharedData);
      return sharedData;
    } catch (error) {
      console.error("/Error in campersSetup:", error);
      throw error;
    }
  }

  async familyCampRegistraion(
    campYear,
    campType,
    region,
    campName,
    dateLabel = "Week",
  ) {
    const expectedSelectedTexts = ["6th Grade", "9th Grade", "10th Grade"];
    await this.clickAction(this.familyCamp);

    for (const element of expectedSelectedTexts) {
      const gradeSelection = this.GradeSelection(element);
      await this.waitForLocator(gradeSelection);
      const classAttr = await gradeSelection.getAttribute("class");
      if (classAttr.includes("selected")) {
        console.log("Button is selected");
        await this.clickAction(gradeSelection);
      } else {
        console.log("Button is NOT selected");
      }
    }

    await this.selectDropdownOption(this.fcShowAvailable, "Show Available");

    await this.clickAction(this.familyregistraionTab);

    const dateSpans = await this.DateSpan(campName, dateLabel);
    await this.waitFhouseholdCreationorLocator(dateSpans.first());
    const dateCount = await dateSpans.count();
    const today = new Date();

    console.log(`Total date spans found: ${dateCount}`);
    let clicked = false;
    for (let index = 0; index < dateCount; index++) {
      console.log("enters the loop");
      const text = (await dateSpans.nth(index).textContent()).trim(); // e.g., "08/03/2025 - 08/09/2025"
      const [startStr, endStr] = text.split(" - ");

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      if (today >= startDate && today <= endDate) {
        const matchingParent = await dateSpans
          .nth(index)
          .locator("//ancestor::button")
          .click();
        break; // Exit after clicking the first match
      } else {
        console.log("Unable to validate");
      }
    }

    await this.fetchTextContent(this.fcAttendees);

    const numberMatch = rawText.trim().match(/\d+/);
    const count = numberMatch ? parseInt(numberMatch[0], 10) : null;
    console.log("Extracted Count:", count);
    expect(count).toBeGreaterThan(0);

    const capacity = await this.waitForLocator(this.fcCapacity.first());
    const capacityCount = await capacity.count();

    for (
      let capacityindex = 0;
      capacityindex < capacityCount;
      capacityindex++
    ) {
      const rawText1 = await capacity.nth(capacityindex).textContent();
      const numberMatch1 = rawText1.trim().match(/\d+/);
      console.log(`number availabel in capacity :${numberMatch1}`);
      if (numberMatch1 >= count) {
        await capacity.nth(capacityindex).click();
        await this.clickAction(this.ycAddCart);
        break;
      }
    }
    await this.clickAction(this.fcNextButton);
    await this.clickAction(this.fcCheckout);
    await this.clickAction(this.fcChoose);
    await this.clickAction(this.fcCash);
    await this.clickAction(this.addRegisterbutton);
    await this.clihouseholdCreationckAction(this.fcYes);
    await this.validateToHaveText(
      this.fcSuccess,
      /Registrations added successfully/,
    );
    await this.clickAction(this.fcDone);
  }

  async youth1WeekCampRegistraion(campYear, campType, region, campName) {
    await this.clickAction(this.youthCamp);

    await this.waitForLocator(this.yc7thGrade);

    const classAttr = await this.yc7thGrade.getAttribute("class");
    if (classAttr.includes("selectable")) {
      console.log("Button is NOT selected");
      await this.clickAction(this.yc7thGrade);
    } else {
      console.log("Button is selected");
    }

    await this.selectDropdownOption(this.fcShowAvailable, "Show Available");

    await this.clickAction(this.ycregistraionTab);

    const dateSpans1 = await DateSpan(campName, dateLabel);
    await this.waitForLocator(dateSpans1.first());
    const dateCount1 = await dateSpans1.count();
    const today1 = new Date();

    console.log(`Total date spans found: ${dateCount1}`);
    for (let index = 0; index < dateCount1; index++) {
      console.log("enters the loop");
      const text = (await dateSpans1.nth(index).textContent()).trim(); // e.g., "08/03/2025 - 08/09/2025"
      const [startStr, endStr] = text.split(" - ");

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      if (today1 >= startDate && today1 <= endDate) {
        const matchingParent1 = await dateSpans1
          .nth(index)
          .locator("//ancestor::button")
          .click();
        break; // Exit after clicking the first match
      } else {
        console.log("Unable to validate");
      }
    }

    await this.clickAction(this.ycAddCart);
    await this.clickAction(this.ycCheckout);
    await this.clickAction(this.addRegisterbutton);
    await this.validateToHaveText(
      this.ycSuccess,
      /Registrations added successfully/,
    );
    await this.clickAction(this.ycDone);
  }

  async youth2WeekCampRegistraion(
    campYear,
    campType,
    region,
    campName,
    dateLabel = "Session",
  ) {
    await this.clickAction(this.youthCamp);

    await this.waitForLocator(this.yc7thGrade);

    const classAttr1 = await this.yc7thGrade.getAttribute("class");
    if (classAttr1.includes("selectable")) {
      console.log("Button is NOT selected");
      await this.clickAction(this.yc7thGrade);
    } else {
      console.log("Button is selected");
    }

    await this.selectDropdownOption(this.fcShowAvailable, "Show Available");

    await this.clickAction(this.ycregistraionTab);

    const dateSpans2 = await await DateSpan(campName, dateLabel);
    await this.clickAction(dateSpans2.first());
    const dateCount2 = await dateSpans2.count();
    const today2 = new Date();

    console.log(`Total date spans found: ${dateCount2}`);
    for (let index = 0; index < dateCount2; index++) {
      console.log("enters the loop");
      const text = (await dateSpans2.nth(index).textContent()).trim(); // e.g., "08/03/2025 - 08/09/2025"
      const [startStr, endStr] = text.split(" - ");

      const startDate = new Date(startStr);
      const endDate = new Date(endStr);

      if (today2 >= startDate && today2 <= endDate) {
        const matchingParent2 = await dateSpans2
          .nth(index)
          .locator("//ancestor::button")
          .click();
        break; // Exit after clicking the first match
      } else {
        console.log("Unable to validate");
      }
    }

    await this.clickAction(this.ycAddCart);
    await this.clickAction(this.ycCheckout);
    await this.clickAction(this.addRegisterbutton);
    await this.validateToHaveText(
      this.ycSuccess,
      /Registrations added successfully/,
    );
    await this.clickAction(this.ycDone);
  }

  async dayCampRegistraion(
    campYear,
    campType,
    region,
    campName,
    dateLabel = "Week",
  ) {
    await this.clickAction(this.dayCamp);

    await this.waitForLocator(this.yc6thGrade);

    const classAttr2 = await this.yc6thGrade.getAttribute("class");
    if (classAttr2.includes("selectable")) {
      console.log("Button is NOT selected");
      await this.clickAction(this.yc6thGrade);
    } else {
      console.log("Button is selected");
    }

    await this.selectDropdownOption(this.fcShowAvailable, "Show Available");

    await this.clickAction(this.dcregistraionTab);

    const dateSpans3 = await this.DateSpan(campName, dateLabel);
    await this.waitForLocator(dateSpans3.first());
    const dateCount3 = await dateSpans3.count();
    // const today3 = new Date();
    const today3 = this.stripTime(new Date());

    console.log(`Total date spans found: ${dateCount3}`);
    for (let index = 0; index < dateCount3; index++) {
      console.log("enters the loop");
      const text = (await dateSpans3.nth(index).textContent()).trim(); // e.g., "08/03/2025 - 08/09/2025"
      const [startStr, endStr] = text.split(" - ");

      const startDate = this.stripTime(new Date(startStr));
      const endDate = this.stripTime(new Date(endStr));
      console.log(`${today3} - ${startDate} - ${endDate}`);
      console.log(today3 >= startDate && today3 <= endDate);
      if (today3 >= startDate && today3 <= endDate) {
        const matchingParent3 = await dateSpans3
          .nth(index)
          .locator("//ancestor::button")
          .click();
        break; // Exit after clicking the first match
      } else {
        console.log("Unable to validate");
      }
    }

    await this.clickAction(this.ycAddCart);
    await this.clickAction(this.ycCheckout);
    await this.clickAction(this.addRegisterbutton);
    await this.validateToHaveText(
      this.ycSuccess,
      /Registrations added successfully/,
    );
    await this.clickAction(this.ycDone);
  }

  stripTime(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  async childCreation(dateOfBirth, grade) {
    const childfirstName = faker.person.firstName();
    const childlastName = faker.person.lastName();
    const childgender = getNextGender(); // 'male' or 'female'

    await this.clickAction(this.addHouseholdMember);
    await this.waitForLocator(this.dialogBox);
    await this.fillInput(this.childfirstName, childfirstName);
    await this.fillInput(this.childlastName, childlastName);
    await this.selectDropdownOption(this.childgender, childgender);
    await this.clickAction(this.childOption);
    await this.fillInput(this.dateOfBirth, dateOfBirth);
    await this.selectDropdownOption(this.grade, grade);
    await this.clickAction(this.save);
  }

  async backtoHousehold() {
    await this.clickAction(this.backToHousehold);
  }

  async householdCreation(mailStreet, mailCity, mailState, mailZip) {
    await this.clickAction(this.newHousehold);
    await this.validateToHaveText(this.newHouseholdHeader, "New Household");
    await this.clickAction(this.fcNextButton);
    await this.validateToHaveText(
      this.alertMsg,
      " Please complete the required fields above. ",
    );

    // Add New Household

    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const gender = getNextGender(); // 'male' or 'female'
    const timestamp = Date.now(); // unique number
    const uniqueEmail = `testuser_${timestamp}@yopmail.com`;
    const mobile =
      "9" + Math.floor(100000000 + Math.random() * 900000000).toString(); // 10-digit starting with 9

    await this.fillInput(this.firstName, firstName);
    await this.fillInput(this.lastName, lastName);
    await this.selectDropdownOption(this.gender, gender);
    await this.fillInput(this.email, uniqueEmail);
    await this.fillInput(this.mobile, mobile);
    await this.clickAction(this.fcNextButton);
    await this.fillInput(this.mailStreet, mailStreet);
    await this.fillInput(this.mailCity, mailCity);
    await this.selectDropdownOption(this.mailState, mailState);
    await this.fillInput(this.mailZip, mailZip);
    await this.clickAction(this.saveHousehold);
    await this.validateToHaveText(this.fullName, `${firstName} ${lastName}`);
    await this.validateToContainsText(this.emailElement, uniqueEmail);
    return uniqueEmail;
  }
}

module.exports = { Households };
