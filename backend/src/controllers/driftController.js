const DriftHistory = require("../models/DriftHistory");

const getLatestDrift = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const modelName = req.query.modelName;

    const filter = {};

    if (modelName) {
      filter.modelName = modelName;
    }

    const skip = (page - 1) * limit;

    const [records, total] = await Promise.all([
      DriftHistory.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),

      DriftHistory.countDocuments(filter),
    ]);

    return res.status(200).json({
      success: true,
      data: records,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getLatestDrift,
};