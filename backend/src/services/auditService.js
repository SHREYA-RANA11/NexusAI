const Decision = require("../models/Decision");
const ReconciledDecision = require("../models/ReconciledDecision");
const DriftHistory = require("../models/DriftHistory");

const generateAudit = async (caseId) => {
  // Load all decisions for this case
  const decisions = await Decision.find({ caseId }).sort({ timestamp: 1 });

  if (!decisions.length) {
    return null;
  }

  // Load reconciled decision
  const reconciled = await ReconciledDecision.findOne({ caseId });

  // Load latest drift information
  const latestDrift = await DriftHistory.findOne({
    modelName: decisions[0].modelName,
  }).sort({ createdAt: -1 });

  // Build audit object
  const audit = {
    caseId,

    inputDecisions: decisions.map((d) => ({
      model: d.modelName,
      decision: d.decision,
      confidence: d.confidence,
      timestamp: d.timestamp,
    })),

    driftFlag: latestDrift ? latestDrift.driftDetected : false,

    jsDivergence: latestDrift ? latestDrift.jsDivergence : 0,

    threshold: latestDrift ? latestDrift.threshold : 0.3,

    resolutionLogic: reconciled
      ? reconciled.resolutionReason
      : "No reconciliation available",

    winningModel: reconciled ? reconciled.winningModel : null,

    finalDecision: reconciled ? reconciled.finalDecision : null,

    auditVersion: reconciled ? reconciled.auditVersion : 1,

    reconciledAt: reconciled ? reconciled.reconciledAt : null,

    generatedAt: new Date(),
  };

  return audit;
};

module.exports = {
  generateAudit,
};