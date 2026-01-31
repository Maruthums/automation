const { When, Then } = require("@cucumber/cucumber");
const { pageFixture } = require("../common/pageFixture");
const { CampUpdatePost } = require("../pages/CampUpdatePost");

let camperUpdatePost;

When("Camp Update Posts Base Screen", async function () {
  camperUpdatePost = new CampUpdatePost(pageFixture.page);
  await camperUpdatePost.clickAction(camperUpdatePost.toolsLink);
  await camperUpdatePost.clickAction(camperUpdatePost.campUpdatePostsLink);
  await camperUpdatePost.validateToHaveText(
    camperUpdatePost.campUpdatePostsTitle,
    /Camp Update Posts/,
  );
  await camperUpdatePost.selectFilter();
  await camperUpdatePost.waitForSpinner();
  await camperUpdatePost.clickAction(camperUpdatePost.createCampUpdatePosts);
});

Then("Create Camp Update Posts", async function () {
  await camperUpdatePost.createPost();
});

Then("View Camp Update Posts", async function () {
  await camperUpdatePost.viewPost();
});

Then("Edit Camp Update Posts", async function () {
  await camperUpdatePost.editPost();
});

Then(
  "View Publish Details, Edit, Duplicate, Hide and Delete",
  async function () {
    const editText = "More View";
    await camperUpdatePost.waitForSpinner();
    await camperUpdatePost.clickAction(camperUpdatePost.moreButton);
    await camperUpdatePost.publishDetail();
    await camperUpdatePost.waitForSpinner();
    await camperUpdatePost.clickAction(camperUpdatePost.moreButton);
    await camperUpdatePost.clickAction(camperUpdatePost.editButton);
    await camperUpdatePost.editPost(editText);
    await camperUpdatePost.waitForSpinner();
    await camperUpdatePost.clickAction(camperUpdatePost.moreButton);
    await camperUpdatePost.duplicatePost();
    await camperUpdatePost.waitForSpinner();
    await camperUpdatePost.clickAction(camperUpdatePost.moreButton);
    await camperUpdatePost.hidePost();
    await camperUpdatePost.waitForSpinner();
    await camperUpdatePost.clickAction(camperUpdatePost.moreButton);
    await camperUpdatePost.deletePost();
  },
);

Then("Delete Duplicate Posts", async function () {
  await camperUpdatePost.clickAction(camperUpdatePost.moreButton);
  await camperUpdatePost.validateToHaveText(
    camperUpdatePost.deleteDuplicate,
    /Duplicate Post Automation Test/,
  );
  await camperUpdatePost.deletePost();
});
