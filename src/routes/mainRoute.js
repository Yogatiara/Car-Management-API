const router = require('express').Router();

const User = require('./userRoute');

router.use('/api/v1/users', User);

module.exports = router;
