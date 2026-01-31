const { baseClass } = require("../common/baseclass");

class SnowflakeDashboard extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;
    this.sidebar = page.locator("//span[normalize-space()='Dashboards']");
    this.pageTitle = page.locator("#tableTitle");
    this.defaultCampLocator = page.locator("#youth-camp-0 p", {
      hasText: "Towers",
    });
    this.registrationsTotalLocator = page.locator("#total p").last();
    this.registrationsGenderLocator = page.locator("#registration-gender");
    this.registrationsBoysLocator = page.locator("#bar-boys");
    this.registrationsGirlsLocator = page.locator("#bar-girls");
  }
}
module.exports = { SnowflakeDashboard };
