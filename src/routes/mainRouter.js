const router = require('express').Router();

const User = require('./userRouter');
const Car = require('./carRouter');

router.use('/api/v1/users', User);
router.use('/api/v1/cars', Car);

module.exports = router;
