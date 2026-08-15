const Decision = require('../models/Decision');
const ReconciledDecision = require('../models/ReconciledDecision');

const selectWinningDecision = (decisions) => {
    const sorted = [...decisions].sort((a, b) => {
        if (b.confidence !== a.confidence) {
            return b.confidence - a.confidence;
        }

        if (a.trainingDate && b.trainingDate) {
            const dateA = new Date(a.trainingDate).getTime();
            const dateB = new Date(b.trainingDate).getTime();
            if (dateB !== dateA) {
                return dateB - dateA;
            }
        } else if (a.trainingDate && !b.trainingDate) {
            return -1;
        } else if (!a.trainingDate && b.trainingDate) {
            return 1;
        }

        const accA = a.historicalAccuracy || 0;
        const accB = b.historicalAccuracy || 0;
        if (accB !== accA) {
            return accB - accA;
        }

        return a.modelName.localeCompare(b.modelName);
    });

    const winner = sorted[0];
    let resolutionReason = 'Highest Confidence Win';

    if (decisions.length > 1) {
        const second = sorted[1];
        if (winner.confidence === second.confidence) {
            resolutionReason = 'Latest Training Date Tie-Breaker';

            const dateA = winner.trainingDate ? new Date(winner.trainingDate).getTime() : 0;
            const dateB = second.trainingDate ? new Date(second.trainingDate).getTime() : 0;
            if (dateA === dateB) {
                resolutionReason = 'Historical Accuracy Tie-Breaker';

                const accA = winner.historicalAccuracy || 0;
                const accB = second.historicalAccuracy || 0;
                if (accA === accB) {
                    resolutionReason = 'Deterministic Alphabetical Tie-Breaker';
                }
            }
        }
    }

    return {
        decision: winner.decision,
        modelName: winner.modelName,
        confidence: winner.confidence,
        resolutionReason
    };
};

const reconcileCase = async (caseId) => {
    const decisions = await Decision.find({ caseId });
    if (!decisions || decisions.length === 0) {
        return null;
    }

    let finalDecision = '';
    let winningModel = '';
    let winningConfidence = 0;
    let resolutionReason = '';

    const firstDecisionText = decisions[0].decision;
    const allAgree = decisions.every(d => d.decision === firstDecisionText);

    if (allAgree) {
        finalDecision = firstDecisionText;
        resolutionReason = 'Unanimous Agreement';

        const winner = selectWinningDecision(decisions);
        winningModel = winner.modelName;
        winningConfidence = winner.confidence;
    } else {
        const winner = selectWinningDecision(decisions);
        finalDecision = winner.decision;
        winningModel = winner.modelName;
        winningConfidence = winner.confidence;
        resolutionReason = winner.resolutionReason;
    }

    const reconciled = await ReconciledDecision.findOneAndUpdate(
        { caseId },
        {
            caseId,
            finalDecision,
            winningModel,
            winningConfidence,
            resolutionReason,
            reconciledAt: new Date()
        },
        { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    return reconciled;
};

module.exports = {
    reconcileCase
};
