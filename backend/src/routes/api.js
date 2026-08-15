const express = require('express');
const router = express.Router();
const { validateDecisionPost } = require('../validators/decisionValidator');
const decisionController = require('../controllers/decisionController');

router.post('/decisions', validateDecisionPost, decisionController.postDecision);
router.get('/decisions', decisionController.getDecisions);
router.get('/history/:caseId', decisionController.getHistory);
router.get('/reconcile/:caseId', decisionController.getReconciledDecision);
router.get('/audit/:caseId', decisionController.getAudit);
router.get('/drift', decisionController.getDrift);

module.exports = router;
