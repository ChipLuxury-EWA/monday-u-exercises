import express from "express";
import {
    readAndPrintAllTodos,
    handleInput,
    deleteTodo,
} from "../../services/item_manager.js";
//this route file import controller stuff
const router = express.Router();

router
    .route("/")
    .get(readAndPrintAllTodos)
    .post(handleInput)
    .put()
    .delete(deleteTodo);
    
router.
    route("/:id")
    .delete(deleteTodo);



export default router;
