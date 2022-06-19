const express = require('express');
const router = express.Router();
const itemManager = require('../services/item_manager');

router.get('/items', async (req, res) => {
    res.send(await itemManager.getItems())
})

router.post('/item', async (req, res) => {
    await itemManager.handleItem(req.body)
    res.end()
})

router.delete('/item', (req, res) => {
    itemManager.deleteItem(req.body.item)
    res.end()
})

module.exports = router