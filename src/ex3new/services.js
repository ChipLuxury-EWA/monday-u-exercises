import {
    readFileLineByLine,
    folderAndFileInit,
    addNewLine,
    reWriteFile,
} from "mondayu-logger-tom-portugez";
import chalk from "chalk";
import dotenv from "dotenv";
import { PokemonClient } from "./pokemonClient.js";
import inquirer from "inquirer";

dotenv.config();
const pokemonClient = new PokemonClient();

export const setFolderAndFile = async (folder, file) => {
    folderAndFileInit(folder, file);
};

const addNewTask = (newTask) => {
    console.log(chalk.bgCyan(`Adding ${newTask} to task list`));
    addNewLine(process.env.FOLDER_NAME, process.env.FILE_NAME, newTask);
};

export const handleInput = async (cliInput, printPokemon) => {
    if (!isNaN(cliInput)) {
        pokemonIdInput(cliInput, printPokemon);
    } else if (cliInput.includes(",")) {
        multiPokemonIds(cliInput, printPokemon);
    } else {
        addNewTask(cliInput);
    }
};

const pokemonIdInput = async (cliInput, printPokemon) => {
    if (!cliInput.trim()) {
        console.log(chalk.bgRed.black("Input space error"));
        return;
    }
    await pokemonClient.getPokemonNameById(cliInput);
    console.log(
        chalk.bgWhiteBright.red(
            `A wild ${pokemonClient.pokemonNames} appeared...`
        )
    );
    printPokemon && pokemonClient.printPokemonAscii(cliInput);
    addNewTask(`catch ${pokemonClient.pokemonNames}`); // pokemonName will also work with [0] indexing
};

const multiPokemonIds = async (cliInput, printPokemon) => {
    console.log(chalk.bgWhiteBright.red(`Catching Them All`));

    // This const assignment handle input like "1,1, 2,3,4":
    // 1. remove spaces: "1,1,2,3,4"
    // 2. split to new array: [1,1,2,3,4]
    // 3. remove duplicate: [1,2,3,4]
    const pokemonIds = [...new Set(cliInput.replace(/\s/g, "").split(","))];
    await pokemonClient.catchThemAll(pokemonIds);
    pokemonClient.pokemonNames.forEach((pokemon) => {
        addNewTask(`catch ${pokemon}`);
        printPokemon && pokemonClient.printPokemonAscii(pokemon);
    });
};

export const readAndPrintAllTodos = async () => {
    console.log(chalk.bgBlue.underline.white(`Getting all of your todos:`));
    const todos = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    todos.forEach((todo, index) => {
        todo && console.log(`${index + 1})\t${todo}.`);
    });
};

export const printOneTaskWithStrikthrowLine = async (lineToDelete) => {
    const todos = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    todos.forEach((todo, index) => {
        if (index === lineToDelete) {
            todo && console.log(chalk.strikethrough(`${index + 1})\t${todo}.`));
        } else {
            todo && console.log(`${index + 1})\t${todo}.`);
        }
    });
};

export const deleteTodo = async (todoNumber) => {
    const index = todoNumber - 1;
    const file = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    if (todoNumber > file.length) {
        console.log(chalk.bgRed.black(`error - incorrect index`));
        return;
    } else {
        if (await deleteConfirmation(todoNumber, file[index])) {
            printOneTaskWithStrikthrowLine(index);
            file.splice(index, 1);
            await reWriteFile(
                process.env.FOLDER_NAME,
                process.env.FILE_NAME,
                file.join("\n")
            );
        }
    }
};

const deleteConfirmation = async (taskNumber, taskTitle) => {
    const answer = await inquirer.prompt({
        name: "userInput",
        type: "list",
        message: `Are you shore you want to ${chalk.bgYellow.black(
            "delete task #" + taskNumber + ":",
            taskTitle,
            "?",
        )}`,
        choices: ["Yes", "No"],
        default() {
            return false;
        },
    });
    if (answer.userInput === "Yes") {
        return true;
    } else {
        return false;
    }
};
