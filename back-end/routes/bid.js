const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// controller functions
const { getBid, createBid } = require("../controllers/bidController");

const router = express.Router();

router.post("/", requireAuth, createBid);

router.get("/:id", getBid);

module.exports = router;
