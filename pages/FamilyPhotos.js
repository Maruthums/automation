const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const { pageFixture } = require("../common/pageFixture");

class FamilyPhotos extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    this.FamilyPhotosLink = this.page.getByText("Family Photos", {
      exact: true,
    });
    this.ApprovedButton = this.page.locator(
      '//button[contains(text(),"Approved")]',
    );
    this.PublishButton = this.page.getByRole("button", {
      name: "PUBLISH",
      exact: true,
    });
    this.publishSuccessMessage = this.page.getByText("Photo Published");
    this.CloseButton = this.page.getByRole("button", {
      name: "Close",
      exact: true,
    });
  }
  async CamperNameOnPending(campName) {
    return this.page.locator(`//p[normalize-space()='${campName}']`);
  }
  async FetchCamperInfo(campName) {
    const camperinfo = await this.fetchTextContent(
      await this.CamperNameOnPending(campName),
    );
    return this.extractAfterHyphen(camperinfo);
  }
  async ReviewedPhotoInApprovedSection(campName) {
    return this.page.locator(
      `//td[normalize-space()='${campName}']//span//input[@type="checkbox"]`,
    );
  }
  async ApproveTheReviewedFamilyPhotos(campName) {
    await this.waitForSpinner();
    await this.clickAction(this.ApprovedButton);
    await this.clickAction(await this.ReviewedPhotoInApprovedSection(campName));
    await this.clickAction(this.PublishButton);
    await this.waitForSpinner();
    await this.waitForLocator(this.publishSuccessMessage);
    await this.takeScreenShot("FamilyPhoto",`publish-${campName}`);
    await this.clickAction(this.CloseButton);
  }
}

module.exports = { FamilyPhotos };
