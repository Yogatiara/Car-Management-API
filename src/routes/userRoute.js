const router = require('express').Router();

const checkUserBody = require('../middlewares/checkUserBody');
const User = require('../controllers/userController');

router
  .route('/')
  .post(checkUserBody, User.createUser)
  .get(User.findUser)
  .delete(User.clearUser);

router
  .route('/:id')
  .get(User.findUserById)
  .put(User.updateUser)
  .delete(User.deleteUser);

module.exports = router;
