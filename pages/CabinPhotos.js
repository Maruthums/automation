const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../common/pageFixture");

class CabinPhotos extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.toolsLink = this.page.getByText("Tools", { exact: true });
    this.cabinPhotosLink = this.page.getByText("Cabin Photos", { exact: true });
    this.chooseYear = this.page.locator("#filter-year");
    this.chooseWeek = this.page.locator("#filter-week");
    this.chooseCamp = this.page.locator(`[id="demo-multiple-checkbox"]`);
    this.ReviewButton = this.page.locator(
      '//button[contains(text(),"Review")]',
    );
    this.ApprovedButton = this.page.locator(
      '//button[contains(text(),"Approved")]',
    );
    this.UnAssignedButton = this.page.locator(
      '//button[contains(text(),"UNASSIGNED")]',
    );
    this.PublishedButton = this.page.locator(
      '//button[contains(text(),"Published")]',
    );
    this.UploadPhotoButton = this.page.getByRole("button", {
      name: "UPLOAD PHOTOS",
      exact: true,
    });
    this.UploadButton = this.page.getByRole("button", {
      name: "Upload",
      exact: true,
    }); // add sppineeer wait
    this.SelectFile = this.page.locator(
      `#alert-dialog-title + input[type="file"]`,
    );
    this.counselorName = this.page.locator('[id*="text-right"]');
    this.ReviewPhotoButton = this.page.getByRole("button", {
      name: "REVIEW PHOTOS",
      exact: true,
    });
    this.ApprovePhotoButton = this.page.getByRole("button", {
      name: "Approve Photo",
      exact: true,
    });
    this.SucessMessageAfterApprove = this.page.getByText(
      "All Available Photos Reviewed",
      { exact: true },
    );
    this.CloseButton = this.page.getByRole("button", {
      name: "Close",
      exact: true,
    });
    this.selectAllDeserst = this.page.getByLabel("select all desserts", {
      exact: true,
    });
    this.PublishButton = this.page.getByRole("button", {
      name: "PUBLISH",
      exact: true,
    });
    this.NextPageButton = this.page.locator(
      "#review-arrow-forward",
    );
    this.publishSuccessMessage = this.page.getByText("Photo Published");
    this.DoneButton = this.page.locator("#multi-select-item-apply");
    this.SelectCampToUplodadPhotoSection = this.page.getByText(
      "Select a Camp to Upload Cabin Photos",
      { exact: true },
    );
    this.SaveAndCloseButton = this.page.getByRole("button", {
      name: "SAVE AND CLOSE",
      exact: true,
    });
    this.CloseIcon = this.page.locator('#review-close-icon');
    this.approveDialogBox = this.page.locator("#alert-dialog-title");
  }
  async listOption(optionName) {
    return this.page.locator(`//li[normalize-space()='${optionName}']`);
  }
  async spanOption(optionName) {
    return this.page.locator(`//span[normalize-space()='${optionName}']`);
  }

  async SelectFilter(FilterName, FilterValue) {
    await this.selectValuefromListDropdown(
      FilterName,
      await this.listOption(FilterValue),
    );
  }
  async CabinNameOnPending(campName) {
    const cabinName = this.page.locator(
      `//td[normalize-space()='${campName}']//button`,
    );
    await this.clickAction(cabinName);
  }
  async AssignCabinPhotoAssignment(fileName) {
    return this.page
      .locator(
        `//p[contains(@aria-label,"${fileName}")]//following-sibling::div//div[contains(@id,"filter-select")]`,
      )
      .first();
  }
  async AssignCabinAssignmentOption(optionName) {
    return await this.page
      .locator(`//li[contains(text(),'${optionName}')]`)
      .first();
  }
  async reviewPhotoCounselorTitle(optionName) {
    return await this.page
      .locator(`//p[contains(text(),'${optionName}')]`)
      .first();
  }
  async ReviewedPhotoInApprovedSection(counselorName) {
    return this.page.locator(
      `//td[normalize-space()='${counselorName}']//preceding-sibling::td//input[@type="checkbox"]`,
    );
  }
  async PublisedCounselorTitle(optionName) {
    return await this.page.locator(`//td[normalize-space()='${optionName}']`);
  }
  async SelectCamp(campName) {
    return await this.page.getByRole("button", {
      name: `${campName}`,
      exact: true,
    });
  }

  async CabinPhotoFilters(year, week, camp) {
    await this.selectValuefromListDropdown(
      this.chooseYear,
      await this.listOption(year),
    );
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.chooseWeek,
      await this.listOption(week),
    );
    await this.waitForSpinner();
    // Find the checkbox for the camp option and check if it's selected
    await this.clickAction(this.chooseCamp);
    const campOption = await this.listOption(camp);
    const checkbox = campOption.locator('input[type="checkbox"]');
    if (!(await checkbox.isChecked())) {
      await this.clickAction(campOption);
    }

    await this.clickAction(this.DoneButton); // to close the dropdown
    await this.waitForSpinner();
  }
  async FetchCounselorInfo(campName) {
    await this.CabinNameOnPending(campName);
    return await this.fetchTextContent(this.counselorName);
  }

  async UploadCabinPhotos(filePath, campName) {
    await this.clickAction(this.UploadPhotoButton);
    if (await this.checkVisibility(this.SelectCampToUplodadPhotoSection)) {
      await this.clickAction(await this.SelectCamp(campName));
    }
    await this.SelectFile.setInputFiles(filePath);
    await this.clickAction(this.UploadButton);
    await this.waitForSpinner();
  }
  async SelectCounselorForCabinPhoto(fileName, optionName) {
    const optionlocator = await this.AssignCabinPhotoAssignment(
      this.getFileNameFromPath(fileName),
    );
    await this.clickAction(optionlocator);
    const listOptionLocator = await this.AssignCabinAssignmentOption(
      this.toDestParenSource(optionName),
    );
    await this.clickAction(listOptionLocator);
  }

  async ReviewAndApproveCabinPhotos(counselorName, module) {
    await this.waitForSpinner();
    await this.clickAction(this.ReviewButton);

    await this.waitForSpinner();
    await this.clickAction(this.ReviewPhotoButton);

    const expectedTitle = this.toDestParenSource(counselorName);
    let found = false;

    // Loop until counselor is found or no more pages
    while (true) {
      await this.page.waitForLoadState("networkidle");
      await this.page.waitForLoadState("load");
      await this.waitForLocator(this.approveDialogBox);
      const counselorLocator =
        await this.reviewPhotoCounselorTitle(expectedTitle);
      if (await counselorLocator.isVisible()) {
        // Approve the photo
        const buttonFlag = await this.NextPageButton.isEnabled();
        await this.clickAction(this.ApprovePhotoButton);
        found = true;
        await this.takeScreenShot(module ?"FamilyPhoto" : "CabinPhoto", `approve-photos-${expectedTitle}`);
        if (await this.checkVisibility(this.CloseIcon)) {
          await this.waitForSpinner();
          await this.clickAction(this.CloseIcon);
        } else {
          await this.waitForSpinner();
          await this.waitForLocator(this.SucessMessageAfterApprove);
          await this.clickAction(this.CloseButton);
        }
        break; // exit loop after approving
      }
      // If "Next Page" is disabled, stop the loop
      if (!(await this.NextPageButton.isEnabled())) {
        break;
      }
      // Otherwise, go to next page and continue searching
      await this.clickAction(this.NextPageButton);
      await this.waitForSpinner();
    }
    if (!found) {
      throw new Error(`Counselor "${expectedTitle}" not found in any page.`);
    }
  }

  async ApproveTheReviewedCabinPhotos(counselorName) {
    await this.waitForSpinner();
    await this.clickAction(this.ApprovedButton);
    await this.clickAction(
      await this.ReviewedPhotoInApprovedSection(counselorName),
    );
    await this.clickAction(this.PublishButton);
    await this.waitForSpinner();
    await this.waitForLocator(this.publishSuccessMessage);
    await this.takeScreenShot("CabinPhoto",`publish-${counselorName}`);
    await this.clickAction(this.CloseButton);
  }
  async PublishedSection(counselorName) {
    await this.waitForSpinner();
    await this.clickAction(this.PublishedButton);
    await this.checkVisibility(
      await this.PublisedCounselorTitle(counselorName),
    );
  }
}

module.exports = { CabinPhotos };
