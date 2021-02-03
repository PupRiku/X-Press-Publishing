// Import node modules
const express = require('express');

// Import artists router
const artistsRouter = require('./artists');

// setup api router
const apiRouter = express.Router();

// Setup artists route
apiRouter.use('/artists', artistsRouter);

// Export router
module.exports = apiRouter;