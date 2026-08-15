const mongoose = require('mongoose');

const driftHistorySchema = new mongoose.Schema({
    modelName: {
        type: String,
        required: true,
        index: true
    },
    windowStart: {
        type: Date,
        required: true
    },
    windowEnd: {
        type: Date,
        required: true
    },
    jsDivergence: {
        type: Number,
        required: true
    },
    threshold: {
        type: Number,
        required: true
    },
    driftDetected: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const DriftHistory = mongoose.model('DriftHistory', driftHistorySchema);

module.exports = DriftHistory;
