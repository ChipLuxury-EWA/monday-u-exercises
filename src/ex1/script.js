//SELECTORS:
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");

//Event listeners:
todoButton.onclick = addTodo;
todoList.onclick = deleteOrCompleteTask;

//Functions:

function addTodo(event) {
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //create a new todo list item:
    const newTodo = document.createElement("li");
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
        item.parentElement.remove();
    } else if (item.classList[0] === "complete-button") {
        const todo = item.parentElement;
        todo.classList.toggle('completed')
    }
}
