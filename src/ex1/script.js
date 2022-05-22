//SELECTORS:
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const todos = todoList.childNodes;
const clearAllButton = document.querySelector(".clear-all-button");
const filterOption = document.querySelector(".filter-todo");
const pendingCounter = document.querySelector(".pending-counter");

//Event listeners:
todoButton.onclick = addTodo;
todoList.onclick = deleteOrCompleteTask;
clearAllButton.onclick = clearAllTasks;
filterOption.onclick = filterTodo;

//Functions:

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create a new todo list item:
    const newTodo = document.createElement("li");

    if (todoInput.value === "") {
        alert("ERROR - no empty task is allowed");
        return;
    }

    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    //Check-mark button:
    const completeButton = document.createElement("button");
    completeButton.innerHTML = '<i class="fas fa-check"></i>';
    completeButton.classList.add("complete-button");
    todoDiv.appendChild(completeButton);

    //check trash button:
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-button");
    todoDiv.appendChild(trashButton);

    todoList.appendChild(todoDiv);
    todoInput.value = "";
}

function deleteOrCompleteTask(event) {
    const item = event.target;
    if (item.classList[0] === "trash-button") {
        const todo = item.parentElement;
        todo.classList.add("fall");
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    } else if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    } else if (item.classList[0] === "todo-item") {
        confirm(item.innerHTML);
    }
}

// filtering completed task or uncompleted task
function filterTodo(event) {
    todos.forEach(function (todo) {
        switch (event.target.value) {
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                todo.style.display = "flex";
                break;
        }
    });
}

function clearAllTasks() {
    const allTodos = document.querySelectorAll(".todo");
    allTodos.forEach((task) => {
        task.classList.add("fall");
        setTimeout(() => {
            task.remove();
        },500);    
    });
}

function updatePending() {
    const completedTask = document.querySelectorAll(".completed");
    const pendingTasksAmount = todos.length - completedTask.length;
    if (pendingTasksAmount === 0) {
        pendingCounter.innerHTML = `YAYY all your task are done, add new task...`;
    } else {
        pendingCounter.innerHTML = `You have ${pendingTasksAmount} pending tasks`;
    }
    showHideFeaturesButtons();
}

function showHideFeaturesButtons() {
    if (todos.length !== 0) {
        clearAllButton.style.display = "flex";
        filterOption.style.display = "flex";
    } else {
        clearAllButton.style.display = "none";
        filterOption.style.display = "none";
    }
}

// Updating pending message on each task change:

// https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver:
const config = { attributes: true, childList: true, subtree: true };

const callback = function (mutationsList) {
    for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
            updatePending();
        } else if (mutation.type === "attributes") {
            updatePending();
        }
    }
};

const observer = new MutationObserver(callback);
observer.observe(todoList, config);
