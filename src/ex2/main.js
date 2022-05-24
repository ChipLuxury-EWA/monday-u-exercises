import { ItemManger } from "./itemManger.js";

import { TASK_COMPLETED_CLASS_NAME } from "./constants.js";
class Main {
    addTodo = (event) => {
        event.preventDefault();

        if (this.todoInput.value === "") {
            alert("ERROR - no empty task is allowed");
            return;
        }
        // if (regex just numbers) {fetch pokemon by id}
        this.taskItem = this.createTodoDiv(this.todoInput.value);
        this.todoList.appendChild(this.taskItem);
        // clearing the input:
        this.todoInput.value = "";
    };

    createTodoDiv = (todoInput) => {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.classList.add("todo");
        newTodoDiv.appendChild(this.createTodoTitle(todoInput));
        newTodoDiv.append(...this.createTwoBasicButtons(this));
        return newTodoDiv;
    };

    createTodoTitle = (todoTitle) => {
        // this function create a new todo title and assign a class
        const newTodo = document.createElement("li");
        newTodo.innerText = todoTitle;
        newTodo.classList.add("todo-item");
        return newTodo;
    };

    createTwoBasicButtons = () => {
        // according to font awesome buttonIcon are "check" or "trash"
        const button1 = this.createButtonAndAddClass(
            "complete-button",
            "check"
        );
        const button2 = this.createButtonAndAddClass("trash-button", "trash");
        return [button1, button2];
    };

    createButtonAndAddClass = (buttonClass, buttonIcon) => {
        const newButton = document.createElement("button");
        //i tag is for font awesome
        newButton.innerHTML = `<i class="fas fa-${buttonIcon}" ></i>`;
        newButton.classList.add(buttonClass);
        return newButton;
    };

    deleteOrCompleteTask = (event) => {
        const item = event.target;
        if (item.classList[0] === "trash-button") {
            const todo = item.parentElement;
            todo.classList.add("fall");
            todo.addEventListener("transitionend", function () {
                todo.remove();
            });
        } else if (item.classList[0] === "complete-button") {
            const todo = item.parentElement;
            todo.classList.toggle(TASK_COMPLETED_CLASS_NAME);
        } else if (item.classList[0] === "todo-item") {
            confirm(item.innerHTML);
        }
    };

    showHideFeaturesButtons = () => {
        if (this.todos.length !== 0) {
            this.clearAllButton.style.display = "flex";
            this.filterOption.style.display = "flex";
        } else {
            this.clearAllButton.style.display = "none";
            this.filterOption.style.display = "none";
        }
    };

    updatePending = () => {
        const completedTask = document.querySelectorAll(".completed");
        const pendingTasksAmount = this.todos.length - completedTask.length;
        if (pendingTasksAmount === 0) {
            this.pendingCounter.innerHTML = `YAYY all your task are done, add new task...`;
        } else {
            this.pendingCounter.innerHTML = `You have ${pendingTasksAmount} pending tasks`;
        }
        this.showHideFeaturesButtons();
    };

    callback = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (mutation.type === "childList") {
                this.updatePending();
            } else if (mutation.type === "attributes") {
                this.updatePending();
            }
        }
    };

    filterTodo = (event) => {
        this.todos.forEach(function (todo) {
            const hasTaskCompleted = todo.classList.contains(
                TASK_COMPLETED_CLASS_NAME
            );
            switch (event.target.value) {
                case "completed":
                    if (hasTaskCompleted) {
                        todo.style.display = "flex";
                    } else {
                        todo.style.display = "none";
                    }
                    break;
                case "uncompleted":
                    if (!hasTaskCompleted) {
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
    };

    clearAllTasks= () => {
        const allTodos = document.querySelectorAll(".todo");
        allTodos.forEach((task) => {
            task.classList.add("fall");
            setTimeout(() => {
                task.remove();
            }, 500);
        });
    }

    init() {
        //SELECTORS:
        this.todoInput = document.querySelector(".todo-input");
        this.todoButton = document.querySelector(".todo-button");
        this.todoList = document.querySelector(".todo-list");
        this.todos = this.todoList.childNodes;
        this.clearAllButton = document.querySelector(".clear-all-button");
        this.filterOption = document.querySelector(".filter-todo");
        this.pendingCounter = document.querySelector(".pending-counter");

        //Event listeners:
        this.todoButton.onclick = this.addTodo;
        this.todoList.onclick = this.deleteOrCompleteTask;
        this.clearAllButton.onclick = this.clearAllTasks;
        this.filterOption.onclick = this.filterTodo;

        // Updating pending message on each task change(className or new item):
        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(this.callback);
        observer.observe(this.todoList, config);
    }
}

const main = new Main();
document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button

    main.init();
});
