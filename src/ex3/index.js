import { myLogger, readLog } from "mondayu-logger-tom-portugez";
import { Command } from "commander";
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
    });

program
    .command("get")
    .description("Get all your task")
    .action(async () => {
        console.log("getting all of your todos:");
        try {
            console.log(await readLog(), "\n^^ all your todos ^^");
        } catch (error) {
            console.log(`error fetching all of your todos -- see error logos`);
            myLogger.error("error fetching all todos\n\n", error, "\n");
        }
    });

program
    .command("delete")
    .description("Delete specific task by index")
    .argument("<number>", "Task index from the list")
    .action((index) => {
        console.log(`Deleting title number ${index}`);
    });

const addTodo = (userInput) => {
    if (!isNaN(userInput)) {
        const pokemonName = pokemonClient.getPokemonNameById(userInput);
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
