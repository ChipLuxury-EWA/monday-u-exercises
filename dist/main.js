class Main {
    constructor() {
        this.itemClient = new ItemClient();
    }

    init = async () => {
        const addItemButton = document.getElementById("list-item-submit");
        addItemButton.addEventListener("click", this.handleItem);

        await this.renderItems();
    };

    handleItem = async () => {
        const input = document.getElementById("list-item-input");
        const inputValue = input.value;

        await this.itemClient.postItem(inputValue);
        await this.renderItems();
        input.value = "";
    };

    deleteItem = async (item) => {
        await this.itemClient.deleteItem(item);
        await this.renderItems();
    };

    updateItem = async (item) => {
        await this.itemClient.updateItem(item);
        await this.renderItems();
    };

    renderItems = async () => {
        const list = document.getElementById("list");
        list.innerHTML = "";

        const items = await this.itemClient.getItems();

        items.forEach((item, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("list-item");
            item.status
                ? listItem.classList.add("completed")
                : listItem.classList.remove("completed");
            listItem.innerHTML = `${index+1}) ${item.taskName}`;

            const listItemDeleteButton = this._createDeleteButton(item);
            const listItemUpdateButton = this._createUpdateButton(item);
            listItem.append(listItemDeleteButton, listItemUpdateButton);
            list.appendChild(listItem);
        });
    };

    _createDeleteButton = (item) => {
        const button = document.createElement("img");
        button.src = "./images/delete_icon.svg";
        button.classList.add("list-item-delete-button");
        button.addEventListener("click", (_) => this.deleteItem(item));

        return button;
    };

    _createUpdateButton = (item) => {
        const button = document.createElement("img");
        button.src = "./images/check_icon.svg";
        button.classList.add("list-item-update-button");
        button.addEventListener("click", (_) => this.updateItem(item));

        return button;
    };
}

const main = new Main();

document.addEventListener("DOMContentLoaded", function () {
    main.init();
});
