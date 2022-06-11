import { ItemManager } from "./itemManger.js";
import { PokemonClient } from "./pokemonClient.js";

import {
    CLEAR_BUTTON_CLASS,
    COUNTER_CLASS,
    FILTER_CLASS,
    POKEMON_ID_ZERO,
    TASK_COMPLETED_CLASS_NAME,
    TODO_BUTTON_CLASS,
    TODO_INPUT_CLASS,
    TODO_LIST_CLASS,
    TOP_EDGE_POKEMON_ID,
    HEALTH_CHECK_BUTTON_ID,
} from "./constants.js";

class Main {
    renderTasks = () => {
        this.todoList.innerHTML = ""; // prevent double rendering..
        itemManager.tasksArray.forEach(async (task) => {
            const taskItem = await this.createTodoDiv(task);
            this.todoList.appendChild(taskItem);
        });
    };
    addTodo = async (event) => {
        event.preventDefault();
        const taskInput = this.todoInput.value;
        if (taskInput === "") {
            alert("ERROR - no empty task is allowed");
            return;
            // TODO improve error handling in the pokemon client
        } else if (
            taskInput === POKEMON_ID_ZERO ||
            taskInput > TOP_EDGE_POKEMON_ID
        ) {
            itemManager.addTask("Learn Pokemon's ID");
        } else if (!isNaN(taskInput)) {
            if (!taskInput.trim()) {
                alert("Input space error");
                return;
            }
            await pokemonClient.getPokemonNameById(taskInput);
            itemManager.addTask(`catch ${pokemonClient.pokemonNames}`); // pokemonName will also work with [0] indexing
        } else if (taskInput.includes(",")) {
            // This const assignment handle input like "1,1, 2,3,4":
            // 1. remove spaces: "1,1,2,3,4"
            // 2. split to new array: [1,1,2,3,4]
            // 3. remove duplicate: [1,2,3,4]
            const pokemonIds = [
                ...new Set(taskInput.replace(/\s/g, "").split(",")),
            ];
            await pokemonClient.catchThemAll(pokemonIds);
            pokemonClient.pokemonNames.forEach((pokemon) => {
                itemManager.addTask(`catch ${pokemon}`);
            });
        } else {
            itemManager.addTask(taskInput);
        }
        this.renderTasks();
        // clearing the input:
        this.todoInput.value = "";
    };

    createTodoDiv = async (todoInput) => {
        const newTodoDiv = document.createElement("div");
        newTodoDiv.classList.add("todo");
        newTodoDiv.appendChild(this.createTodoTitle(todoInput));
        // add pokemon img element:
        if (todoInput.split(" ")[0] === "catch") {
            const pokemonImage = await this.createPokemonSprit(
                todoInput.split(" ")[1]
            );
            newTodoDiv.append(pokemonImage);
        }
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

    createPokemonSprit = async (pokemonName) => {
        const newImg = document.createElement("img");
        newImg.src = await pokemonClient.getPokemonImgByName(pokemonName);
        if (newImg.src === "") {
            newImg.alt = `${pokemonName} sprit`;
            newImg.style = "width:50px;height:50px;";
            return newImg;
        }
    };

    deleteOrCompleteTask = (event) => {
        const item = event.target;
        if (item.classList[0] === "trash-button") {
            const todo = item.parentElement;
            todo.classList.add("fall");
            setTimeout(() => {
                itemManager.removeTask(todo.childNodes[0].innerHTML);
                todo.remove();
                // this.renderTasks() //comment out because of performance.
                // The readme file says to render again from the array after each delete,
                // my logic delete the dom element so no need to re-render.
            }, 500);
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

    catchChangesInTodoElements = (mutationsList) => {
        for (const mutation of mutationsList) {
            if (["childList", "attributes"].includes(mutation.type)) {
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

    clearAllTasks = () => {
        const allTodos = document.querySelectorAll(".todo");
        allTodos.forEach((task) => {
            task.classList.add("fall");
            setTimeout(() => {
                task.remove();
            }, 500);
        });
        itemManager.clearAllTasks();
    };

    pingServer = async () => {
        const ans = await fetch("http://localhost:3700/health");
        const msg = await ans.json()
        console.log(msg);
    };

    init() {
        //SELECTORS:
        this.todoInput = document.querySelector(TODO_INPUT_CLASS);
        this.todoButton = document.querySelector(TODO_BUTTON_CLASS);
        this.todoList = document.querySelector(TODO_LIST_CLASS);
        this.todos = this.todoList.childNodes;
        this.clearAllButton = document.querySelector(CLEAR_BUTTON_CLASS);
        this.healthCheckButton = document.querySelector(HEALTH_CHECK_BUTTON_ID);
        this.filterOption = document.querySelector(FILTER_CLASS);
        this.pendingCounter = document.querySelector(COUNTER_CLASS);

        //Event listeners:
        this.todoButton.onclick = this.addTodo;
        this.todoList.onclick = this.deleteOrCompleteTask;
        this.clearAllButton.onclick = this.clearAllTasks;
        this.filterOption.onclick = this.filterTodo;
        this.healthCheckButton.onclick = this.pingServer;

        // Updating pending message on each task change(className or new item):
        const config = { attributes: true, childList: true, subtree: true };
        const observer = new MutationObserver(this.catchChangesInTodoElements);
        observer.observe(this.todoList, config);
    }
}

const main = new Main();
const itemManager = new ItemManager();
const pokemonClient = new PokemonClient();

document.addEventListener("DOMContentLoaded", function () {
    // you should create an `init` method in your class
    // the method should add the event listener to your "add" button
    main.init();
});
