// Camper Accounts
const camperAccountData = [
  {
    email: 'testuser_1756964910686@yopmail.com',
    campType: 'Family Camp',
    campName: 'Woods',
    fileName: 'headshot_woods.jpg'
  },
  {
    email: 'testuser_1756964947733@yopmail.com',
    campType: 'Youth Camp',
    campName: 'Towers',
    fileName: 'headshot_towers.jpg'
  },
  {
    email: 'testuser_1756964971735@yopmail.com',
    campType: 'Youth Camp',
    campName: 'Shores Overflow',
    fileName: 'camper_headshot_shores_overflow.jpg'
  },
];

// Camper Headshots
const camperHeadshotData = [
  {
    camperName: "Carmelo Schmeler",
    campType: "Youth Camp",
    campName: "Towers",
    year: "2025",
    week: "Week 14",
    tab: "No Headshot",
  },
  {
    camperName: "mohan test",
    campType: "Youth Camp",
    campName: "Towers",
    year: "2025",
    week: "Week 14",
    tab: "Expired Headshot",
  },
  {
    camperName: "Bran Joal",
    campType: "Youth Camp",
    campName: "Towers",
    year: "2025",
    week: "Week 14",
    tab: "Valid",
  },
  {
    camperName: "Philiip Samual",
    campType: "Family Camp",
    campName: "Woods",
    year: "2025",
    week: "Week 15",
    tab: "No Headshot",
  },
  {
    camperName: "Luke Joseph",
    campType: "Family Camp",
    campName: "Woods",
    year: "2025",
    week: "Week 15",
    tab: "Expired Headshot",
  },
  {
    camperName: "Harry Taylor",
    campType: "Family Camp",
    campName: "Woods",
    year: "2025",
    week: "Week 15",
    tab: "Valid",
  },
];

// Staff Accounts
const staffAccountData = [
  {
    staffSeason: "Summer 2025",
    campType: "Towers Summer 2025",
    staffName: "Edward Joseph",
    fileName: "edward_headshot.jpg"
  },
  {
    staffSeason: "Summer 2025",
    campType: "City-Alpine Summer 2025",
    staffName: "Prayag Jim",
    fileName: "jim_headshot.jpg"
  },
];

// ScheduleBuilder static values
const schedulerData = {
  daysToSelect: ["Monday", "Wednesday", "Thursday", "Saturday"],
  morning: {
    activities: ["Morning Activities", "Fishing with Braut", "Hot Coffee"],
    times: ["7:00 AM", "7:15 AM", "7:30 AM"],
    descriptions: ["Sign ups only", "Dads and sons", ""],
    locations: ["Cabin Lake", "Big Horn or Whitetail"],
  },
  whatToBring: {
    wear: "Play clothes, closed-toe shoes",
    pack: "Change of clothes, pullups/diapers, wipes",
  },
  meal: {
    type: "Meal",
    breakfast: {
      type: "Breakfast",
      time: "8:30 AM",
      desc: "French toast creme brule, scrambled eggs, hash brown patties, sausage links",
    },
    lunch: {
      type: "Lunch",
      time: "12:30 PM",
      desc: "Adults only: southwest chicken wraps, house made chips, fresh fruit, baked potato soup",
    },
    flushAndBrush: {
      type: "Flush & Brush",
      time: "5:00 PM",
      desc: "All staffed activities close. Get cleaned up and dressed for evening activities.",
    },
  },
  schedule: {
    kidsProgramBegin: {
      name: "Kids Program Begin",
      time: "9:30 AM",
      eveningName: "Kids Program Begin",
      eveningTime: "5:45 PM",
    },
    coveKidsLocation: "Cove Kids building",
    crewLocation: "Supla",
    impactLocation: "Meet at the Outpost",
    speakerSession: {
      name: "Speaker Session",
      time: "10:00 AM",
      location: "Big Horn",
      desc: "Adults. Coffee & snack break around 11am.",
    },
    riteNightMeeting: {
      name: "Rite Night Meeting",
      time: "12:15 PM",
      location: "Big Horn",
      desc: "All parents with Impact kids",
    },
    extendedFamilyFreeTime: {
      name: "Extended Family Free Time",
      time: "1:30 PM",
      desc: "Impact and Crew released to join parents; optional Cove Kids pick-up",
      popup: {
        name: "Activities",
        title: "Extended Family Free Time Activities",
        listItem: "Golf",
      },
    },
    freeTimeContinues: {
      name: "Free Time Continues",
      time: "3:00 PM",
      popupTitle: "Free Time Activities",
    },
    pickUpCoveKids: {
      name: "Pick Up Cove Kids",
      time: "3:15 PM",
    },
    eveningProgram: {
      name: "Evening Program",
      time: "5:15 PM",
    },
    adultDateNight: {
      name: "Adult Date Night",
      time: "6:15 PM",
      location: "Whitetail Lodge",
    },
    kidsProgramEnd: {
      name: "Kids Program End",
      time: "8:30 PM",
    },
    impactReleasedLocation: "Released",
    snacksAndGames: {
      name: "Snacks & Games",
      time: "9:00 PM",
      location: "Whitetail Lodge",
    },
  },
  // Add editFlow to schedulerData for editScheduleActivities references
  editFlow: {
    morning1: {
      name: "Mom Walk",
      time: "7:45 AM",
      location: "Meet at Whitetail Porch",
      desc: "Moms and leadership girls ",
    },
    morning2: {
      name: "Cowboy Breakfast",
      time: "7:30 AM",
      location: "Meet behind snack shop or drive yourself",
      desc: "Signed-up parents only",
    },
    morning3: {
      name: "Family Devo",
      time: "9:00 AM",
      location: "Cabins",
      desc: "Cove Kids open for kids 2 and under",
    },
    kidsProgramBegin: {
      time: "9:45 AM",
    },
    lunch: {
      desc: "To-go plates for parents available for those signed up by 10am. Hamburger with chips or hummus and veggie wrap. Pick up to-go boxes in Big Horn.",
    },
    afternoon1: {
      name: "Camp Store Opens",
      time: "3:00 PM",
    },
    evening1: {
      name: "Club",
      time: "7:30 PM",
    },
    evening2: {
      name: "Pool Open",
      time: "9:00 PM",
      location: "Pool",
      desc: "Until 10pm",
    },
  },
  duplicateFlow: {
    morning1: {
      name: "Mom Workout",
      time: "7:00 AM",
      location: "Outpost",
    },
    morning2: {
      name: "Parent Pool Party & Funsies Pickleball Tournament",
      time: "11:00 AM",
      location: "Pool",
    },
    morning3: {
      name: "Group Picture",
      time: "7:30 PM",
      location: "Whitetail Lodge Porch",
      desc: "Adults",
    },
  },
};

const cabinData = {
  year: "2025",
  Week: "Week 15",
  camp: "Towers",
  cabinName: "Towers - Wrangler",
  fileName: "cabin_photo_towers.jpg"
}

const familyData = {
  year: "2025",
  Week: "Week 15",
  camp: "Woods",
  familyName: "Woods - AutoWoods Parent",
  fileName: "family_photo_woods.jpg"
}

const campUpdateData = {
  eventYear: "2025",
  region: "All",
  campType: "All",
  category: "Cabin Update",
  textSuffix: "Automation Test",
  fileName: "sample.jpg"
}

// Export all test data in a single object for easier import
const testData = {
  camperAccountData,
  camperHeadshotData,
  staffAccountData,
  schedulerData,
  cabinData,
  familyData,
  campUpdateData
};

module.exports = testData;
