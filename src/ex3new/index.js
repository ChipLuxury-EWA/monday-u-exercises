#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program.name("Todo App V2").description("The best Todo app!").version("2.0.0");

program
    .command("add")
    .description("Add a new task, or enter id to catch pokemon")
    .argument("<string or number>", "task title, or id of pokemon")
    .action((cliInput) => {
        console.log(cliInput)
    });


program.parse();
