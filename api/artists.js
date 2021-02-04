// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const apiRouter = express.Router();

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// Export router
module.exports = apiRouter;