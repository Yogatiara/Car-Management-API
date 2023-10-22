const router = require('express').Router();

const checkRentalBodyRequire = require('../middlewares/checkRentalBodyRequire');
const checkRole = require('../middlewares/checkRole');
const authenticate = require('../middlewares/authenticate');
const Rental = require('../controllers/rentalController');

router
  .route('/')
  .get(Rental.findRental)
  .post(
    authenticate,
    checkRole('superadmin', 'admin'),
    checkRentalBodyRequire,
    Rental.createRental
  )
  .delete(Rental.clearRental);

router
  .route('/:id')
  .get(Rental.findRentalById)
  .put(
    authenticate,
    checkRole('superadmin', 'admin'),
    Rental.updateRental
  )
  .delete(
    authenticate,
    checkRole('superadmin', 'admin'),
    Rental.deleteRental
  );

module.exports = router;
