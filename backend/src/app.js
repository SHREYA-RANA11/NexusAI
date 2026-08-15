const express = require('express');
const cors = require('cors');
const requestLogger = require('./middleware/logger');
const errorHandler = require('./middleware/error');
const healthRouter = require('./routes/health');
const apiRouter = require('./routes/api');

const app = express();

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use('/health', healthRouter);
app.use('/api', apiRouter);

app.use((req, res, next) => {
    res.status(404);
    const error = new Error(`Not Found - ${req.originalUrl}`);
    next(error);
});

app.use(errorHandler);

module.exports = app;
