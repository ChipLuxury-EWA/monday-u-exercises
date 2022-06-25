class ItemClient {
    getItems = async () => {
        const response = await fetch("/items");
        const todos = await response.json();
        return todos;
    };

    postItem = async (item) => {
        await fetch("/item", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ taskName: item }),
        });
    };

    updateItem = async (item) => {
        
        const bodyMessage = {};
        bodyMessage.id = item.id;
        bodyMessage.status = !item.status;
        if (!item.status) bodyMessage.done = new Date(); // send done date just when mark task done (*false* -> true)
        bodyMessage.taskName = item.taskName

        await fetch("/item", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(bodyMessage),
        });
    };

    deleteItem = async (item) => {
        await fetch("/item", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: item.id }),
        });
    };
}
