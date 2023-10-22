const router = require('express').Router();

const checkUserBodyRequire = require('../middlewares/checkUserBodyRequire');
const User = require('../controllers/memberController');

router
  .route('/')
  .post(checkUserBodyRequire, User.createAdmin);
//   .get(User.findUser)
//   .delete(User.clearUser);

// router
//   .route('/:id')
//   .get(User.findUserById)
//   .put(User.updateUser)
//   .delete(User.deleteUser);

module.exports = router;
