const router = require('express').Router();

const checkUserBodyRequire = require('../middlewares/checkUserBodyRequire');
const Admin = require('../controllers/adminController');

router
  .route('/')
  .post(checkUserBodyRequire, Admin.createAdmin)
  .get(Admin.findAdmin)
  .delete(Admin.clearAdmin);

router
  .route('/:id')
  .get(Admin.findAdmin)
  .put(Admin.updateAdmin)
  .delete(Admin.deleteAdmin);

module.exports = router;
