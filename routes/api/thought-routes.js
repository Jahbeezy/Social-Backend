const router = require('express').Router();
const {
    getThought,
    getThoughtByID,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    deleteReaction
} = require('../../controllers/tought-controller');
//const { route } = require('./user-routes');

router.route('/').get(getThought);

router.route('/:userID').post(createThought);

router.route('/:thoughtID').get(getThoughtByID).put(updateThought);

router.route('/:userID/:thoughtID').delete(deleteThought);

router.route('/:thoughtID/reactions').post(addReaction);

router.route('/:thoughtID/reactions/:reactionID').delete(deleteReaction);

module.exports = router;