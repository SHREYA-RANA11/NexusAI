const mongoose = require('mongoose');

const decisionSchema = new mongoose.Schema({
    caseId: {
        type: String,
        required: true,
        index: true
    },
    inputText: {
        type: String,
        required: true
    },
    modelName: {
        type: String,
        required: true,
        index: true
    },
    decision: {
        type: String,
        required: true
    },
    confidence: {
        type: Number,
        required: true,
        min: 0,
        max: 1
    },
    timestamp: {
        type: Date,
        required: true
    },
    modelVersion: {
        type: String,
        required: true
    },
    trainingDate: {
        type: Date
    },
    historicalAccuracy: {
        type: Number
    },
    eventId: {
        type: String,
        required: true,
        unique: true
    },
    auditVersion: {
        type: Number,
        default: 1
    },
    isDuplicate: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

const Decision = mongoose.model('Decision', decisionSchema);

module.exports = Decision;
