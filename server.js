const express = require("express");
const path = require("path");
const api = require("./server/routes/api");
const dotenv = require('dotenv');

dotenv.config()
process.env.PWD = process.cwd()


const main = async () => {
    const app = express();
    app.use(express.json());

    app.use(express.static(path.join(process.env.PWD+ "/client/build")));
    app.use("/", api);

    const port = process.env.PORT || "3042";
    app.listen(port, function () {
        console.log("Running on " + port);
    });
};

main();
