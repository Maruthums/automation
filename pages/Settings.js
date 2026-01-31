const { baseClass } = require("../common/baseclass");

class Settings extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    /** ----------------- Settings Navigation ----------------- */
    this.settingsLink = page.locator("//span[normalize-space()='Settings']");
    this.generalLink = page.locator('//ul/li//p[normalize-space()="General"]');
    this.publishingLink = page.locator(
      '//ul/li//p[normalize-space()="Publishing"]',
    );

    /** ----------------- General Settings ----------------- */
    this.faceSizeRatioInput = page.locator("#face-size-ratio-field");
    this.faceSizeSaveButton = page.locator("#tagged-photo-face-size-ratio");

    // Headshot Replacement Interval
    this.startAgeInput = page.locator("#headshot-start-age-1");
    this.intervalValueInput = page.locator("#headshot-interval-value-1");
    this.intervalSaveButton = page.locator("#headshot-replacement-interval");

    /** ----------------- Publishing Settings ----------------- */
    this.facialCatalogueInput = page.locator(
      "#facial-catalogue-threshold-input",
    );
    this.facialSaveButton = page.locator("#facial-threshold-save-button");

    this.galleryDayCampInput = page.locator(
      "#gallery-photos-day-camp-min-count-input",
    );
    this.gallerySaveButton = page.locator("#normal-gallery-build-save-button");

    this.familyCountInput = page.locator(
      "#smaller-gallery-photos-family-camp-min-count-input",
    );
    this.familyCountSaveButton = page.locator(
      "#smaller-gallery-build-threshold-save-button",
    );
  }
}

module.exports = { Settings };
