const router = require('express').Router();

// Import all API routes from /api/index.js
const apiRoutes = require('./api');

// Adds prefix of '/api' to all API routes imported from /api/index.js
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('Error!');
});

module.exports = router;