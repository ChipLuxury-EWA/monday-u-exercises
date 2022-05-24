import { ItemManger } from "./itemManger.js";
class Main {
    constructor(ItemManger) {
        this.addTodo = ItemManger.addTodo.bind(this)
        this.createTodoDiv = ItemManger.createTodoDiv.bind(this)
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
        this.todoButton.onclick = this.addTodo.bind(this);
        // this.todoList.onclick = deleteOrCompleteTask;
        // clearAllButton.onclick = clearAllTasks;
        // filterOption.onclick = filterTodo;
    }
}

const item = new ItemManger();
const main = new Main(item);
document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    
    main.init();
});
