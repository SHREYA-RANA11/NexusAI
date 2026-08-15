

const auditService = require("../services/auditService");
const driftService = require("../services/driftService");
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
const getAudit = async (req, res, next) => {
    try {

        const { caseId } = req.params;

        const audit = await auditService.generateAudit(caseId);

        if (!audit) {
            return res.status(404).json({
                success: false,
                message: "No audit found"
            });
        }

        return res.status(200).json({
            success: true,
            data: audit
        });

    } catch (err) {
        next(err);
    }
};

const getDrift = async (req, res, next) => {
    try {

        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 10;

        const result = await driftService.getDriftHistory(page, limit);

        return res.status(200).json({
            success: true,
            data: result.records,
            total: result.total,
            page: result.page,
            limit: result.limit,
            totalPages: result.totalPages
        });

    } catch (err) {
        next(err);
    }
};

module.exports = {
    postDecision,
    getDecisions,
    getHistory,
    getReconciledDecision,
    getAudit,
    getDrift
};