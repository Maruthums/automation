const pageFixture = {
  page: undefined,
};

if (!global.visitedEmails) {
  global.visitedEmails = new Set();
}

module.exports = { pageFixture };
