const mongoose = require('mongoose');

const reconciledDecisionSchema = new mongoose.Schema({
    caseId: {
        type: String,
        required: true,
        index: true
    },
    finalDecision: {
        type: String,
        required: true
    },
    resolutionReason: {
        type: String,
        required: true
    },
    winningModel: {
        type: String
    },
    winningConfidence: {
        type: Number
    },
    reconciledAt: {
        type: Date,
        default: Date.now
    },
    auditVersion: {
        type: Number,
        default: 1
    }
});

const ReconciledDecision = mongoose.model('ReconciledDecision', reconciledDecisionSchema);

module.exports = ReconciledDecision;
