#!/usr/bin/env node
import dotenv from "dotenv";
import { Command } from "commander";
import { folderAndFileInit, addNewLine } from "mondayu-logger-tom-portugez";

dotenv.config();
const program = new Command();

program.name("Todo App V2").description("The best Todo app!").version("2.0.0");

program
    .command("init")
    .description("set directory name and necessary file name")
    .option("-d, --directory <string>", "set directory name", "task_files")
    .option("-f, --file <string>", "set file name", "tasks")
    .action((options) => {
        folderAndFileInit(options.directory, options.file);
    });

program
    .command("add")
    .description("Add a new task, or enter id to catch pokemon")
    .argument("<string or number>", "task title, or id of pokemon")
    .action((cliInput) => {
        addNewLine(process.env.FOLDER_NAME, process.env.FILE_NAME, cliInput);
    });

program
    .command("get")
    .description("Get all your task, or specified task")
    .option(
        "-t, --taskNumber <number>",
        "Get specified task by task number",
        "1"
    )
    .action((options) => {
        console.log("getting all of your tasks");
        console.log(`getting task #${options.taskNumber}`);
    });

program
    .command("delete")
    .description("Delete specific task by index")
    .argument("task <number>", "Todo number from the list")
    .action((cliInput) => {
        console.log(`Deleting task #${cliInput}`);
    });

program.parse(process.argv);
