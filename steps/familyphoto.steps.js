const { When, Then } = require("@cucumber/cucumber");
const path = require("path");
const { pageFixture } = require("../common/pageFixture");
const { FamilyPhotos } = require("../pages/FamilyPhotos");
const { CabinPhotos } = require("../pages/CabinPhotos");
const { familyData } = require("../common/testData");

let familyPhoto;
let cabinPhoto;
let camperName = "";

When("navigate into Family photos", async function () {
  familyPhoto = new FamilyPhotos(pageFixture.page);
  cabinPhoto = new CabinPhotos(pageFixture.page);
  await familyPhoto.clickAction(cabinPhoto.toolsLink);
  await cabinPhoto.waitForSpinner();
  await familyPhoto.clickAction(familyPhoto.FamilyPhotosLink);
  await cabinPhoto.waitForSpinner();
});

When("Choose filter in family photos Overview", async function () {
  cabinPhoto = new CabinPhotos(pageFixture.page);
  familyPhoto = new FamilyPhotos(pageFixture.page);

  const sharedData = familyData;
  await cabinPhoto.CabinPhotoFilters(
    sharedData.year,
    sharedData.Week,
    sharedData.camp,
  );
  camperName = await familyPhoto.FetchCamperInfo(sharedData.familyName);
});

When(
  "upload Family photos",
  async function () {
    cabinPhoto = new CabinPhotos(pageFixture.page);

    const sharedData = familyData;
    const filePath = path.resolve(
      __dirname,
      `../Photos/FamilyPhotos/${sharedData.fileName}`,
    );

    await cabinPhoto.UploadCabinPhotos(filePath, sharedData.camp);
    await cabinPhoto.SelectCounselorForCabinPhoto(filePath, camperName);
    await familyPhoto.clickAction(cabinPhoto.SaveAndCloseButton);
    await familyPhoto.takeScreenShot("FamilyPhoto", `upload-family-photos`);
    await cabinPhoto.waitForSpinner();
  },
);
Then(
  "Verify and Approved the family Photo In Review Section",
  async function () {
    await cabinPhoto.ReviewAndApproveCabinPhotos(camperName, "family");
  },
);
Then(
  "Verify and Publish the family Photo In Approved Section",
  async function () {
    familyPhoto = new FamilyPhotos(pageFixture.page);
    await familyPhoto.ApproveTheReviewedFamilyPhotos(camperName);
  },
);
Then(
  "Verify and Published family Photo In Published Section",
  async function () {
    await cabinPhoto.PublishedSection(camperName);
  },
);
