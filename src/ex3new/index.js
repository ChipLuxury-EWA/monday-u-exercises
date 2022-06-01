#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

program.name("Todo App V2").description("The best Todo app!").version("2.0.0");




program.parse();
