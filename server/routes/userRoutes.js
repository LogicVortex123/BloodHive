const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    getProfile,
    updateProfile,
    searchDonors,
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);

router.put("/profile", protect, updateProfile);

router.get("/donors", protect, searchDonors);

module.exports = router;