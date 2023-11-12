const express = require("express");
const requireAuth = require("../middleware/requireAuth");

const {getBid} = require("../controllers/bidController")

// controller functions
const { createBid } = require("../controllers/bidController");

const router = express.Router();

router.post("/", requireAuth, createBid);

router.get("/", getBid);

module.exports = router;
