const { baseClass } = require("../common/baseclass");

class SidekickMonitoring extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.toolsLink = page.locator("//span[normalize-space()='Tools']");
    this.sidekickMonitoringLink = page.locator(
      "//p[normalize-space()='Sidekick Device Monitoring']",
    );
    this.pageTitle = page.locator("#tableTitle");
    this.table = page.locator("//table[@id='sidekick-device-list']");
    this.tableRows = this.table.locator("tbody tr");
  }

  /**
   * Returns the number of rows in the Sidekick Monitoring table
   * @returns {Promise<number>}
   */
  async getRowCount() {
    await this.table.waitFor({ state: "visible" });
    return this.tableRows.count();
  }
}

module.exports = { SidekickMonitoring };
