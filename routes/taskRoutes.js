const express = require("express");
const router = express.Router();
const Item = require("../models/Item"); // Ensure you have a corresponding Item model

// Get all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Add a new item
router.post("/", async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

module.exports = router;
