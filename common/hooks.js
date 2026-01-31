const {
  BeforeAll,
  AfterAll,
  setDefaultTimeout,
  Before,
  After,
} = require("@cucumber/cucumber");
let { chromium, browser } = require("playwright");
const path = require("path");
const { pageFixture } = require("./pageFixture");
const { LoginPage } = require("../pages/LoginPage");

setDefaultTimeout(120 * 1000);

let context;
let page;

BeforeAll(async function () {
  browser = await chromium.launch({
    headless: false,
    args: ["--window-size=1920,1080"],
  });
  context = await browser.newContext({
    viewport: { width: 1920, height: 1080 },
  });
});

Before(async function () {
  context = await browser.newContext({
    acceptDownloads: true,
    downloadsPath: path.resolve(__dirname, "./downloads"),
  });
  page = await context.newPage();
  pageFixture.page = page;
  this.loginPage = new LoginPage(pageFixture.page);
  await this.loginPage.navigate();
  await this.loginPage.injectToken();
});

After(async function ({ pickle }) {
  const img = await pageFixture.page.screenshot({
    path: `./test-result/screenshots/${pickle.name}.png`,
    type: "png",
  });
  await this.attach(img, "image/png");
  await pageFixture.page.close();
});

AfterAll(async function () {
  await browser.close();
});
