const router = require("express").Router();

const {
    getUsers,
    getUserByID,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controller')


//router.get().post();


router.route("/:_id").get(getUserByID).put(updateUser).delete(deleteUser);


router.route("/:_id/friends/:friendID").post(addFriend).delete(deleteFriend);

router.route('/').get(getUsers).post(createUser)

module.exports = router;