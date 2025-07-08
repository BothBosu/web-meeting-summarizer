const express = require('express');
const cors = require('cors');
const uploadRoutes = require('./routes/upload');
const documentRoutes = require('./routes/documents');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', uploadRoutes);
app.use('/api', documentRoutes);

module.exports = app;
