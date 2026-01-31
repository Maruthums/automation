const { baseClass } = require("../common/baseclass");
const { expect } = require("@playwright/test");
const { BRIDGE_TOKEN, BRIDGE_USER_DETAILS, ICAMPPRO_USERNAME, ICAMPPRO_PASSWORD, SIDEKICK_PORTAL_BASE_URL, ICAMP_PORTAL_BASE_URL } = require("../config/credential");

class LoginPage extends baseClass {
  constructor(page) {
    super(page);
    this.page = page;

    // Locators
    this.pageTitle = page.locator(
      "//button[normalize-space()='Pine Cove Sidekick']",
    );
    this.emailInput = page.locator("#email");
    this.passwordInput = page.locator("#password");
    this.signInButton = page.locator("//button[normalize-space()='Submit']");
    this.profileName = page.locator(
      "//p[normalize-space(text())='Logged in as']//span",
    );
  }

  async listOption(optionName) {
    return this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async navigate() {
    await this.page.goto(SIDEKICK_PORTAL_BASE_URL);
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async injectToken() {
    const token = BRIDGE_TOKEN;
    const userDetails = BRIDGE_USER_DETAILS;
    await this.page.evaluate(
      ({ token, userDetails }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("userInfo", JSON.stringify(userDetails));
      },
      { token, userDetails },
    );
    await this.page.reload();

    // Wait for UI to reflect login
    await this.profileName.waitFor({ state: "visible", timeout: 10000 });
  }

  async navigateToICamp() {
    await this.page.goto(ICAMP_PORTAL_BASE_URL);
    await this.page.setViewportSize({ width: 1920, height: 1080 });
  }

  async getPageTitle(expectedTitle) {
    const actualTitle = await this.page.title();
    expect(actualTitle).toBe(expectedTitle);
  }

  async loginICamp() {
    const email = ICAMPPRO_USERNAME;
    const password = ICAMPPRO_PASSWORD;

    await this.fillInput(this.emailInput, email);
    await this.fillInput(this.passwordInput, password);
    await this.clickAction(this.signInButton);
    await this.takeScreenShot("iCampPro", "login-icamp-pro");
  }
}

module.exports = { LoginPage };
