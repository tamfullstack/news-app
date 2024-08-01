"use strict";

const usernameInput = document.getElementById("input-username");
const passwordInput = document.getElementById("input-password");

const submitBtn = document.getElementById("btn-submit");

submitBtn.addEventListener("click", () => {
  const currentUser = userArr.find(
    (user) => user.username === usernameInput.value
  );

  if (!currentUser) {
    alert("Username is invalid!");
  } else {
    if (currentUser.password === passwordInput.value) {
      saveToStorage("CURRENT_USER", JSON.stringify(currentUser));
      window.location.href = "../index.html";
    } else {
      alert("Password is invalid!");
    }
  }
});
