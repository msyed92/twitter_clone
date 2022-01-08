// ./routes/index.js
const router = require('express').Router();

router.use('/user', require('./user'));

router.use('/', require('./default'));

module.exports = router;