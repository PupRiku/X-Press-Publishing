// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const seriesRouter = express.Router();

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// GET all series
seriesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Series', (err, series) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({series: series});
        }
    });
});

// Export router
module.exports = seriesRouter;