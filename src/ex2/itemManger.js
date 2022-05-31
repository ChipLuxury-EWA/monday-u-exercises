export class ItemManager {
    constructor() {
        this.tasksArray = [];
    }
    clearAllTasks = () => {
        this.tasksArray = [];
    };

    removeTask = (task) => {
        const index = this.tasksArray.indexOf(task);
        if (index > -1) {
            this.tasksArray.splice(index, 1);
        }
    };

    addTask = (task) => {
        if (this.tasksArray.includes(task)) {
            alert(`You already have a task to ${task}!`);
        } else {
            this.tasksArray.push(task);
        }
    };
}
