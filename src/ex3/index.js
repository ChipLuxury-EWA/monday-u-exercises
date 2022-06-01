#!/usr/bin/env node
import {
    myLogger,
    readLog,
    readLogLineByLine,
    writeArrayOfLinesToLog,
} from "mondayu-logger-tom-portugez";
import { Command } from "commander";
import chalkAnimation from "chalk-animation";
import { createSpinner } from "nanospinner";
import chalk from "chalk";

import { PokemonClient } from "./services/pokemonClient.js";
import inquirer from "inquirer";

const program = new Command();

program.name("Todo App V2").description("The best Todo app!").version("1.0.0");

program
    .command("add")
    .description("Add a new task, or catch pokemon")
    .argument("<string>", "task title, or id of pokemon")
    .action((taskTitle) => {
        addTodo(taskTitle);
        readAndPrintAllTodos();
    });

program
    .command("get")
    .description("Get all your task")
    .action(() => {
        try {
            readAndPrintAllTodos();
        } catch (error) {
            console.log(error);
            console.log(`error fetching all of your todos -- see error logos`);
            myLogger.error("error fetching all todos\n\n", error, "\n");
        }
    });

program
    .command("delete")
    .description("Delete specific task by index")
    .argument("<number>", "Todo number from the list")
    .action((todoNumber) => {
        deleteTodo(todoNumber);
    });
////////////////////////////////
const deleteTodo = async (todoNumber) => {
    const index = todoNumber - 1;
    const file = await readLogLineByLine();
    if (todoNumber > file.length) {
        console.log(`error - incorrect index`);
        return;
    }
    printLineWithStrikeThrow(file, index);
    console.log(`deleting #${file[index]}`);
    file.splice(index, 1);
    await writeArrayOfLinesToLog(file);
    readAndPrintAllTodos();
};

const printLineWithStrikeThrow = (todosArray, index) => {
    todosArray.forEach((todo, i) => {
        if (i === index) {
            console.log(chalk.strikethrough(`${i + 1}) ${todo}.`));
        } else {
            console.log(`${i + 1}) ${todo}.`);
        }
    });
};

const readAndPrintAllTodos = async () => {
    const todos = await readLogLineByLine();
    printAllTodosFromArray(todos);
};

const printAllTodosFromArray = async (todosArray) => {
    todosArray.forEach((todo, index) => {
        todo && console.log(`${index + 1}) ${todo}.`);
    });
};

const addTodo = async (userInput) => {
    if (!isNaN(userInput)) {
        const pokemonName = await pokemonClient.getPokemonNameById(userInput);
        exportTaskToConsoleAndLog(`catch ${pokemonName}`);
    } else {
        exportTaskToConsoleAndLog(userInput);
    }
};

const exportTaskToConsoleAndLog = (taskTitle) => {
    myLogger.log(`${taskTitle}`);
    console.log(`adding a new task ${taskTitle}`);
};

const pokemonClient = new PokemonClient();

program.parse();
