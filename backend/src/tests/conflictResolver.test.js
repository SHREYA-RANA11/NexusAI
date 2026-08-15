const conflictResolver = require('../services/conflictResolver');
const Decision = require('../models/Decision');
const ReconciledDecision = require('../models/ReconciledDecision');

jest.mock('../models/Decision');
jest.mock('../models/ReconciledDecision');

describe('Conflict Resolution Engine Business Rules', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('Rule 0: Unanimous Agreement', async () => {
        const mockDecisions = [
            { caseId: 'case-unanimous', decision: 'APPROVE', modelName: 'model-A', confidence: 0.9, trainingDate: new Date('2026-01-01'), historicalAccuracy: 0.88 },
            { caseId: 'case-unanimous', decision: 'APPROVE', modelName: 'model-B', confidence: 0.85, trainingDate: new Date('2026-02-01'), historicalAccuracy: 0.92 }
        ];
        Decision.find.mockResolvedValue(mockDecisions);
        ReconciledDecision.findOneAndUpdate.mockImplementation((query, update) => Promise.resolve(update));

        const result = await conflictResolver.reconcileCase('case-unanimous');

        expect(result.finalDecision).toBe('APPROVE');
        expect(result.resolutionReason).toBe('Unanimous Agreement');
        expect(result.winningModel).toBe('model-A');
        expect(result.winningConfidence).toBe(0.9);
    });

    test('Rule 1: Highest Confidence Wins', async () => {
        const mockDecisions = [
            { caseId: 'case-conf', decision: 'APPROVE', modelName: 'model-A', confidence: 0.70, trainingDate: new Date('2026-01-01'), historicalAccuracy: 0.88 },
            { caseId: 'case-conf', decision: 'REJECT', modelName: 'model-B', confidence: 0.95, trainingDate: new Date('2026-02-01'), historicalAccuracy: 0.90 }
        ];
        Decision.find.mockResolvedValue(mockDecisions);
        ReconciledDecision.findOneAndUpdate.mockImplementation((query, update) => Promise.resolve(update));

        const result = await conflictResolver.reconcileCase('case-conf');

        expect(result.finalDecision).toBe('REJECT');
        expect(result.winningModel).toBe('model-B');
        expect(result.winningConfidence).toBe(0.95);
        expect(result.resolutionReason).toBe('Highest Confidence Win');
    });

    test('Rule 2: TrainingDate Tie-Breaker (Confidence Tie)', async () => {
        const mockDecisions = [
            { caseId: 'case-date', decision: 'APPROVE', modelName: 'model-A', confidence: 0.90, trainingDate: new Date('2026-01-01'), historicalAccuracy: 0.88 },
            { caseId: 'case-date', decision: 'REJECT', modelName: 'model-B', confidence: 0.90, trainingDate: new Date('2026-05-01'), historicalAccuracy: 0.80 }
        ];
        Decision.find.mockResolvedValue(mockDecisions);
        ReconciledDecision.findOneAndUpdate.mockImplementation((query, update) => Promise.resolve(update));

        const result = await conflictResolver.reconcileCase('case-date');

        expect(result.finalDecision).toBe('REJECT');
        expect(result.winningModel).toBe('model-B');
        expect(result.winningConfidence).toBe(0.9);
        expect(result.resolutionReason).toBe('Latest Training Date Tie-Breaker');
    });

    test('Rule 3: HistoricalAccuracy Tie-Breaker (Confidence & TrainingDate Tie)', async () => {
        const date = new Date('2026-01-01');
        const mockDecisions = [
            { caseId: 'case-accuracy', decision: 'APPROVE', modelName: 'model-A', confidence: 0.90, trainingDate: date, historicalAccuracy: 0.95 },
            { caseId: 'case-accuracy', decision: 'REJECT', modelName: 'model-B', confidence: 0.90, trainingDate: date, historicalAccuracy: 0.85 }
        ];
        Decision.find.mockResolvedValue(mockDecisions);
        ReconciledDecision.findOneAndUpdate.mockImplementation((query, update) => Promise.resolve(update));

        const result = await conflictResolver.reconcileCase('case-accuracy');

        expect(result.finalDecision).toBe('APPROVE');
        expect(result.winningModel).toBe('model-A');
        expect(result.winningConfidence).toBe(0.9);
        expect(result.resolutionReason).toBe('Historical Accuracy Tie-Breaker');
    });

    test('Rule 4: Alphabetical Tie-Breaker (All Metrics Identical)', async () => {
        const date = new Date('2026-01-01');
        const mockDecisions = [
            { caseId: 'case-alpha', decision: 'REJECT', modelName: 'model-Z', confidence: 0.90, trainingDate: date, historicalAccuracy: 0.90 },
            { caseId: 'case-alpha', decision: 'APPROVE', modelName: 'model-P', confidence: 0.90, trainingDate: date, historicalAccuracy: 0.90 }
        ];
        Decision.find.mockResolvedValue(mockDecisions);
        ReconciledDecision.findOneAndUpdate.mockImplementation((query, update) => Promise.resolve(update));

        const result = await conflictResolver.reconcileCase('case-alpha');

        expect(result.finalDecision).toBe('APPROVE');
        expect(result.winningModel).toBe('model-P');
        expect(result.winningConfidence).toBe(0.9);
        expect(result.resolutionReason).toBe('Deterministic Alphabetical Tie-Breaker');
    });
});
