import {
    readFileLineByLine,
    folderAndFileInit,
    addNewLine,
    reWriteFile,
} from "mondayu-logger-tom-portugez";

import { PokemonClient } from "./pokemonClient.js";
const pokemonClient = new PokemonClient();

import dotenv from "dotenv";
dotenv.config();

export const setFolderAndFile = async (folder, file) => {
    folderAndFileInit(folder, file);
};

const addNewTask = async (newTask) => {
    addNewLine(process.env.FOLDER_NAME, process.env.FILE_NAME, newTask);
};

export const handleInput = async (cliInput) => {
    if (!isNaN(cliInput)) {
        pokemonIdInput(cliInput);
    } else if (cliInput.includes(",")) {
        multiPokemonIds(cliInput)
    } else {
        addNewTask(cliInput);
    }
};

const pokemonIdInput = async (cliInput) => {
    if (!cliInput.trim()) {
        console.log("Input space error");
        return;
    }
    await pokemonClient.getPokemonNameById(cliInput);
    addNewTask(`catch ${pokemonClient.pokemonNames}`); // pokemonName will also work with [0] indexing
};

const multiPokemonIds = async (cliInput) => {
    // This const assignment handle input like "1,1, 2,3,4":
    // 1. remove spaces: "1,1,2,3,4"
    // 2. split to new array: [1,1,2,3,4]
    // 3. remove duplicate: [1,2,3,4]
    const pokemonIds = [...new Set(cliInput.replace(/\s/g, "").split(","))];
    await pokemonClient.catchThemAll(pokemonIds);
    pokemonClient.pokemonNames.forEach((pokemon) => {
        addNewTask(`catch ${pokemon}`);
    });
};

export const readAndPrintAllTodos = async () => {
    const todos = await readFileLineByLine(
        process.env.FOLDER_NAME,
        process.env.FILE_NAME
    );
    todos.forEach((todo, index) => {
        todo && console.log(`${index + 1})\t${todo}.`);
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
