const express = require("express");
const router = express.Router();
const Item = require("../models/Task");

// Get all items
router.get("/", async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create a new item
router.post("/", async (req, res) => {
    try {
        const item = new Item({
            title: req.body.title
        });
        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        console.error("Error saving item:", error);
        res.status(400).json({ message: error.message });
    }
});

// Update an item
router.put("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            item.title = req.body.title || item.title;
            item.completed = req.body.completed !== undefined ? req.body.completed : item.completed;
            
            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete an item
router.delete("/:id", async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (item) {
            await item.deleteOne();
            res.json({ message: "Item deleted" });
        } else {
            res.status(404).json({ message: "Item not found" });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router; 
