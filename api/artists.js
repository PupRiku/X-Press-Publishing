// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const artistsRouter = express.Router();

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

artistsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', (err, rows) => {
        
    });
});

// Export router
module.exports = artistsRouter;