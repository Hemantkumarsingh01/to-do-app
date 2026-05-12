const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskList = document.getElementById("taskList");
const errorText = document.getElementById("errorText");

let tasks = [];

addButton.addEventListener("click", function () {
  addTask();
});

taskInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});

function addTask() {
  const taskText = taskInput.value.trim();

  if (taskText === "") {
    errorText.textContent = "Please enter a task.";
    return;
  }

  const task = {
    id: Date.now(),
    text: taskText,
    completed: false
  };

  tasks.push(task);

  taskInput.value = "";
  errorText.textContent = "";

  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    const task = tasks[i];

    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.className = "task-text";

    if (task.completed === true) {
      span.classList.add("completed");
    }

    span.addEventListener("click", function () {
      task.completed = !task.completed;
      renderTasks();
    });

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "delete-btn";

    deleteButton.addEventListener("click", function () {
      deleteTask(task.id);
    });

    li.appendChild(span);
    li.appendChild(deleteButton);

    taskList.appendChild(li);
  }
}

function deleteTask(id) {
  tasks = tasks.filter(function (task) {
    return task.id !== id;
  });

  renderTasks();
}