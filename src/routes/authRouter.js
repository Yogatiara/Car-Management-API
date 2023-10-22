const router = require('express').Router();

const authController = require('../controllers/authController');
const checkRegisterBodyRequire = require('../middlewares/checkRegisterBodyRequire');
const checkLoginBodyRequire = require('../middlewares/checkLoginBodyRequire');
const authenticate = require('../middlewares/authenticate');

router
  .route('/register')
  .post(
    checkRegisterBodyRequire,
    authController.register
  );

router
  .route('/login')
  .get(
    checkLoginBodyRequire,
    authController.login
  );

router
  .route('/check-token')
  .get(authenticate, authController.checkToken);

module.exports = router;
