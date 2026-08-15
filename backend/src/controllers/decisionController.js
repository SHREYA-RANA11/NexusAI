const decisionService = require('../services/decisionService');
const { success, error } = require('../utils/response');

const postDecision = async (req, res, next) => {
    try {
        const result = await decisionService.saveDecision(req.body);
        if (result.duplicate) {
            return error(res, 'Decision with this eventId already exists', 409);
        }
        return success(res, result.decision, 201);
    } catch (err) {
        next(err);
    }
};

const getDecisions = async (req, res, next) => {
    try {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const result = await decisionService.getDecisions(page, limit);
        return success(res, result);
    } catch (err) {
        next(err);
    }
};

const getHistory = async (req, res, next) => {
    try {
        const { caseId } = req.params;
        const decisions = await decisionService.getDecisionsByCaseId(caseId);
        return success(res, decisions);
    } catch (err) {
        next(err);
    }
};

const getReconciledDecision = async (req, res, next) => {
    try {
        const { caseId } = req.params;
        const ReconciledDecision = require('../models/ReconciledDecision');
        const reconciled = await ReconciledDecision.findOne({ caseId });
        if (!reconciled) {
            return res.status(404).json({ error: 'No reconciliation found' });
        }
        return res.json({
            caseId: reconciled.caseId,
            finalDecision: reconciled.finalDecision,
            winningModel: reconciled.winningModel,
            winningConfidence: reconciled.winningConfidence,
            resolutionReason: reconciled.resolutionReason,
            auditVersion: reconciled.auditVersion,
            reconciledAt: reconciled.reconciledAt
        });
    } catch (err) {
        next(err);
    }
};

const getAudit = async (req, res) => {
    return res.json({
        message: 'Audit module coming next'
    });
};

const getDrift = async (req, res) => {
    return res.json({
        message: 'Drift module coming next'
    });
};

module.exports = {
    postDecision,
    getDecisions,
    getHistory,
    getReconciledDecision,
    getAudit,
    getDrift
};
