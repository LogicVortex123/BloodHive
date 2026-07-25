const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
    createRequest,
    getAllRequests,
    getMyRequests,
    updateRequestStatus,
    deleteRequest,
} = require("../controllers/requestController");

router.get("/", getAllRequests);

router.post("/", protect, createRequest);

router.get("/my", protect, getMyRequests);

router.put("/:id", protect, updateRequestStatus);

router.delete("/:id", protect, deleteRequest);

module.exports = router;