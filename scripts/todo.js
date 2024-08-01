"use strict";

const todoListEl = document.getElementById("todo-list");

const taskInput = document.getElementById("input-task");
const addBtn = document.getElementById("btn-add");

const todoArr = JSON.parse(getFromStorage("TODO_ARR")) || [];

const toggleTask = (id) => {
  const index = todoArr.findIndex((todo) => todo.id === id);
  todoArr[index].isDone = !todoArr[index].isDone;
  saveToStorage("TODO_ARR", JSON.stringify(todoArr));
  renderTodoList();
};

const deleteTask = (id) => {
  if (confirm("Are you sure?")) {
    const index = todoArr.findIndex((todo) => todo.id === id);
    todoArr.splice(index, 1);
    saveToStorage("TODO_ARR", JSON.stringify(todoArr));
    renderTodoList();
  } else {
    toggleTask(id);
  }
};

if (!currentUser) {
  window.location.href = "../index.html";
}

function renderTodoList() {
  const todoList = todoArr.filter(
    (todo) => todo.owner === currentUser.username
  );

  todoListEl.innerHTML = "";
  let html = "";

  todoList.forEach((todo) => {
    html += `<li class="${todo.isDone ? "checked" : ""}" onclick="toggleTask(${
      todo.id
    })">${todo.task}<span class="close" onclick="deleteTask(${
      todo.id
    })">×</span></li>`;
  });

  todoListEl.innerHTML = html;
}
renderTodoList();

addBtn.addEventListener("click", () => {
  const newTask = taskInput.value;

  if (!newTask) {
    alert("Please input task!");
  } else {
    const newId = todoArr.length === 0 ? 1 : todoArr[todoArr.length - 1].id + 1;
    todoArr.push(new Task(newId, newTask, currentUser.username, false));
    saveToStorage("TODO_ARR", JSON.stringify(todoArr));
    renderTodoList();
    taskInput.value = "";
  }
});
