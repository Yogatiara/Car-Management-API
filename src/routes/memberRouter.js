const router = require('express').Router();

const Member = require('../controllers/memberController');

router.route('/').delete(Member.clearMember);

router
  .route('/:id')
  .get(Member.findMemberById)
  .put(Member.updateMember)
  .delete(Member.deleteMember);

module.exports = router;
