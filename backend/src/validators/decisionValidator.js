const { error } = require('../utils/response');

const validateDecisionPost = (req, res, next) => {
    const { caseId, inputText, modelName, decision, confidence, timestamp } = req.body;
    const validationErrors = {};

    if (!caseId || typeof caseId !== 'string' || caseId.trim() === '') {
        validationErrors.caseId = 'caseId is required and must be a non-empty string';
    }

    if (!inputText || typeof inputText !== 'string' || inputText.trim() === '') {
        validationErrors.inputText = 'inputText is required and must be a non-empty string';
    }

    if (!modelName || typeof modelName !== 'string' || modelName.trim() === '') {
        validationErrors.modelName = 'modelName is required and must be a non-empty string';
    }

    if (!decision || typeof decision !== 'string' || decision.trim() === '') {
        validationErrors.decision = 'decision is required and must be a non-empty string';
    }

    if (confidence === undefined || typeof confidence !== 'number' || confidence < 0 || confidence > 1) {
        validationErrors.confidence = 'confidence is required and must be a number between 0 and 1';
    }

    if (!timestamp) {
        validationErrors.timestamp = 'timestamp is required';
    } else {
        const parsedDate = Date.parse(timestamp);
        if (isNaN(parsedDate)) {
            validationErrors.timestamp = 'timestamp must be a valid date string or timestamp';
        }
    }

    if (Object.keys(validationErrors).length > 0) {
        return error(res, 'Validation Error', 400, validationErrors);
    }

    next();
};

module.exports = {
    validateDecisionPost
};
