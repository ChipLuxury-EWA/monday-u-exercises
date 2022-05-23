// Implement the `Main` class here
class Main {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.whereAmI = "--here--"
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
        // this.todoList.onclick = deleteOrCompleteTask;
        // clearAllButton.onclick = clearAllTasks;
        // filterOption.onclick = filterTodo;
    }

    addTodo(event) {
        // TODO: ask idan why this is "main" instead of this
        console.log(main.todoInput)
        
        event.preventDefault();
        
        this.todoDiv = document.createElement("div");
        this.todoDiv.classList.add("todo");
        
        //create a new todo list item:
        this.newTodo = document.createElement("li");
        
        // TODO: ask idan why this is "main" instead of this
        // watch out from all this main....
        if (main.todoInput.value === "") {
            alert("ERROR - no empty task is allowed");
            return;
        }
    
        this.newTodo.innerText = main.todoInput.value;
        this.newTodo.classList.add("todo-item");
        this.todoDiv.appendChild(this.newTodo);
    
        //Check-mark button:
        this.completeButton = document.createElement("button");
        this.completeButton.innerHTML = '<i class="fas fa-check"></i>';
        this.completeButton.classList.add("complete-button");
        this.todoDiv.appendChild(this.completeButton);
    
        //check trash button:
        this.trashButton = document.createElement("button");
        this.trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        this.trashButton.classList.add("trash-button");
        this.todoDiv.appendChild(this.trashButton);
    
        main.todoList.appendChild(this.todoDiv);
        main.todoInput.value = "";
    }
}

const main = new Main();


document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});
