import { getAllTasks, deleteTask,addTask } from "./clients/item_client.js";

export class ItemManager {
    constructor() {
        this.tasksArray = [];
    }
    clearAllTasks = () => {
        this.tasksArray = [];
    };

    removeTask = async (task) => {
        return await deleteTask(task)
    };

    addTask = async (task) => {
        if (this.tasksArray.includes(task)) {
            // alert(`You already have a task to ${task}!`);
            return false
        } else {
            return await addTask(task)
        }
    };

    getAll = async () => {
        const tasks = await getAllTasks();
        this.tasksArray = tasks;
    };
}
