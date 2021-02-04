// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const artistsRouter = express.Router();

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

artistsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({artists: rows});
        }
    });
});

artistsRouter.param('artistId', (req, res, next, artistId) => {
    db.get("SELECT * FROM Artist WHERE id = $artistId", {
        $artistId: artistId
    }, (err, artist) => {
        if (err) {
            next(err);
        } else if (artist) {
            req.artist = artist;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

// Export router
module.exports = artistsRouter;