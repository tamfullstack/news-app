"use strict";

const newsPerPageInput = document.getElementById("input-page-size");
const newsCategoryInput = document.getElementById("input-category");

const submitBtn = document.getElementById("btn-submit");

newsPerPageInput.value = newsPerPage;
newsCategoryInput.value = newsCategory;

submitBtn.addEventListener("click", () => {
  const enteredNewsPerPage = newsPerPageInput.value;
  const enteredNewsCategory = newsCategoryInput.value;

  if (enteredNewsPerPage < 1) {
    alert("News per page must be more than 0!");
  } else {
    saveToStorage("NEWS_PER_PAGE", enteredNewsPerPage);
    saveToStorage("NEWS_CATEGORY", enteredNewsCategory);
    alert("Saved!");
  }
});
