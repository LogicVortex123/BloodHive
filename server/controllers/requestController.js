const EmergencyRequest = require("../models/EmergencyRequest");

const createRequest = async (req, res) => {
    try {

        const {
            patientName,
            bloodGroup,
            unitsRequired,
            hospitalName,
            city,
            contactNumber,
            urgency,
            message,
        } = req.body;

        if (
            !patientName ||
            !bloodGroup ||
            !unitsRequired ||
            !hospitalName ||
            !city ||
            !contactNumber
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all required fields",
            });
        }

        const request = await EmergencyRequest.create({
            patientName,
            bloodGroup,
            unitsRequired,
            hospitalName,
            city,
            contactNumber,
            urgency,
            message,
            createdBy: req.user._id,
        });

        res.status(201).json({
            success: true,
            message: "Emergency request created successfully",
            request,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

const getAllRequests = async (req, res) => {

    try {

        const requests = await EmergencyRequest.find()
            .populate("createdBy", "fullName email phone")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            requests,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const getMyRequests = async (req, res) => {

    try {

        const requests = await EmergencyRequest.find({
            createdBy: req.user._id,
        }).sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            count: requests.length,
            requests,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const updateRequestStatus = async (req, res) => {

    try {

        const request = await EmergencyRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        if (request.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        request.status = req.body.status || request.status;

        await request.save();

        res.status(200).json({
            success: true,
            message: "Request updated successfully",
            request,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

const deleteRequest = async (req, res) => {

    try {

        const request = await EmergencyRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Request not found",
            });
        }

        if (request.createdBy.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized",
            });
        }

        await request.deleteOne();

        res.status(200).json({
            success: true,
            message: "Request deleted successfully",
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    createRequest,
    getAllRequests,
    getMyRequests,
    updateRequestStatus,
    deleteRequest,
};