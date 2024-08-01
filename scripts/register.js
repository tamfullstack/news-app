"use strict";

const firstNameInput = document.getElementById("input-firstname");
const lastNameInput = document.getElementById("input-lastname");
const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");
const passwordConfirmInput = document.getElementById("input-password-confirm");

const submitBtn = document.getElementById("btn-submit");

const validate = (data) => {
  const errors = [];

  const addEmptyInputError = (input) => {
    errors.push(`Please input ${input}!`);
  };

  if (!data.firstName) {
    addEmptyInputError("First Name");
  }

  if (!data.lastName) {
    addEmptyInputError("Last Name");
  }

  if (!data.username) {
    addEmptyInputError("Username");
  } else if (userArr.some((user) => user.username === data.username)) {
    errors.push("Please input other Username!");
  }

  if (data.password.length < 8) {
    errors.push("Password must have at least 8 characters!");
  }

  if (data.passwordConfirm !== data.password) {
    errors.push("Password and Password Confirm must be same!");
  }

  if (errors.length > 0) {
    alert(errors.join("\n"));
    return false;
  }
  return true;
};

const parseUser = (userData) => {
  return new User(
    userData.firstName,
    userData.lastName,
    userData.username,
    userData.password
  );
};

submitBtn.addEventListener("click", () => {
  const userData = {
    firstName: firstNameInput.value,
    lastName: lastNameInput.value,
    username: usernameInput.value,
    password: passwordInput.value,
    passwordConfirm: passwordConfirmInput.value,
  };

  if (validate(userData)) {
    userArr.push(parseUser(userData));
    saveToStorage("USER_ARRAY", JSON.stringify(userArr));
    alert("Registered!");
    window.location.href = "../pages/login.html";
  }
});
