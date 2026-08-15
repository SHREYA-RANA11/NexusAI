const Decision = require('../models/Decision');
const conflictResolver = require('./conflictResolver');
const driftDetector = require("./driftDetector");

const saveDecision = async (decisionData) => {
    const { eventId, caseId } = decisionData;

    const existing = await Decision.findOne({ eventId });
    if (existing) {
        return { duplicate: true };
    }

    const decision = new Decision(decisionData);
    const saved = await decision.save();

    await conflictResolver.reconcileCase(caseId);
   await driftDetector.detectDrift(decisionData.modelName);
    return { duplicate: false, decision: saved };
};

const getDecisions = async (page = 1, limit = 10) => {
    const skipCount = (page - 1) * limit;
    const [items, total] = await Promise.all([
        Decision.find()
            .sort({ timestamp: -1 })
            .skip(skipCount)
            .limit(limit),
        Decision.countDocuments()
    ]);

    return {
        items,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
};

const getDecisionsByCaseId = async (caseId) => {
    return await Decision.find({ caseId }).sort({ timestamp: 1 });
};

module.exports = {
    saveDecision,
    getDecisions,
    getDecisionsByCaseId
};
