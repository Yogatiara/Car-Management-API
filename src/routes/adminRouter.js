const router = require('express').Router();

const checkUserBodyRequire = require('../middlewares/checkUserBodyRequire');
const checkRole = require('../middlewares/checkRole');
const authenticate = require('../middlewares/authenticate');
const Admin = require('../controllers/adminController');

router
  .route('/')
  .post(
    authenticate,
    checkRole('superadmin'),
    checkUserBodyRequire,
    Admin.createAdmin
  )
  .get(
    authenticate,
    checkRole('superadmin', 'admin'),
    Admin.findAdmin
  )
  .delete(
    authenticate,
    checkRole('superadmin'),
    Admin.clearAdmin
  );

router
  .route('/:id')
  .put(Admin.updateAdmin)
  .delete(Admin.deleteAdmin);

module.exports = router;
