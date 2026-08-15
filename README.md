# 🚀 NexusAI

> **Real-Time NLP Model Drift Detection & Decision Reconciliation Platform**

NexusAI is an AI Governance platform that monitors real-time NLP model decisions, detects model drift, reconciles conflicting predictions from multiple AI models, and generates explainable audit trails.

This project was built for the **Real-Time NLP Model Drift Detection and Reconciliation for AI-Driven Decision Systems** challenge.

---

# Features

- ✅ Real-time Decision Ingestion API
- ✅ Duplicate Event Detection (Idempotency)
- ✅ Stateful Decision History
- ✅ Deterministic Conflict Resolution
- ✅ Model Drift Detection
- ✅ Audit Trail Generation
- ✅ Reconciliation History
- ✅ MongoDB Storage
- ✅ REST APIs
- ✅ Automated Test Suite
- ✅ React Dashboard
- ✅ Sample Fixtures for Edge Cases

---

# Tech Stack

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- Jest
- Supertest

## Frontend

- React
- Vite
- Tailwind CSS
- React Router
- Lucide Icons

---

# Architecture

```
                +----------------------+
                |    React Dashboard   |
                +----------+-----------+
                           |
                    REST API Calls
                           |
                +----------v-----------+
                |    Express Backend   |
                +----------+-----------+
                           |
     ---------------------------------------------
     |                  |                        |
Decision Service   Audit Service        Drift Service
     |                  |                        |
Conflict Resolver  Audit Generator     Drift Detector
     |                  |                        |
     +------------------+------------------------+
                           |
                      MongoDB Database
```

---

# Project Structure

```
NexusAI
│
├── backend
│   ├── src
│   │   ├── config
│   │   ├── controllers
│   │   ├── fixtures
│   │   ├── middleware
│   │   ├── models
│   │   ├── routes
│   │   ├── scripts
│   │   ├── services
│   │   ├── tests
│   │   ├── utils
│   │   ├── validators
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── audit_outputs
│   ├── package.json
│   └── .env.example
│
├── frontend
│   ├── src
│   │   ├── components
│   │   ├── layouts
│   │   ├── pages
│   │   ├── services
│   │   ├── styles
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── package.json
│
└── README.md
```

---

# Functional Modules

## 1. Decision Ingestion

Accepts NLP model decisions through REST APIs.

```
POST /api/decisions
```

Stores

- Case ID
- Input Text
- Model Name
- Decision
- Confidence
- Timestamp
- Event ID

---

## 2. Drift Detection

Monitors confidence score distributions.

Current implementation:

- Sliding Window
- Average Confidence Difference
- Drift Threshold = 0.30

Generates

- JS Divergence Score
- Drift Flag
- Drift History

---

## 3. Conflict Resolution

If multiple models disagree,

Rules:

1. Highest confidence wins
2. Tie → latest model version
3. Same model updates create newer audit version

Stores final reconciled decision.

---

## 4. Decision History

Maintains immutable history for every case.

```
GET /api/history/:caseId
```

---

## 5. Audit Trail

Generates explainable audit reports.

```
GET /api/audit/:caseId
```

Includes

- Input decisions
- Winning model
- Drift status
- Resolution logic
- Final decision
- Audit version

---

# REST APIs

| Method | Endpoint | Description |
|----------|-------------------------|-----------------------------|
| POST | /api/decisions | Ingest decision |
| GET | /api/decisions | Paginated decisions |
| GET | /api/history/:caseId | Decision history |
| GET | /api/reconcile/:caseId | Final reconciled decision |
| GET | /api/audit/:caseId | Audit report |
| GET | /api/drift | Drift history |

---

# Running Backend

Clone project

```bash
git clone <repository-url>
```

Go into backend

```bash
cd backend
```

Install dependencies

```bash
npm install
```

Create environment file

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/nexusai
```

Start server

```bash
npm run dev
```

Run tests

```bash
npm test
```

Seed sample fixtures

```bash
npm run seed
```

Generate audit outputs

```bash
npm run audit
```

---

# Running Frontend

```bash
cd frontend
npm install
npm run dev
```

Runs on

```
http://localhost:3000
```

or

```
http://localhost:3001
```

---

# Sample Edge Cases

Implemented fixtures cover:

- Duplicate Event IDs
- Conflicting Model Decisions
- Agreement Between Models
- Same Model Version Updates
- Drift Detection Scenario

---

# Testing

Automated Jest tests cover

- Decision APIs
- Validation
- Duplicate Requests
- Decision History
- Drift Detection
- Conflict Resolution
- Database Services

Run

```bash
npm test
```

---

# Future Improvements

- Retraining Trigger
- Local LLM Audit Explanation
- Dashboard Analytics
- Historical Drift Graphs
- Multi Decision Types
- Docker Deployment
- Role-Based Authentication

---

# Author

**Shreya Rana**

Final Year B.Tech Information Technology Student

GitHub:
https://github.com/SHREYA-RANA11

---
