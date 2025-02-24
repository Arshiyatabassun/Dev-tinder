const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("enter valid emailId");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Enter a valid password");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "photoUrl",
    "about",
    "skills",
  ];
  const isAllowedEditFields = Object.keys(req.body).every((fields) =>
    allowedEditFields.includes(fields)
  );
  return isAllowedEditFields;
};
module.exports = {
  validateSignUpData,
  validateEditProfileData,
};
