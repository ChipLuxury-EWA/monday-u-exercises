#!/usr/bin/env node
import { Command } from "commander";
import {
    addNewTask,
    setFolderAndFile,
} from "./services.js";
import {readFileLineByLine} from 'mondayu-logger-tom-portugez'

const program = new Command();

program.name("Todo App V2").description("The best Todo app!").version("2.0.0");

program
    .command("init")
    .description("set directory name and necessary file name")
    .option("-d, --directory <string>", "set directory name", "task_files")
    .option("-f, --file <string>", "set file name", "tasks")
    .action((options) => {
        setFolderAndFile(options.directory, options.file);
    });

program
    .command("add")
    .description("Add a new task, or enter id to catch pokemon")
    .argument("<string or number>", "task title, or id of pokemon")
    .action((cliInput) => {
        addNewTask(cliInput);
    });

program
    .command("get")
    .description("Get all your task, or specified task")
    .action(() => {
        readAndPrintAllTodos();
    });

program
    .command("delete")
    .description("Delete specific task by index")
    .argument("task <number>", "Todo number from the list")
    .action((cliInput) => {
        console.log(`Deleting task #${cliInput}`);
    });

const readAndPrintAllTodos = async () => {
    const todos = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    todos.forEach((todo, index) => {
        todo && console.log(`${index + 1}) ${todo}.`);
    });
};

program.parse(process.argv);
