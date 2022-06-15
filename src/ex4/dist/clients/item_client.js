// Create an ItemClient class here. This is what makes requests to your express server (your own custom API!)

const url = "http://localhost:3700/task";

export const getAllTasks = async () => {
    const ans = await fetch(url);
    const foo = await ans.json();
    return foo;
};


