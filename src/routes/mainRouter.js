const router = require('express').Router();
const swaggerUI = require('swagger-ui-express');

const Admin = require('./adminRouter');
const Car = require('./carRouter');
const Rental = require('./rentalRouter');
const Auth = require('./authRouter');
const Member = require('./memberRouter');
const swaggerDocument = require('../../docs/swagger.json');

router.use('/api/v1/admins', Admin);
router.use('/api/v1/cars', Car);
router.use('/api/v1/rentals', Rental);
router.use('/api/v1/auth', Auth);
router.use('/api/v1/members', Member);

router.use('/api-docs', swaggerUI.serve);
router.use(
  '/api-docs',
  swaggerUI.setup(swaggerDocument)
);

module.exports = router;
