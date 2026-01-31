const { Given, When } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { SurveyResponse } = require("../pages/SurveyResponse");

let surveyResponse;

Given("navigates the user to survey response via sidebar", async () => {
  surveyResponse = new SurveyResponse(pageFixture.page);
  await surveyResponse.surveysSidebar.click();
  await surveyResponse.surveyResponseSidebar.click();
  await surveyResponse.validateToHaveText(
    surveyResponse.pageTitle,
    /Survey Responses/,
  );
});

When("user selects filters and downloads surveys", async (dataTable) => {
  const filters = dataTable.hashes();

  for (const { year, camp, week } of filters) {
    console.log(
      `\n Running survey download for ${year} | ${camp} | ${week}`,
    );

    await surveyResponse.applyFilters(year, camp, week);
    await surveyResponse.downloadSurvey(year, camp, week);
  }
});

When("user selects filter and view survey details", async (dataTable) => {
  const filters = dataTable.hashes();

  for (const { year, camp, week, surveyType } of filters) {
    console.log(
      `\n Running survey details view for ${year} | ${camp} | ${week}`,
    );

    await surveyResponse.applyFilters(year, camp, week);
    await surveyResponse.viewSurveyResults(year, camp, week, surveyType);
  }
});
