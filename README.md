# NexusAI

NexusAI is a Real-Time AI Decision Reconciliation & Model Drift Monitoring Platform. It provides an enterprise governance layer to monitor NLP decisions, resolve logic-based model conflicts, log audits, and signal drift issues.

## Project Structure

```
NexusAI/
├── backend/
│   ├── src/
│   │   ├── config/         # Config variables and database config
│   │   ├── controllers/    # API request handlers (Placeholders)
│   │   ├── routes/         # Routing paths
│   │   ├── middleware/     # Error handlers, loggers
│   │   ├── models/         # Database models (Mongoose)
│   │   ├── services/       # Domain business logic
│   │   ├── utils/          # Formatting and utility functions
│   │   ├── validators/     # Request schema verification stubs
│   │   ├── fixtures/       # Initial/Seed mock data
│   │   ├── tests/          # Backend integration testing suite
│   │   ├── app.js          # Express app definition
│   │   └── server.js       # App entry point
│   ├── package.json
│   ├── Jest.config.js
│   └── .env.example
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/     # UI components
│   │   ├── pages/          # App pages
│   │   ├── layouts/        # Common Page layouts (Sidebar, Navbar)
│   │   ├── hooks/          # Custom React hooks
│   │   ├── services/       # Server connection utility
│   │   ├── utils/          # Static layout values
│   │   ├── context/        # Dark/Light theme values
│   │   ├── routes/         # Navigation setups
│   │   ├── styles/         # CSS style variables
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── vite.config.js
└── README.md
```

## Running the Application

### Backend
1. Go to backend directory: `cd backend`
2. Create environment variables: `cp .env.example .env`
3. Install dependencies: `npm install`
4. Start dev server: `npm run dev`
5. Test using: `npm run test`

### Frontend
1. Go to frontend directory: `cd frontend`
2. Install dependencies: `npm install`
3. Start Vite dev environment: `npm run dev`
