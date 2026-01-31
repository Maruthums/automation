const { baseClass } = require("../common/baseclass");
const constants = require("../common/constants");
const path = require("path");
const { campUpdateData } = require("../common/testData");

class CampUpdatePost extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.toolsLink = page.locator("#tools");
    this.campUpdatePostsLink = page.locator("#camp-update-posts");
    this.campUpdatePostsTitle = page.locator("#tableTitle");
    this.selectEventYear = page.locator("#simple-select-eventYear");
    this.selectRegion = page.locator("#simple-select-region");
    this.selectMultiCamp = page.locator("#demo-multiple-checkbox");
    this.selectCampCheckbox = page.locator("#multi-select-item-all");
    this.selectMultiApply = page.locator("#multi-select-item-apply");
    this.selectCampType = page.locator("#simple-select-campType");
    this.selectCategory = page.locator("#simple-select-category");
    this.createCampUpdatePosts = page.locator("#create-post-btn");
    this.selectCamp = page.locator("#select-camp");
    this.campUpdatePostsText = page.locator("#text-field");
    this.fileSelection = page.locator("#file-selection");
    this.tableBody = page.locator("#table-body-0");
    this.editPostButton = page.locator("#edit-post");
    this.publishDetailButton = page.locator("#view-details-btn");
    this.publishDetailList = page.locator("#publish-detail-0");
    this.publishDetailStatus = page.locator("#publish-status-0");
    this.editButton = page.locator("#edit-btn");
    this.deleteDuplicate = page.locator("#table-summary-0");
    this.duplicateButton = page.locator("#duplicate-btn");
    this.moreButton = page.locator("#more-btn-0");
    this.deleteButton = page.locator("#delete-btn");
    this.statusButton = page.locator("#status-btn");
    this.closeButton = page.locator("#close-btn");
    this.confirmButton = page.locator("#button-2");
    this.saveButton = page.locator("#save-post");
  }

  async listOption(optionName) {
    return await this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async selectFilter() {
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.selectEventYear,
      await this.listOption(campUpdateData.eventYear),
    );
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.selectRegion,
      await this.listOption(campUpdateData.region),
    );
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.selectCampType,
      await this.listOption(campUpdateData.campType),
    );
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.selectMultiCamp,
      await this.selectCampCheckbox,
    );
    await this.clickAction(this.selectMultiApply);
    await this.selectValuefromListDropdown(
      this.selectCategory,
      await this.listOption(campUpdateData.category),
    );
  }

  async createPost() {
    const createText = `Create Post ${campUpdateData.textSuffix}`;
    const selectCamp = "All";
    await this.waitForSpinner();
    await this.selectValuefromListDropdown(
      this.selectCamp,
      await this.listOption(selectCamp),
    );
    await this.selectValuefromListDropdown(
      this.selectCategory,
      await this.listOption(campUpdateData.category),
    );
    await this.fillInput(this.campUpdatePostsText, createText);

    // Upload camp update post image
    await this.campUpdatePostImageUpload();

    await this.clickAction(this.saveButton);
    await this.takeScreenShot("CampUpdatePost", "create-new-post");
    await this.waitForSpinner();
    await this.page.waitForTimeout(2000);
  }

  async viewPost() {
    await this.waitForSpinner();
    await this.page.waitForTimeout(3000);
    await this.clickAction(this.tableBody);
    await this.waitForSpinner();
    await this.clickAction(this.editPostButton);
    await this.waitForSpinner();
  }

  async editPost(e) {
    const editText = e ? `${e} Edit ${campUpdateData.textSuffix}` : `Edit ${campUpdateData.textSuffix}`;
    await this.waitForSpinner();
    await this.page.waitForTimeout(1000);
    await this.fillInput(this.campUpdatePostsText, editText);
    await this.clickAction(this.saveButton);
    await this.takeScreenShot("CampUpdatePost", "edit-post");
    await this.waitForSpinner();
    await this.page.waitForTimeout(2000);
  }

  async duplicatePost() {
    const duplicateText = `Duplicate Post ${campUpdateData.textSuffix}`;
    await this.clickAction(this.duplicateButton);
    await this.waitForSpinner();
    await this.fillInput(this.campUpdatePostsText, duplicateText);
    await this.clickAction(this.saveButton);
    await this.takeScreenShot("CampUpdatePost", "duplicate-post");
    await this.waitForSpinner();
  }

  async hidePost() {
    await this.clickAction(this.statusButton);
    await this.takeScreenShot("CampUpdatePost", "hide-post");
    await this.clickAction(this.confirmButton);
    await this.waitForSpinner();
    await this.validateToHaveText(this.publishDetailStatus, /Hidden/);
    await this.page.waitForTimeout(2000);
  }

  async deletePost() {
    await this.clickAction(this.deleteButton);
    await this.takeScreenShot("CampUpdatePost", "delete-post");
    await this.clickAction(this.confirmButton);
    await this.waitForSpinner();
    await this.page.waitForTimeout(2000);
  }

  async publishDetail() {
    await this.clickAction(this.publishDetailButton);
    await this.waitForSpinner();
    await this.clickAction(this.publishDetailList);
    await this.clickAction(this.publishDetailList);
    await this.clickAction(this.closeButton);
    await this.page.waitForTimeout(2000);
  }

  async campUpdatePostImageUpload() {
    let photoPath = path.resolve(__dirname, `../Photos/CampUpdatePost/${ campUpdateData.fileName }`);
    await this.waitForLocator(this.fileSelection);
    await this.fileSelection.setInputFiles(photoPath);
  }
}

module.exports = { CampUpdatePost };
