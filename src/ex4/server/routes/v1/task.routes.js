import express from "express";
import {
    readAndPrintAllTodos,
    handleInput,
} from "../../services/item_manager.js";
//this route file import controller stuff
const router = express.Router();

router.route("/").get(readAndPrintAllTodos).post(handleInput).put().delete();

export default router;
