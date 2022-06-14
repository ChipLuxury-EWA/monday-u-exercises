// Express boilerplate, hosting the `dist` file, connecting to the routes
import express from "express";
import cors from "cors";
import path from "path";
import { setFolderAndFile } from "./services/item_manager.js";
import { fileURLToPath } from "url";

import dotenv from "dotenv";
import routes from "./routes/api.js";

dotenv.config();
setFolderAndFile("tasks", "task")

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.use(cors());

console.log(__dirname + "/../dist");
app.use("/", routes); // v1 api routes
app.use("/front", express.static(__dirname + "/../dist"));

const port = process.env.PORT;
app.listen(port, () => {
    console.log("Server is up and running on port:", port);
});
