const express = require("express");
const Visitor = require("../models/Visitor");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create visitor - PUBLIC
router.post("/", async (req, res) => {
  try {
    const visitor = await Visitor.create(req.body);

    res.status(201).json({
      message: "Visitor saved successfully",
      visitor
    });
  } catch (error) {
    res.status(400).json({
      message: "Visitor save failed",
      error: error.message
    });
  }
});

// Get visitors - ADMIN ONLY
router.get("/", authMiddleware, async (req, res) => {
  try {
    const visitors = await Visitor.find().sort({ createdAt: -1 });

    res.json(visitors);
  } catch (error) {
    res.status(500).json({
      message: "Visitors fetch failed",
      error: error.message
    });
  }
});

// Mark exit - ADMIN ONLY
router.put("/:id/exit", authMiddleware, async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndUpdate(
      req.params.id,
      {
        status: "Exited",
        exitTime: new Date()
      },
      { new: true }
    );

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found"
      });
    }

    res.json({
      message: "Visitor exit recorded successfully",
      visitor
    });
  } catch (error) {
    res.status(500).json({
      message: "Exit update failed",
      error: error.message
    });
  }
});

// Delete visitor - ADMIN ONLY
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const visitor = await Visitor.findByIdAndDelete(req.params.id);

    if (!visitor) {
      return res.status(404).json({
        message: "Visitor not found"
      });
    }

    res.json({
      message: "Visitor deleted successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Visitor delete failed",
      error: error.message
    });
  }
});

module.exports = router;