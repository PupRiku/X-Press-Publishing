// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const issuesRouter = express.Router({mergeParams: true});

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite');

// GET all issues of series
issuesRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Issue WHERE series_id = $seriesId', {
        $seriesId: req.params.seriesId
    }, (err, issues) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({issues: issues});
        }
    });
});

// Export router
module.exports = issuesRouter;