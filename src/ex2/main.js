import { ItemManger } from "./itemManger.js";

class Main {
    addTodo = (event) => {
        console.log(this);
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
        // clearAllButton.onclick = this.clearAllTasks;
        // filterOption.onclick = this.filterTodo;
    }
}

const main = new Main();
document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button

    main.init();
});
