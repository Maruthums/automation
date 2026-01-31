const { When, Then } = require("@cucumber/cucumber");
const path = require("path");
const { pageFixture } = require("../common/pageFixture");
const { CabinPhotos } = require("../pages/CabinPhotos");
const { cabinData } = require("../common/testData");


let cabinPhoto;
let counselorName = null;

When("navigate into Cabin photos", async function () {
  cabinPhoto = new CabinPhotos(pageFixture.page);

  await cabinPhoto.clickAction(cabinPhoto.toolsLink);
  await cabinPhoto.waitForSpinner();
  await cabinPhoto.clickAction(cabinPhoto.cabinPhotosLink);
  await cabinPhoto.waitForSpinner();
});

When("Choose filter in Cabin photos Overview", async function () {
  cabinPhoto = new CabinPhotos(pageFixture.page);

  const sharedData = cabinData;
  
   await cabinPhoto.CabinPhotoFilters(
    sharedData.year,
    sharedData.Week,
    sharedData.camp,
  );
  counselorName = await cabinPhoto.FetchCounselorInfo(sharedData.cabinName),
  console.log("counselorName:", counselorName);
});

When(
  "upload Cabin photos",
  async function () {
    cabinPhoto = new CabinPhotos(pageFixture.page);
    const sharedData = cabinData;
    const filePath = path.resolve(
      __dirname,
      `../Photos/CabinPhotos/${sharedData.fileName}`,
    );
    await cabinPhoto.UploadCabinPhotos(filePath, sharedData.camp);
    await cabinPhoto.SelectCounselorForCabinPhoto(filePath, counselorName);
    await cabinPhoto.clickAction(cabinPhoto.SaveAndCloseButton);
    await cabinPhoto.takeScreenShot("CabinPhoto", `upload-cabin-photos`);
    await cabinPhoto.waitForSpinner();
  },
);
Then(
  "Verify and Approved the Cabin Photo In Review Section",
  async function () {
    cabinPhoto = new CabinPhotos(pageFixture.page);
    await cabinPhoto.ReviewAndApproveCabinPhotos(counselorName);
  },
);
Then(
  "Verify and Publish the Cabin Photo In Approved Section",
  async function () {
    cabinPhoto = new CabinPhotos(pageFixture.page);
    await cabinPhoto.ApproveTheReviewedCabinPhotos(counselorName);
  },
);
Then(
  "Verify and Published Cabin Photo In Published Section",
  async function () {
    await cabinPhoto.PublishedSection(counselorName);
  },
);
