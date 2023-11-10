const express = require("express");
const requireAuth = require("../middleware/requireAuth");

// controller functions
const { createBid } = require("../controllers/bidController");

const router = express.Router();

router.post("/", requireAuth, createBid);

module.exports = router;
