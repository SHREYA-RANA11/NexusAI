const DriftHistory = require("../models/DriftHistory");
const Decision = require("../models/Decision");

const THRESHOLD = 0.3;

const detectDrift = async (modelName) => {
  const decisions = await Decision.find({ modelName })
    .sort({ timestamp: -1 })
    .limit(20);

  if (decisions.length < 10) {
    return null;
  }

  const current = decisions.slice(0, 10);
  const previous = decisions.slice(10, 20);

  const currentAvg =
    current.reduce((sum, d) => sum + d.confidence, 0) / current.length;

  const previousAvg =
    previous.reduce((sum, d) => sum + d.confidence, 0) / previous.length;

  const jsDivergence = Math.abs(currentAvg - previousAvg);

  const driftDetected = jsDivergence > THRESHOLD;

  const history = await DriftHistory.create({
    modelName,
    windowStart: previous[previous.length - 1].timestamp,
    windowEnd: current[0].timestamp,
    jsDivergence,
    threshold: THRESHOLD,
    driftDetected,
  });

  return history;
};

module.exports = {
  detectDrift,
};