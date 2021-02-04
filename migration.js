// Node module imports
const sqlite3 = require('sqlite3');

// Create new sqlite database
const db = new sqlite3.Database('./database.sqlite');

// Create artist table
db.run(`CREATE TABLE IF NOT EXISTS Artist (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    date_of_birth TEXT NOT NULL,
    biography TEXT NOT NULL,
    is_currently_employed INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY(id)
)`);

// Create series table
db.run(`CREATE TABLE IF NOT EXISTS Series (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    PRIMARY KEY(id)
)`);

// Create issue table
db.run(`CREATE TABLE IF NOT EXISTS Issue (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    issue_number INTEGER NOT NULL,
    publication_date TEXT NOT NULL,
    artist_id INTEGER NOT NULL,
    series_id INTEGER NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY(artist_id) REFERENCES Artist(id),
    FOREIGN KEY(series_id) REFERENCES Series(id)
)`);