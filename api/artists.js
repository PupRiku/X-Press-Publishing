// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const artistsRouter = express.Router();

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

artistsRouter.get('/', (req, res, next) => {
    
});

// Export router
module.exports = artistsRouter;