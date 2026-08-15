const mongoose = require("mongoose");

const connectDB = require("../config/database");

const Decision = require("../models/Decision");
const ReconciledDecision = require("../models/ReconciledDecision");
const DriftHistory = require("../models/DriftHistory");

const conflictResolver = require("../services/conflictResolver");

async function seed() {
  await connectDB();

  console.log("Cleaning database...");

  await Decision.deleteMany({});
  await ReconciledDecision.deleteMany({});
  await DriftHistory.deleteMany({});

  console.log("Database cleaned.");

  const decisions = [];

  // --------------------------
  // CASE-001 : Conflict
  // --------------------------

  decisions.push(
    {
      caseId: "CASE-001",
      eventId: "EVT-001",
      inputText: "Approve loan",
      modelName: "GPT-4",
      decision: "Approved",
      confidence: 0.94,
      timestamp: new Date("2026-08-15T10:00:00Z"),
      modelVersion: "1.0",
    },
    {
      caseId: "CASE-001",
      eventId: "EVT-002",
      inputText: "Approve loan",
      modelName: "Claude",
      decision: "Rejected",
      confidence: 0.81,
      timestamp: new Date("2026-08-15T10:01:00Z"),
      modelVersion: "1.0",
    }
  );

  // --------------------------
  // CASE-002 : Agreement
  // --------------------------

  decisions.push(
    {
      caseId: "CASE-002",
      eventId: "EVT-003",
      inputText: "Credit card fraud",
      modelName: "GPT-4",
      decision: "Fraud",
      confidence: 0.91,
      timestamp: new Date("2026-08-15T11:00:00Z"),
      modelVersion: "1.0",
    },
    {
      caseId: "CASE-002",
      eventId: "EVT-004",
      inputText: "Credit card fraud",
      modelName: "Gemini",
      decision: "Fraud",
      confidence: 0.90,
      timestamp: new Date("2026-08-15T11:00:02Z"),
      modelVersion: "1.0",
    }
  );

  // --------------------------
  // CASE-003 : Late Event
  // --------------------------

  decisions.push(
    {
      caseId: "CASE-003",
      eventId: "EVT-005",
      inputText: "Insurance claim",
      modelName: "GPT-4",
      decision: "Approved",
      confidence: 0.80,
      timestamp: new Date("2026-08-15T12:10:00Z"),
      modelVersion: "1.0",
    },
    {
      caseId: "CASE-003",
      eventId: "EVT-006",
      inputText: "Insurance claim",
      modelName: "Claude",
      decision: "Approved",
      confidence: 0.83,
      timestamp: new Date("2026-08-15T12:00:00Z"),
      modelVersion: "1.0",
    }
  );

  // --------------------------
  // CASE-004 : Same model conflict
  // --------------------------

  decisions.push(
    {
      caseId: "CASE-004",
      eventId: "EVT-007",
      inputText: "Loan eligibility",
      modelName: "GPT-4",
      decision: "Approved",
      confidence: 0.65,
      timestamp: new Date("2026-08-15T13:00:00Z"),
      modelVersion: "1.0",
    },
    {
      caseId: "CASE-004",
      eventId: "EVT-008",
      inputText: "Loan eligibility",
      modelName: "GPT-4",
      decision: "Rejected",
      confidence: 0.97,
      timestamp: new Date("2026-08-15T13:01:00Z"),
      modelVersion: "1.1",
    }
  );

  // --------------------------
  // CASE-005 : Drift Data
  // --------------------------

  for (let i = 0; i < 20; i++) {
    decisions.push({
      caseId: `CASE-005`,
      eventId: `EVT-DRIFT-${i}`,
      inputText: "Customer support request",
      modelName: "GPT-4",
      decision: i < 10 ? "Approved" : "Rejected",
      confidence: i < 10 ? 0.95 : 0.45,
      timestamp: new Date(Date.now() - i * 60000),
      modelVersion: "1.0",
    });
  }

  console.log("Saving decisions...");

  await Decision.insertMany(decisions);

  console.log("Generating reconciled decisions...");

  const caseIds = [...new Set(decisions.map((d) => d.caseId))];

  for (const id of caseIds) {
    await conflictResolver.reconcileCase(id);
  }

  console.log("Done.");

  await mongoose.connection.close();
}

seed().catch((err) => {
  console.error(err);
  mongoose.connection.close();
});