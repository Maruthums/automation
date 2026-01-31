const { expect } = require("@playwright/test");
const fs = require("fs");
const path = require("path");
const { pageFixture } = require("./pageFixture");
class baseClass {
  constructor(page) {
    this.page = page;
    this.spinner = this.page.locator("#circular-progress");
  }

  async waitForLocator(locator, elementState = "stable") {
    await this.page.waitForLoadState("domcontentloaded");
    await this.page.waitForLoadState("networkidle");

    const element = await locator.elementHandle();
    if (!element) {
      throw new Error("Element not found for the given locator.");
    }
    await element.waitForElementState(elementState);
  }

  async clickAction(locator) {
    try {
      await this.waitForLocator(locator);
      await locator.click();
    } catch (e) {
      console.error("failed to do clickAction", e.message);
      throw e;
    }
  }

  async hoverAction(locator) {
    try {
      await this.waitForLocator(locator);
      await locator.hover();
    } catch (e) {
      console.error("failed to do hoverAction", e.message);
      throw e;
    }
  }

  async fillInput(locator, inputData) {
    try {
      await this.waitForLocator(locator);
      await locator.fill(inputData);
    } catch (e) {
      console.error("failed to do fillInput", e.message);
      throw e;
    }
  }

  async validateToHaveText(locator, inputData) {
    try {
      await this.waitForLocator(locator);
      await expect(locator).toHaveText(inputData);
    } catch (e) {
      console.error("failed to do validateToHaveText", e.message);
      throw e;
    }
  }

  async selectValuefromListDropdown(locator, optionlocator) {
    try {
      await this.clickAction(locator);
      await this.clickAction(optionlocator);
    } catch (e) {
      console.error("failed to do selectValuefromListDropdown", e.message);
      throw e;
    }
  }

  async validateToContainsText(locator, inputData) {
    try {
      await this.waitForLocator(locator);
      await expect(locator).toContainText(inputData);
    } catch (e) {
      console.error("failed to do validateToHaveText", e.message);
      throw e;
    }
  }

  async selectDropdownOption(locator, inputData) {
    try {
      await this.waitForLocator(locator);
      await locator.selectOption({ label: inputData });
    } catch (e) {
      console.error("failed to do SelectDropdownOption", e.message);
      throw e;
    }
  }

  async fetchTextContent(locator) {
    try {
      await this.waitForLocator(locator);
      return await locator.textContent();
    } catch (e) {
      console.error("failed to do FetchTextContent", e.message);
      throw e;
    }
  }

  async fillByPlaceholder(placeholderText, value, partialMatch = true) {
    let locatorXPath;

    if (partialMatch) {
      // Partial match, case-insensitive
      locatorXPath = `//input[contains(translate(@placeholder, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${placeholderText.toLowerCase()}')]
                      | //textarea[contains(translate(@placeholder, 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', 'abcdefghijklmnopqrstuvwxyz'), '${placeholderText.toLowerCase()}')]`;
    } else {
      // Exact match
      locatorXPath = `//input[@placeholder='${placeholderText}'] | //textarea[@placeholder='${placeholderText}']`;
    }

    const field = this.page.locator(locatorXPath);
    await this.fillInput(field, value);
  }

  async waitForToastToDisappear() {
    const toastLocator = this.page
      .locator('//div[@role="alert" and contains(@class,"Toastify")]')
      .last();
    try {
      // Wait for visible
      await toastLocator.waitFor({ state: "visible", timeout: 10000 });
    } catch {
      console.log("Toast did not appear → skipping visible wait");
    }

    // Ensure toast disappears
    await toastLocator.waitFor({ state: "hidden", timeout: 10000 });
  }

  async waitForSpinner() {
    await this.spinner
      .waitFor({ state: "hidden", timeout: 60000 })
      .catch(() => {});
  }

  async waitForToast(message) {
    let toast = this.page.locator(
      '//div[@role="alert" and contains(@class,"Toastify")]',
    );
    if (message) {
      toast = toast.filter({ hasText: message });
    } else {
      toast = toast.last(); // just grab the latest
    }

    await toast.waitFor(); // wait until it appears
    await toast.waitFor({ state: "detached" }); // then disappears
  }

  async clearAndFill(locatorOrSelector, newValue) {
    try {
      // normalize input → always a Locator
      const input =
        typeof locatorOrSelector === "string"
          ? this.page.locator(locatorOrSelector)
          : locatorOrSelector;

      await input.waitFor({ state: "visible" });

      // Try normal clear
      await input.fill("");

      // Verify if really cleared
      const currentValue = await input.inputValue();
      if (currentValue !== "") {
        // fallback: triple-click + backspace
        await input.click({ clickCount: 3 });
        await this.page.keyboard.press("Backspace");
      }

      // Type new value
      await input.type(newValue, { delay: 50 }); // small delay for realism
      console.log(`Cleared and refilled input with: ${newValue}`);
    } catch (e) {
      console.error(`Failed to clear and fill input: ${e.message}`);
      throw e;
    }
  }
  toDestParenSource(input) {
    // Match: <source> - <destination>  (supports -, – or — and trims spaces)
    const m = input.match(/^\s*(.*?)\s*[-–—]\s*(.*?)\s*$/);
    if (!m) return input; // if it doesn't match the pattern, return as-is
    const [, source, destination] = m;
    return `${destination} (${source})`;
  }

  getFileNameFromPath(filePath) {
    return filePath.split("/").pop().split(".")[0];
  }
  extractAfterHyphen(input) {
    if (!input || typeof input !== "string") return "";
    const idx = input.lastIndexOf("-");
    if (idx === -1) return input.trim();
    return input.slice(idx + 1).trim();
  }
  async checkVisibility(locator) {
    try {
      // wait up to 5000ms for element to appear
      await this.waitForLocator(locator, { timeout: 5000 });
      return await locator.isVisible({ timeout: 5000 });
    } catch (e) {
      console.warn("Element not visible or not found within 5s:", e.message);
      return false;
    }
  }
  async listOptions(optionName) {
    return this.page.locator(`//li[normalize-space()='${optionName}']`);
  }

  async takeScreenShot(module, fileName) {
    const folderPath = path.resolve(`./test-result/module-screenshots/${module}`);
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }
    const filePath = path.join(folderPath, `${fileName}.png`);
    const img = await pageFixture.page.screenshot({
      path: filePath,
      type: "png",
    });
    if (this && this.attach) {
      await this.attach(img, "image/png");
    }
    return filePath;
  }
}

module.exports = { baseClass };
