let toggle = true;

function getNextGender() {
  const gender = toggle ? "Male" : "Female";
  toggle = !toggle;
  return gender;
}

module.exports = { getNextGender };
