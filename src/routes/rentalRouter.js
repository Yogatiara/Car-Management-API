const router = require('express').Router();

const checkRentalBodyRequire = require('../middlewares/checkRentalBodyRequire');
const Rental = require('../controllers/rentalController');

router
  .route('/')
  .get(Rental.findRental)
  .post(
    // checkRentalBodyRequire,
    Rental.createRental
  )
  .delete(Rental.clearRental);

router
  .route('/:id')
  .get(Rental.findRentalById)
  .put(Rental.updateRental)
  .delete(Rental.deleteRental);

module.exports = router;
