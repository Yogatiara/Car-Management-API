const router = require('express').Router();

const Member = require('../controllers/memberController');
const checkRole = require('../middlewares/checkRole');
const authenticate = require('../middlewares/authenticate');

router
  .route('/')
  .delete(
    authenticate,
    checkRole('superadmin', 'admin'),
    Member.clearMember
  );

router
  .route('/:id')
  .get(Member.findMemberById)
  .put(Member.updateMember)
  .delete(
    authenticate,
    checkRole('superadmin', 'admin'),
    Member.deleteMember
  );

module.exports = router;
