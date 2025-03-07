const router = require('express').Router();

const {
  getAllUser,
  getUserById,
  addfriend,
  createUser,
  updateUser,
  deleteUser,
  removeFriend,

} = require ('../../controllers/user-controller');

// /api/user
router
  .route('/')
  .get(getAllUser)
  .post(createUser);

// /api/user/:id
router
  .route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;

// /api/user/<userId>/<friends>/<friendsId>
router
    .route('/:userId/:friendId')
    .post(addfriend)
    .delete(removeFriend);

module.exports = router;