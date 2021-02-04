// Import node modules
const express = require('express');

// setup api router
const issuesRouter = express.Router({mergeParams: true});

// Export router
module.exports = issuesRouter;