import { getAllTasks } from "./clients/item_client.js";

export class ItemManager {
    constructor() {
        this.tasksArray = [];
    }
    clearAllTasks = () => {
        this.tasksArray = [];
    };

    removeTask = (task) => {};

    addTask = (task) => {
        if (this.tasksArray.includes(task)) {
            alert(`You already have a task to ${task}!`);
        } else {
            this.tasksArray.push(task);
        }
    };

    getAll = async () => {
        const tasks = await getAllTasks();
        this.tasksArray = tasks;
    };
}
