const router = require('express').Router();

const Car = require('../controllers/carController');

const checkCarBodyRequire = require('../middlewares/checkCarBodyRequire');
const authenticate = require('../middlewares/authenticate');
const checkRole = require('../middlewares/checkRole');
const upload = require('../middlewares/uploadImage');

router
  .route('/')
  .post(
    authenticate,
    checkRole('superadmin', 'admin'),
    upload.single('image'),
    checkCarBodyRequire,
    Car.createCar
  )
  .get(Car.findCar)
  .delete(
    authenticate,
    checkRole('superadmin', 'admin'),
    Car.clearCar
  );

router
  .route('/:id')
  .put(
    authenticate,
    checkRole('superadmin', 'admin'),
    upload.single('image'),
    Car.updateCar
  )
  .delete(
    authenticate,
    checkRole('superadmin', 'admin'),
    Car.deleteCar
  );

module.exports = router;
