const router = require('express').Router();
const {
    getAllUsers, 
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/user-controller');

// routes for users:  /api/users
// Get all users, create a new user
router.route('/').get(getAllUsers).post(createUser);

// GET a single user by its _id and populated thought and friend data
router.route('/:userId').get(getUserById).put(updateUser).delete(deleteUser);

// BONUS: Remove a user's associated thoughts when deleted.


// routes for user's friend list:  /api/users/:userId/friends/:friendId
// POST to add a new friend to a user's friend list
// DELETE to remove a friend from a user's friend list
router.route('./userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;