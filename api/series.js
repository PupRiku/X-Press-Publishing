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

// Setup router param
seriesRouter.param('seriesId', (req, res, next, seriesId) => {
    db.get("SELECT * FROM Series WHERE id = $seriesId", {
        $seriesId: seriesId
    }, (err, series) => {
        if (err) {
            next(err);
        } else if (series) {
            req.series = series;
            next();
        } else {
            res.sendStatus(404);
        }
    });
});

// GET series by id
seriesRouter.get('/:seriesId', (req, res, next) => {
    res.status(200).send({series: req.series});
});

// POST new series to DB
seriesRouter.post('/', (req, res, next) => {
    const name = req.body.series.name;
    const description = req.body.series.description;
    if(!name || !description) {
        return res.sendStatus(400);
    }

    db.run('INSERT INTO Series (name, description) VALUES ($name, $description)', {
        $name: name,
        $description: description
    }, function(err) {
        if (err) {
            next(err);
        } else {
            db.get(`SELECT * FROM Series WHERE id=${this.lastID}`, (error, series) => {
                if (error) {
                    next (error);
                } else {
                    res.status(201).json({series: series});
                }
            })
        }
    });
});

// Export router
module.exports = seriesRouter;