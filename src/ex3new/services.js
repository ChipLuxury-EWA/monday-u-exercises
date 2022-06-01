import {
    readFileLineByLine,
    folderAndFileInit,
    addNewLine,
} from "mondayu-logger-tom-portugez";

import dotenv from "dotenv";
dotenv.config();

export const setFolderAndFile = async (folder, file) => {
    folderAndFileInit(folder, file);
};

export const addNewTask = async (newTask) => {
    addNewLine(process.env.FOLDER_NAME, process.env.FILE_NAME, newTask);
};

export const readAndPrintAllTodos = async () => {
    const todos = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    todos.forEach((todo, index) => {
        todo && console.log(`${index + 1}) ${todo}.`);
    });
};
