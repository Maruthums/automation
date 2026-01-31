const { baseClass } = require("../common/baseclass");
const path = require("path");
const constants = require("../common/constants");

class Campmaps extends baseClass {
  settingLink;
  campMapLink;
  campmapselect;
  savebutton;
  viewAllBtn;
  constructor(page) {
    super(page);
    this.page = page;
    this.settingLink = this.page.locator(
      "//span[normalize-space()='Settings']",
    );
    this.campMapLink = this.page.locator(
      "//ul/li//p[normalize-space()='CampLife']",
    );

    this.viewAllBtn = this.page.locator(
      "//button[normalize-space()='View All']",
    );

    this.campmapselect = this.page.locator(`//img[@alt="${constants.FAMILY_CAMP}"]`);
    this.replaceMap = this.page.locator(
      "//button[normalize-space()='Replace Map']",
    );
    this.fileInput = this.page.locator('#map-upload-0');
    this.savebutton = this.page.locator("//button[@id='map-modal-save']");
  }

  async campUpdatePostImageUpload() {
    const mapImageCount = await this.replaceMap.count();

    if(mapImageCount > 0) {
      await this.clickAction(await this.replaceMap.nth(0))

      const photoPath = path.resolve(
        __dirname,
        `../Photos/CampMap/${constants.FAMILY_CAMP}.png`,
      );
      await this.waitForLocator(this.fileInput);
      await this.fileInput.setInputFiles(photoPath);
      await this.takeScreenShot("CampMaps", `replace-camp-map-${constants.FAMILY_CAMP}`);
      await this.clickAction(this.savebutton);
      await this.page.waitForTimeout(1000);

      await this.page.waitForResponse(
        (resp) =>
          resp.url().includes("camps/maps") &&
          resp.status() === 201,
      );

    } else {
      console.log("No replace map button found")
    }
  }
}

module.exports = { Campmaps };
