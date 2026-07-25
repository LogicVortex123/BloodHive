const User = require("../models/User");

const getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const updateProfile = async (req, res) => {
    try {

        const {
            bloodGroup,
            phone,
            age,
            gender,
            city,
            state,
            lastDonationDate,
            availability
        } = req.body;

        const user = await User.findById(req.user._id);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        if (bloodGroup !== undefined) {
            user.bloodGroup = bloodGroup;
        }

        if (phone !== undefined) {
            user.phone = phone;
        }

        if (age !== undefined) {
            user.age = age;
        }

        if (gender !== undefined) {
            user.gender = gender;
        }

        if (city !== undefined) {
            user.city = city;
        }

        if (state !== undefined) {
            user.state = state;
        }

        if (lastDonationDate !== undefined) {
            user.lastDonationDate = lastDonationDate;
        }

        if (availability !== undefined) {
            user.availability = availability;
        }

        await user.save();

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user: {
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                bloodGroup: user.bloodGroup,
                phone: user.phone,
                age: user.age,
                gender: user.gender,
                city: user.city,
                state: user.state,
                lastDonationDate: user.lastDonationDate,
                availability: user.availability
            }
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

const searchDonors = async (req, res) => {
    try {

        const {
            bloodGroup,
            city,
            availability
        } = req.query;

        let query = {};

        if (bloodGroup) {
            query.bloodGroup = bloodGroup;
        }

        if (city) {
            query.city = {
                $regex: city,
                $options: "i"
            };
        }

        if (availability !== undefined) {

            if (availability === "true") {
                query.availability = true;
            }

            if (availability === "false") {
                query.availability = false;
            }
        }

        let donors = await User.find(query)
            .select("-password");

        donors.sort((a, b) => {

            if (a.availability !== b.availability) {
                return b.availability - a.availability;
            }

            if (city) {

                const requestedCity = city.toLowerCase();

                const aSameCity =
                    a.city &&
                    a.city.toLowerCase() === requestedCity;

                const bSameCity =
                    b.city &&
                    b.city.toLowerCase() === requestedCity;

                if (aSameCity !== bSameCity) {
                    return bSameCity - aSameCity;
                }
            }

            return 0;
        });

        res.status(200).json({
            success: true,
            total: donors.length,
            filters: {
                bloodGroup: bloodGroup || null,
                city: city || null,
                availability:
                    availability !== undefined
                        ? availability
                        : null
            },
            donors
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }
};


module.exports = {
    getProfile,
    updateProfile,
    searchDonors
};