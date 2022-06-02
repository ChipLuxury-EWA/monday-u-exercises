#!/usr/bin/env node
import {
    deleteTodo,
    readAndPrintAllTodos,
    setFolderAndFile,
    handleInput,
} from "./services.js";
import { Command } from "commander";

const program = new Command();

program.name("Todo App V2").description("The best Todo app!").version("3.0.0");

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
    .option("-p, --printPokemon", "set this to true will print ascii-art of the pokemon", false)
    .action((cliInput, options) => {
        handleInput(cliInput, options.printPokemon);
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
    .argument("<number>", "Todo number from the list")
    .action((cliInput) => {
        deleteTodo(cliInput);
    });

program.parse(process.argv);
