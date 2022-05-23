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

    if (todoInput.value === "") {
        alert("ERROR - no empty task is allowed");
        return;
    }
    const taskItem = createTodoDiv(todoInput.value)
    todoList.appendChild(taskItem);
    // clearing the input:
    todoInput.value = "";
}

function createTodoDiv(todoInput) {
    const newTodoDiv = document.createElement("div");
    newTodoDiv.classList.add("todo");
    newTodoDiv.appendChild(createTodoTitle(todoInput));
    newTodoDiv.append(...createTwoButton());
    return newTodoDiv
}

function createTodoTitle(todoTitle) {
    // this function create a new todo title and assign a class 
    const newTodo = document.createElement("li");
    newTodo.innerText = todoTitle
    newTodo.classList.add("todo-item");
    return newTodo
}

function createTwoButton() {
    // This function create 2 necessary buttons:
    // according to font awesome buttonIcon can be "check" or "trash"

    //Check-mark button:
    const button1 = createButton("complete-button", "check");
    //check trash button:
    const button2 = createButton("trash-button", "trash");
    return [button1, button2];
}

function createButton(buttonClass, buttonIcon) {
    // This function create a button with font-awesome icon
    // and add class to it
    const newButton = document.createElement("button");
    newButton.innerHTML = `<i class="fas fa-${buttonIcon}" ></i>`;
    newButton.classList.add(buttonClass);
    return newButton;
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
        }, 500);
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
