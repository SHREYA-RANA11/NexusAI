const request = require("supertest");
const app = require("../app");

const Decision = require("../models/Decision");
const DriftHistory = require("../models/DriftHistory");

jest.mock("../models/Decision");
jest.mock("../models/DriftHistory");

// Mock drift detector so POST /decisions doesn't fail
jest.mock("../services/driftDetector", () => ({
  detectDrift: jest.fn().mockResolvedValue(null),
}));

// Mock conflict resolver
jest.mock("../services/conflictResolver", () => ({
  reconcileCase: jest.fn().mockResolvedValue(null),
}));

describe("NexusAI API Endpoints Integration and Validation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("POST /api/decisions", () => {
    test("should block with 400 Bad Request if validation fails", async () => {
      const response = await request(app).post("/api/decisions").send({});

      expect(response.statusCode).toBe(400);
      expect(response.body.status).toBe("error");
      expect(response.body.message).toBe("Validation Error");
    });

    test("should return 409 Conflict if eventId is duplicate", async () => {
      Decision.findOne.mockResolvedValue({
        eventId: "evt-dup",
      });

      const response = await request(app)
        .post("/api/decisions")
        .send({
          caseId: "case-01",
          inputText: "Loan request",
          modelName: "gpt-4",
          decision: "Approved",
          confidence: 0.91,
          timestamp: "2026-08-15T12:00:00Z",
          eventId: "evt-dup",
        });

      expect(response.statusCode).toBe(409);
      expect(response.body.status).toBe("error");
    });

    test("should create decision successfully", async () => {
      Decision.findOne.mockResolvedValue(null);

      const savedDecision = {
        caseId: "case-01",
        inputText: "Loan request",
        modelName: "gpt-4",
        decision: "Approved",
        confidence: 0.91,
        timestamp: new Date(),
        eventId: "evt-01",
      };

      const mockSave = jest.fn().mockResolvedValue(savedDecision);

      Decision.mockImplementation(() => ({
        save: mockSave,
      }));

      const response = await request(app)
        .post("/api/decisions")
        .send({
          caseId: "case-01",
          inputText: "Loan request",
          modelName: "gpt-4",
          decision: "Approved",
          confidence: 0.91,
          timestamp: "2026-08-15T12:00:00Z",
          eventId: "evt-01",
        });

      expect(response.statusCode).toBe(201);
      expect(response.body.status).toBe("success");
      expect(response.body.data.eventId).toBe("evt-01");
      expect(mockSave).toHaveBeenCalled();
    });
  });

  describe("GET /api/decisions", () => {
    test("should return paginated decisions", async () => {
      const mockItems = [
        {
          eventId: "evt-02",
          timestamp: new Date(),
        },
        {
          eventId: "evt-01",
          timestamp: new Date(),
        },
      ];

      const chain = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(mockItems),
      };

      Decision.find.mockReturnValue(chain);
      Decision.countDocuments.mockResolvedValue(2);

      const response = await request(app).get(
        "/api/decisions?page=1&limit=2"
      );

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");

      expect(response.body.data.total).toBe(2);
      expect(response.body.data.items.length).toBe(2);
    });
  });

  describe("GET /api/history/:caseId", () => {
    test("should return case history", async () => {
      const history = [
        {
          caseId: "case-99",
          timestamp: new Date(),
        },
        {
          caseId: "case-99",
          timestamp: new Date(),
        },
      ];

      const chain = {
        sort: jest.fn().mockResolvedValue(history),
      };

      Decision.find.mockReturnValue(chain);

      const response = await request(app).get("/api/history/case-99");

      expect(response.statusCode).toBe(200);
      expect(response.body.status).toBe("success");
      expect(response.body.data.length).toBe(2);
    });
  });

  describe("GET /api/audit/:caseId", () => {
    test("should return audit placeholder", async () => {
      const response = await request(app).get("/api/audit/case-99");

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual({
        message: "Audit module coming next",
      });
    });
  });

  describe("GET /api/drift", () => {
    test("should return drift history", async () => {
      const records = [
        {
          modelName: "gpt-4",
          jsDivergence: 0.41,
          driftDetected: true,
        },
      ];

      const chain = {
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockResolvedValue(records),
      };

      DriftHistory.find.mockReturnValue(chain);
      DriftHistory.countDocuments.mockResolvedValue(1);

      const response = await request(app).get("/api/drift");

      expect(response.statusCode).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.data.length).toBe(1);
    });
  });
});