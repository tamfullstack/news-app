"use strict";

const loginModalEl = document.getElementById("login-modal");
const mainContentEl = document.getElementById("main-content");
const welcomeMessageEl = document.getElementById("welcome-message");

const logoutBtn = document.getElementById("btn-logout");

let isLogin = Boolean(currentUser);

const renderHome = () => {
  if (isLogin) {
    loginModalEl.classList.add("hide");
    mainContentEl.classList.remove("hide");
    welcomeMessageEl.textContent = `Welcome ${currentUser.firstName}`;
  } else {
    loginModalEl.classList.remove("hide");
    mainContentEl.classList.add("hide");
  }
};
renderHome();

logoutBtn.addEventListener("click", () => {
  if (confirm("Are you sure?")) {
    removeFromStorage("CURRENT_USER");
    isLogin = false;
    renderHome();
  }
});
