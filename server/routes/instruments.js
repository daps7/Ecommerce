const express = require("express");
const router = express.Router();
const instrumentsModel = require("../models/instruments");

// Read all records
router.get("/instruments", async (req, res) => {
    try {
        const instruments = await instrumentsModel.find(); // Use async/await
        res.json(instruments);
    } catch (error) {
        console.error("Error fetching instruments:", error);
        res.status(500).json({ error: error.message });
    }
});

// Read one record
router.get("/instruments/:id", async (req, res) => {
    try {
        const instrument = await instrumentsModel.findById(req.params.id);
        if (!instrument) return res.status(404).json({ error: "Instrument not found" });
        res.json(instrument);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Add new record
router.post("/instruments", async (req, res) => {
    try {
        const newInstrument = await instrumentsModel.create(req.body);
        res.status(201).json(newInstrument);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Update one record
router.put("/instruments/:id", async (req, res) => {
    try {
        const updatedInstrument = await instrumentsModel.findByIdAndUpdate(
            req.params.id,
            { $set: req.body },
            { new: true }
        );
        if (!updatedInstrument) return res.status(404).json({ error: "Instrument not found" });
        res.json(updatedInstrument);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Delete one record
router.delete("/instruments/:id", async (req, res) => {
    try {
        const deletedInstrument = await instrumentsModel.findByIdAndDelete(req.params.id);
        if (!deletedInstrument) return res.status(404).json({ error: "Instrument not found" });
        res.json(deletedInstrument);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
