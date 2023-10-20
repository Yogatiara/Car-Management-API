const router = require('express').Router();

const Car = require('../controllers/carController');

const checkCarBody = require('../middlewares/checkCarBody');
const upload = require('../middlewares/uploadImage');

router
  .route('/')
  .post(upload.single('image'), Car.createCar)
  .get(Car.findCar);

module.exports = router;
