const router = require('express').Router();
const userRoutes = require('./route-user');
const thoughtRoutes = require('./route-thought');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;