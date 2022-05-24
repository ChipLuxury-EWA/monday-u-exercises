export class ItemManger {
    constructor(params) {
        
    }

    addTodo(event) {
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
    }

    createTodoDiv(todoInput) {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.classList.add("todo");
        newTodoDiv.appendChild(this.createTodoTitle(todoInput));
        newTodoDiv.append(...this.createTwoButton(this));
        return newTodoDiv;
    }

    createTodoTitle(todoTitle) {
        // this function create a new todo title and assign a class
        const newTodo = document.createElement("li");
        newTodo.innerText = todoTitle;
        newTodo.classList.add("todo-item");
        return newTodo;
    }

    createTwoButton() {
        // This function create 2 necessary buttons:
        // according to font awesome buttonIcon can be "check" or "trash"

        //Check-mark button:
        const button1 = this.createButton("complete-button", "check");
        //check trash button:
        const button2 = this.createButton("trash-button", "trash");
        return [button1, button2];
    }

    createButton(buttonClass, buttonIcon) {
        // This function create a button with font-awesome icon
        // and add class to it
        const newButton = document.createElement("button");
        newButton.innerHTML = `<i class="fas fa-${buttonIcon}" ></i>`;
        newButton.classList.add(buttonClass);
        return newButton;
    }
}