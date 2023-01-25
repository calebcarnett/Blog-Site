const router = require('express').Router();
const userRoutes = require('./userRoutes');
const postRoutes = require('./postRoutes');

router.use('/users', userRoutes);
router.use('/blog', postRoutes);

module.exports = router;
