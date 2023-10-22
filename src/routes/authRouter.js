const router = require('express').Router();

const authController = require('../controllers/authController');
const checkRegisterBodyRequire = require('../middlewares/checkRegisterBodyRequire');

router
  .route('/')
  .post(
    checkRegisterBodyRequire,
    authController.register
  );

module.exports = router;
