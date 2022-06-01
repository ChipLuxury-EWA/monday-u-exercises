import {
    readFileLineByLine,
    folderAndFileInit,
    addNewLine,
    reWriteFile,
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

export const deleteTodo = async (todoNumber) => {
    const index = todoNumber - 1;
    const file = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    if (todoNumber > file.length) {
        console.log(`error - incorrect index`);
        return;
    } else {
        console.log(`Deleting task #${todoNumber}: ${file[index]}`);
        file.splice(index, 1);
        await reWriteFile(
            process.env.FOLDER_NAME,
            process.env.FILE_NAME,
            file.join("\n")
        );
        readAndPrintAllTodos();
    }
};
