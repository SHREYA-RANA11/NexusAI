const Decision = require('../models/Decision');
const ReconciledDecision = require('../models/ReconciledDecision');
const DriftHistory = require('../models/DriftHistory');

describe('Mongoose Models Schema Valdations', () => {

    describe('Decision Model', () => {
        test('should fail validation when required fields are missing', () => {
            const decision = new Decision({});
            const err = decision.validateSync();
            expect(err.errors.caseId).toBeDefined();
            expect(err.errors.inputText).toBeDefined();
            expect(err.errors.modelName).toBeDefined();
            expect(err.errors.decision).toBeDefined();
            expect(err.errors.confidence).toBeDefined();
            expect(err.errors.timestamp).toBeDefined();
            expect(err.errors.modelVersion).toBeDefined();
            expect(err.errors.eventId).toBeDefined();
        });

        test('should fail validation when confidence is out of bounds [0, 1]', () => {
            const decision = new Decision({
                caseId: 'case-01',
                inputText: 'text prompt',
                modelName: 'evaluator-01',
                decision: 'yes',
                confidence: -0.2, // invalid
                timestamp: new Date(),
                modelVersion: '1.0',
                eventId: 'evt-01'
            });
            const err = decision.validateSync();
            expect(err.errors.confidence).toBeDefined();

            const decision2 = new Decision({
                caseId: 'case-01',
                inputText: 'text prompt',
                modelName: 'evaluator-01',
                decision: 'yes',
                confidence: 1.05, // invalid
                timestamp: new Date(),
                modelVersion: '1.0',
                eventId: 'evt-01'
            });
            const err2 = decision2.validateSync();
            expect(err2.errors.confidence).toBeDefined();
        });

        test('should pass validation with valid configuration parameters', () => {
            const decision = new Decision({
                caseId: 'case-01',
                inputText: 'text prompt',
                modelName: 'evaluator-01',
                decision: 'yes',
                confidence: 0.95,
                timestamp: new Date(),
                modelVersion: '1.0',
                eventId: 'evt-01'
            });
            const err = decision.validateSync();
            expect(err).toBeUndefined();
        });
    });

    describe('ReconciledDecision Model', () => {
        test('should fail validation when required fields are missing', () => {
            const reconciled = new ReconciledDecision({});
            const err = reconciled.validateSync();
            expect(err.errors.caseId).toBeDefined();
            expect(err.errors.finalDecision).toBeDefined();
            expect(err.errors.resolutionReason).toBeDefined();
        });

        test('should pass validation with valid details and apply defaults', () => {
            const reconciled = new ReconciledDecision({
                caseId: 'case-01',
                finalDecision: 'approve transaction',
                resolutionReason: 'majority consensus met',
                winningModel: 'gpt-4',
                winningConfidence: 0.95
            });
            const err = reconciled.validateSync();
            expect(err).toBeUndefined();
            expect(reconciled.reconciledAt).toBeDefined();
            expect(reconciled.auditVersion).toBe(1);
        });
    });

    describe('DriftHistory Model', () => {
        test('should fail validation when required fields are missing', () => {
            const drift = new DriftHistory({});
            const err = drift.validateSync();
            expect(err.errors.modelName).toBeDefined();
            expect(err.errors.windowStart).toBeDefined();
            expect(err.errors.windowEnd).toBeDefined();
            expect(err.errors.jsDivergence).toBeDefined();
            expect(err.errors.threshold).toBeDefined();
            expect(err.errors.driftDetected).toBeDefined();
        });

        test('should pass validation with correct parameter data types', () => {
            const drift = new DriftHistory({
                modelName: 'claude-3',
                windowStart: new Date(Date.now() - 3600000),
                windowEnd: new Date(),
                jsDivergence: 0.24,
                threshold: 0.50,
                driftDetected: false
            });
            const err = drift.validateSync();
            expect(err).toBeUndefined();
            expect(drift.createdAt).toBeDefined();
        });
    });

});
