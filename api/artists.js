// Import node modules
const express = require('express');
const sqlite3 = require('sqlite3');

// setup api router
const artistsRouter = express.Router();

// setup database
const db = new sqlite3.Database(process.env.TEST_DATABASE || './database.sqlite')

// GET all employed artists
artistsRouter.get('/', (req, res, next) => {
    db.all('SELECT * FROM Artist WHERE is_currently_employed = 1', (err, rows) => {
        if (err) {
            next(err);
        } else {
            res.status(200).json({artists: rows});
        }
    });
});

// Setup artist id param
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

// GET artist by ID
artistsRouter.get('/:artistId', (req, res, next) => {
    res.status(200).send({artist: req.artist});
});

// POST new artist
artistsRouter.post('/', (req, res, next) => {
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;

    if(!name || ! dateOfBirth || !biography) {
        return res.sendStatus(400);
    }

    const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;

    db.run('INSERT INTO Artist (name, date_of_birth, biography, is_currently_employed) VALUES ($name, $dateOfBirth, $biography, $isCurrentlyEmployed)', {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed
    }, function(err) {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Artist WHERE id = ${this.lastID}`, (error, artist) => {
                if (error) {
                    next(error);
                } else {
                    res.status(201).json({artist: artist});
                }
            });
        }
    });
});

artistsRouter.put('/:artistId', (req, res, next) => {
    const name = req.body.artist.name;
    const dateOfBirth = req.body.artist.dateOfBirth;
    const biography = req.body.artist.biography;
    const isCurrentlyEmployed = req.body.artist.isCurrentlyEmployed === 0 ? 0 : 1;

    if(!name || ! dateOfBirth || !biography) {
        return res.sendStatus(400);
    }

    db.run('UPDATE Artist SET name = $name, date_of_birth = $dateOfBirth, biography = $biography, is_currently_employed = $isCurrentlyEmployed WHERE id = $artistId', {
        $name: name,
        $dateOfBirth: dateOfBirth,
        $biography: biography,
        $isCurrentlyEmployed: isCurrentlyEmployed,
        $artistId: req.params.artistId
    }, err => {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Artist WHERE id = ${req.params.artistId}`, (error, artist) => {
                if (error) {
                    next(error);
                } else {
                    res.status(200).json({artist: artist});
                }
            });
        }
    });
});

// Export router
module.exports = artistsRouter;