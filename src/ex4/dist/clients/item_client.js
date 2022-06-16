// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const url = "http://localhost:3700/task";

export const getAllTasks = async () => {
    const ans = await fetch(url);
    const foo = await ans.json();
    return foo;
};

export const deleteTask = async (id) => {
    const ans = await fetch(`${url}/${id}`, { method: "DELETE" });
    if (ans.status === 200) {
        return true;
    } else {
        return false;
    }
};

export const addTask = async (taskTitle) => {
    console.log(taskTitle);
    const ans = await fetch(`${url}`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: `${taskTitle}` }),
    });
    if (ans.status === 200) {
        return true;
    } else {
        return false;
    }
};
