const router = require('express').Router();

const authController = require('../controllers/authController');
const checkRegisterBodyRequire = require('../middlewares/checkRegisterBodyRequire');

router
  .route('/register')
  .post(
    checkRegisterBodyRequire,
    authController.register
  );

router.route('/login').get(authController.login);

module.exports = router;
