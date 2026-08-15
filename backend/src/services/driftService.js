const DriftHistory = require("../models/DriftHistory");

const getDriftHistory = async (page = 1, limit = 10) => {
    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
        DriftHistory.find()
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),

        DriftHistory.countDocuments(),
    ]);

    return {
        records,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
    };
};

module.exports = {
    getDriftHistory,
};