const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");

class Reports extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    // Sidebar & title
    this.reportsSidebar = page.locator("//span[normalize-space()='Reports']");
    this.pageTitle = page.locator("#tableTitle");

    // Dropdowns
    this.yearDropdown = page.locator(
      `//label[normalize-space()='Year']//following-sibling::div`,
    );
    this.campDropdown = page.locator(
      `//label[normalize-space()='Camp']//following-sibling::div`,
    );
    this.weekDropdown = page.locator(
      `//label[normalize-space()='Week']//following-sibling::div`,
    );

    // Table & loaders
    this.reportRows = page.locator("table tbody tr");
    this.loader = page.locator(".bouncing-loader");
  }

  async listOption(optionName) {
    return this.page.locator(`//li[normalize-space()="${optionName}"]`);
  }

  async applyFilters(year, camp, week) {
    await this.selectValuefromListDropdown(
      this.yearDropdown,
      await this.listOption(year),
    );
    await this.waitForSpinner();

    await this.selectValuefromListDropdown(
      this.campDropdown,
      await this.listOption(camp),
    );
    await this.waitForSpinner();

    await this.selectValuefromListDropdown(
      this.weekDropdown,
      await this.listOption(week),
    );
    await this.waitForSpinner();
  }

  async downloadReports(year, camp, week, report) {
    const rowCount = await this.reportRows.count();

    expect(rowCount).toBeGreaterThan(0);

    for (let i = 0; i < rowCount; i++) {
      const row = this.reportRows.nth(i);
      const reportName = await row.locator("td").first().textContent();

      if (!reportName || !reportName.includes(report)) continue;

      const button = row.locator("button:has-text('Open report')");
      if (await button.isDisabled()) continue;

      const [popup] = await Promise.all([
        this.page.waitForEvent("popup"),
        button.click(),
      ]);
      await this.takeScreenShot("Reports", `progress-${reportName}`);
      const [download] = await Promise.all([
        popup.waitForEvent("download", { timeout: 6000 }),
        popup.waitForEvent("close"),
      ]);

      const filename = await download.suggestedFilename();
      const filePath = path.join("/tmp", filename);
      await this.takeScreenShot("Reports", `download-${filename}`);
      await download.saveAs(filePath);

      try {
        // ✅ Validate filename
        expect(filename).toContain(year);
        expect(filename).toContain(camp.replace(/\s+/g, "_"));
        expect(filename).toContain(week);

        // ✅ Validate CSV content
        const fileContent = fs.readFileSync(filePath, "utf8");
        const records = parse(fileContent, {
          columns: true,
          skip_empty_lines: true,
        });
        expect(records.length).toBeGreaterThan(0);
        console.log(`Validated report: ${filename} : ${records.length} rows`);
      } finally {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
      }
    }
  }
}

module.exports = { Reports };
