const router = require('express').Router();

const Admin = require('./adminRouter');
const Car = require('./carRouter');
const Rental = require('./rentalRouter');
const Auth = require('./authRouter');
const Member = require('./userRouter');

router.use('/api/v1/admins', Admin);
router.use('/api/v1/cars', Car);
router.use('/api/v1/rentals', Rental);
router.use('/api/v1/auth', Auth);
router.use('/api/v1/members', Member);

module.exports = router;
