const User = require("../models/User");
const EmergencyRequest = require("../models/EmergencyRequest");

const getDashboardStats = async (req, res) => {
    try {

        const totalDonors = await User.countDocuments();

        const availableDonors = await User.countDocuments({
            availability: true,
        });

        const activeRequests = await EmergencyRequest.countDocuments({
            status: "Active",
        });

        const completedRequests = await EmergencyRequest.countDocuments({
            status: "Completed",
        });

        const myRequests = await EmergencyRequest.countDocuments({
            createdBy: req.user._id,
        });

        const latestRequests = await EmergencyRequest.find()
            .populate("createdBy", "fullName")
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            success: true,
            stats: {
                totalDonors,
                availableDonors,
                activeRequests,
                completedRequests,
                myRequests,
            },
            latestRequests,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    getDashboardStats,
};