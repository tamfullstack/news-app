"use strict";

function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

function getFromStorage(key) {
  return localStorage.getItem(key);
}

function removeFromStorage(key) {
  localStorage.removeItem(key);
}
