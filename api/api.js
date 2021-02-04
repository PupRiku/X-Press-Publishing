// Import node modules
const express = require('express');

// Import routers
const artistsRouter = require('./artists');
const seriesRouter = require('./series');

// setup api router
const apiRouter = express.Router();

// Setup routes
apiRouter.use('/artists', artistsRouter);
apiRouter.use('/series', seriesRouter);

// Export router
module.exports = apiRouter;