const { baseClass } = require("../common/baseclass");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { expect } = require("@playwright/test");

class SurveyResponse extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.pageTitle = this.page.locator("#tableTitle");
    this.surveysSidebar = page.locator("//span[normalize-space()='Surveys']");
    this.surveyResponseSidebar = page.locator(
      "//p[normalize-space()='Responses']",
    );
    this.camperRow = this.page.locator("#row-camper");
    this.familyRow = this.page.locator("#row-family");
    this.staffRow = this.page.locator("#row-staff");
    this.downloadCamperBtn = this.page.locator("#download-camper-csv");
    this.viewCamperBtn = this.page.locator("#view-camper-csv");
    this.downloadFamilyBtn = this.page.locator("#download-family-csv");
    this.viewFamilyBtn = this.page.locator("#view-family-csv");
    this.downloadStaffBtn = this.page.locator("#download-staff-csv");
    this.viewStaffBtn = this.page.locator("#view-staff-csv");
    this.yearDropdown = this.page.locator(
      `#simple-select-Year`,
    );
    this.campDropdown = this.page.locator(
      `//input[@name="Camp"]//preceding-sibling::div[@id="demo-simple-select"]`,
    );
    this.weekDropdown = this.page.locator(
      "#simple-select-Week",
    );
    this.detailsTableBody = this.page.locator("#table-body");
    this.detailsPopup = this.page.locator("#details-popup");
    this.detailsPopupTitle = this.page.locator("#details-title");
    this.detailsPopupEvent = this.page.locator("#details-event");
  }

  async applyFilters(year, camp, week) {
    
    await this.selectValuefromListDropdown(
      this.yearDropdown,
      await this.listOptions(year),
    );
    await this.waitForSpinner();

    await this.selectValuefromListDropdown(
      this.campDropdown,
      await this.listOptions(camp),
    );
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.weekDropdown,
      await this.listOptions(week),
    );
    await this.waitForSpinner();
  }

  async viewSurveyResults(year, camp, week, surveyType = "Campers") {
    let row = this.camperRow;
    if (surveyType === "Families") {
      row = this.familyRow;
    } else if (surveyType === "Staff") {
      row = this.staffRow;
    }

    const isRowAvailable = await row.isVisible();
    if (isRowAvailable) {
      const viewButton = await row.getByRole("button", {
        name: "View Results",
      });

      if (await viewButton.isDisabled()) {
        console.log(`Skipping ${surveyType} Survey since it is not available`);
      } else {
        await viewButton.click();
        const pageTitle = `${surveyType} ${camp} ${week}`;
        await this.validateToHaveText(this.pageTitle, pageTitle);

        await this.page.waitForResponse(
          (resp) =>
            resp.url().includes("paper-survey/response/session") &&
            resp.status() === 201,
        );

        const detailsRow = await this.detailsTableBody.locator("tr");
        const detailsRowCount = await detailsRow.count();
        expect(detailsRowCount).toBeGreaterThan(0);

        const firstDetailsRow = detailsRow.nth(0);
        const viewCamperDetailsButton = firstDetailsRow.getByRole("button", {
          name: "View Results",
        });

        const firstCamperName = await firstDetailsRow
          .locator("td")
          .nth(0)
          .innerText();
        await viewCamperDetailsButton.click();
        await this.detailsPopup.waitFor({ state: "visible" });
        await this.validateToHaveText(this.detailsPopupTitle, firstCamperName);

        const detailsEventLocator = await this.detailsPopupEvent
          .locator("td")
          .nth(1);
        await this.validateToHaveText(
          detailsEventLocator,
          `${year} ${camp} ${week}`,
        );

        await this.page.goBack();
      }
    }
  }

  async downloadSurvey(year, camp, week) {
    const isCamperAvailable = await this.camperRow.isVisible();
    if (isCamperAvailable) {
      const camperButton = this.camperRow.getByRole("button", {
        name: "Download CSV",
      });

      if (await camperButton.isDisabled()) {
        console.log(`Skipping Camper Survey since it is not available`);
      } else {
        /** Download Camper CSV if not disabled */
        const defaultCamperFileName = `${year}_${camp.replace(" ", "_")}_${week.replace(" ", "")}_campers_responses.csv`;
        await this.downloadCSV(camperButton, defaultCamperFileName);
      }
    }

    const isFamilyAvailable = await this.familyRow.isVisible();
    if (isFamilyAvailable) {
      const familyButton = this.familyRow.getByRole("button", {
        name: "Download CSV",
      });

      if (await familyButton.isDisabled()) {
        console.log(`Skipping Family Survey since it is not available`);
      } else {
        /** Download Family CSV if not disabled */
        const defaultFamilyFileName = `${year}_${camp.replace(" ", "_")}_${week.replace(" ", "")}_families_responses.csv`;
        await this.downloadCSV(familyButton, defaultFamilyFileName);
      }
    }

    const isStaffAvailable = await this.staffRow.isVisible();
    if (isStaffAvailable) {
      const staffButton = this.staffRow.getByRole("button", {
        name: "Download CSV",
      });

      if (await staffButton.isDisabled()) {
        console.log(`Skipping Staff Survey since it is not available`);
      } else {
        /** Download Staff CSV if not disabled */
        const defaultStaffFileName = `${year}_${camp.replace(" ", "_")}_${week.replace(" ", "")}_staff_responses.csv`;
        await this.downloadCSV(staffButton, defaultStaffFileName);
      }
    }
  }

  async downloadCSV(downloadBtn, defaultFileName) {
    const [download] = await Promise.all([
      this.page.waitForEvent("download"),
      downloadBtn.click(),
    ]);

    const filePath = path.join("/tmp", await download.suggestedFilename());
    await download.saveAs(filePath);
    await this.takeScreenShot("SurveyResponse", defaultFileName);
    try {
      // Validate filename
      const filename = await download.suggestedFilename();
      expect(filename).toEqual(defaultFileName);

      // Validate CSV content
      const fileContent = fs.readFileSync(filePath, "utf8");
      const records = parse(fileContent, {
        columns: true, // treat first row as headers
        skip_empty_lines: true,
      });

      // ✅ Example validations
      expect(records.length).toBeGreaterThan(0); // at least one row exists
      console.log(
        `Validated report: ${filename} : records = ${records.length}`,
      );
    } finally {
      // Always cleanup file
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        console.log(`Deleted file: ${filePath}`);
      }
    }
  }
}

module.exports = { SurveyResponse };
