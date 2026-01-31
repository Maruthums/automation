const { When, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { UserManagement } = require("../pages/UserManagement");

let userMgmt, createdUser;

When("I add a new user with random details", async function () {
  userMgmt = new UserManagement(pageFixture.page);
  await userMgmt.clickAction(userMgmt.adminUsersLink);
  await userMgmt.validateToHaveText(userMgmt.userMgmtTitle, /User Management/);

  createdUser = await userMgmt.addAdminUser();
});

Then("I can search and edit that user with updated details", async function () {
  await userMgmt.editAdminUser(
    createdUser.firstName,
    createdUser.lastName,
    createdUser.email,
  );
});

Then("I can change the status of that user", async function () {
  const result = await userMgmt.toggleUserStatus(
    createdUser.firstName,
    createdUser.lastName,
  );
  console.log("Status Toggle Result:", result);
});

Then("I can delete that user from the Sidekick portal", async function () {
  await userMgmt.deleteAdminUser(createdUser.firstName, createdUser.lastName);
});
