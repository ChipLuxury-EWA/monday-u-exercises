export class ItemManager {
    constructor() {
        this.tasksArray = [];
    }
    clearAllTasks = () => {
        this.tasksArray = []
    }

    removeTask = (task) => {
        const index = this.tasksArray.indexOf(task)
        if (index > -1) {
            this.tasksArray.splice(index, 1)
        }
    }

    addTask = (task) => {
        this.tasksArray.push(task);
    }

    fetchPokemon = (id) => {
        // call pokemon client and get 'catch pokeName'
    }
}
