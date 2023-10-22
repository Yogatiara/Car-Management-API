const router = require('express').Router();

const Car = require('../controllers/carController');

const checkCarBodyRequire = require('../middlewares/checkCarBodyRequire');
const upload = require('../middlewares/uploadImage');

router
  .route('/')
  .post(
    upload.single('image'),
    checkCarBodyRequire,
    Car.createCar
  )
  .get(Car.findCar);

module.exports = router;
