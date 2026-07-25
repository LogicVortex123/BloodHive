const mongoose = require("mongoose");

const emergencyRequestSchema = new mongoose.Schema(
    {
        patientName: {
            type: String,
            required: true,
            trim: true,
        },

        bloodGroup: {
            type: String,
            required: true,
        },

        unitsRequired: {
            type: Number,
            required: true,
        },

        hospitalName: {
            type: String,
            required: true,
            trim: true,
        },

        city: {
            type: String,
            required: true,
            trim: true,
        },

        contactNumber: {
            type: String,
            required: true,
        },

        urgency: {
            type: String,
            enum: ["Low", "Medium", "High", "Critical"],
            default: "High",
        },

        message: {
            type: String,
            default: "",
        },

        status: {
            type: String,
            enum: ["Active", "Completed"],
            default: "Active",
        },

        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model(
    "EmergencyRequest",
    emergencyRequestSchema
);