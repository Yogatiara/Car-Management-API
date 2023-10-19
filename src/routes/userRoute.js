const router = require('express').Router();

const checkBody = require('../middlewares/checkBody');
const User = require('../controllers/userController');

router
  .route('/')
  .post(checkBody, User.createUser)
  .get(User.findUser)
  .delete(User.clearUser);

router
  .route('/:id')
  .get(User.findUserById)
  .put(User.updateUser)
  .delete(User.deleteUser);

module.exports = router;
