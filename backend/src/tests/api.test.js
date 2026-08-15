const request = require('supertest');
const app = require('../app');
const Decision = require('../models/Decision');

jest.mock('../models/Decision');

describe('NexusAI API Endpoints Integration and Validation', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    describe('POST /api/decisions', () => {
        test('should block with 400 Bad Request if validation fails', async () => {
            const response = await request(app).post('/api/decisions').send({});
            expect(response.statusCode).toBe(400);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Validation Error');
        });

        test('should return 409 Conflict if eventId is a duplicate', async () => {
            Decision.findOne.mockResolvedValue({ eventId: 'evt-dup' });

            const response = await request(app).post('/api/decisions').send({
                caseId: 'case-01',
                inputText: 'text to evaluate',
                modelName: 'gpt-4',
                decision: 'approve',
                confidence: 0.95,
                timestamp: '2026-08-15T12:00:00Z',
                eventId: 'evt-dup',
                modelVersion: '1.0'
            });

            expect(response.statusCode).toBe(409);
            expect(response.body.status).toBe('error');
            expect(response.body.message).toBe('Decision with this eventId already exists');
        });

        test('should return 201 Created and save decision if payload is valid and eventId is unique', async () => {
            Decision.findOne.mockResolvedValue(null);

            const mockSave = jest.fn().mockResolvedValue({
                caseId: 'case-01',
                inputText: 'text to evaluate',
                modelName: 'gpt-4',
                decision: 'approve',
                confidence: 0.95,
                timestamp: new Date('2026-08-15T12:00:00Z'),
                eventId: 'evt-01',
                modelVersion: '1.0'
            });

            Decision.mockImplementation(() => {
                return {
                    save: mockSave
                };
            });

            const response = await request(app).post('/api/decisions').send({
                caseId: 'case-01',
                inputText: 'text to evaluate',
                modelName: 'gpt-4',
                decision: 'approve',
                confidence: 0.95,
                timestamp: '2026-08-15T12:00:00Z',
                eventId: 'evt-01',
                modelVersion: '1.0'
            });

            expect(response.statusCode).toBe(201);
            expect(response.body.status).toBe('success');
            expect(response.body.data.eventId).toBe('evt-01');
            expect(mockSave).toHaveBeenCalled();
        });
    });

    describe('GET /api/decisions', () => {
        test('should return paginated decisions sorted by timestamp DESC', async () => {
            const mockItems = [
                { id: '1', timestamp: new Date('2026-08-15T12:00:00Z'), eventId: 'evt-02' },
                { id: '2', timestamp: new Date('2026-08-15T11:00:00Z'), eventId: 'evt-01' }
            ];

            const mockChain = {
                sort: jest.fn().mockReturnThis(),
                skip: jest.fn().mockReturnThis(),
                limit: jest.fn().mockResolvedValue(mockItems)
            };

            Decision.find.mockReturnValue(mockChain);
            Decision.countDocuments.mockResolvedValue(2);

            const response = await request(app).get('/api/decisions?page=1&limit=2');

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');

            const payload = response.body.data;
            expect(payload.items.length).toBe(2);
            expect(payload.total).toBe(2);
            expect(payload.page).toBe(1);
            expect(payload.limit).toBe(2);
            expect(payload.totalPages).toBe(1);

            expect(Decision.find).toHaveBeenCalled();
            expect(mockChain.sort).toHaveBeenCalledWith({ timestamp: -1 });
            expect(mockChain.skip).toHaveBeenCalledWith(0);
            expect(mockChain.limit).toHaveBeenCalledWith(2);
        });
    });

    describe('GET /api/history/:caseId', () => {
        test('should return all decisions for caseId sorted by timestamp ASC', async () => {
            const mockItems = [
                { caseId: 'case-99', timestamp: '2026-08-15T10:00:00Z' },
                { caseId: 'case-99', timestamp: '2026-08-15T11:00:00Z' }
            ];

            const mockChain = {
                sort: jest.fn().mockResolvedValue(mockItems)
            };
            Decision.find.mockReturnValue(mockChain);

            const response = await request(app).get('/api/history/case-99');

            expect(response.statusCode).toBe(200);
            expect(response.body.status).toBe('success');
            expect(response.body.data.length).toBe(2);

            expect(Decision.find).toHaveBeenCalledWith({ caseId: 'case-99' });
            expect(mockChain.sort).toHaveBeenCalledWith({ timestamp: 1 });
        });
    });

    describe('GET /api/audit/:caseId', () => {
        test('should return audit coming soon placeholder', async () => {
            const response = await request(app).get('/api/audit/case-99');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: 'Audit module coming next' });
        });
    });

    describe('GET /api/drift', () => {
        test('should return drift coming soon placeholder', async () => {
            const response = await request(app).get('/api/drift');
            expect(response.statusCode).toBe(200);
            expect(response.body).toEqual({ message: 'Drift module coming next' });
        });
    });
});
