const express = require("express");
const router = express.Router();
const itemManager = require("../services/item_manager");

router.get("/items", async (req, res) => {
    res.send(await itemManager.getItems());
});

router.post("/item", async (req, res) => {
    res.send(await itemManager.handleItem(req.body));
});

router.put("/item", async (req, res) => {
    res.send(await itemManager.updateItem(req.body));
});

router.delete("/item", async (req, res) => {
    res.send(await itemManager.deleteItem(req.body));
});

module.exports = router;
