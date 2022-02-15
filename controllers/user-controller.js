const { User, Thought } = require('../models');

const uControl = {
    getUsers( req, res ) {
        User.find({})
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            });

    },
    getUserByID(req , res) {
        User.findOne({  _id: req.params._id })
        .populate('thoughts')
        .populate('friends')
        .select('-__v')
        .then((data) => {
            console.log(data)
            if(!data) {
                res.status(404).json({ message: "No match found."});
                return;
            }
            res.json(data);
            return;
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    createUser({ body }, res ) {
        User.create(body)
            .then((data) => res.json(data))
            .catch((err) => res.status(400).json(err))

    },
    updateUser(req, res) {
        User.findOneAndUpdate({ _id: req.params._id }, req.body, {
            new: true,
            runValidators: true,
        })
        .then((data) => {
            console.log(data)
            if(!data){
                res.status(400).json({ message: "No match found."});
                return;
            }
            res.json(data)
            return;

        })

    },
    deleteUser(req, res) {
        User.findOneAndDelete({ _id: req.params._id })
        .then((data) => {
            if(!data) {
                res.status(400).json({ message: "No match found."});
                return;
            }
            res.json(data)
        })
        .then(() => {
            res.json({ message: "Deletion Complete!"});
            return;
        })
        .catch((err) => res.status(400).json(err));

    },
    addFriend({ params }, res ) {
        console.log(params)
        User.findOneAndUpdate(
            { _id: params._id },
            { $addToSet: { friends: params.friendID}},
            { runValidators: true }
        )
        .then((data) => {
            if(!data) {
                res.status(400).json({ message: "No match found."});
                return;
            }
            res.json(data)
            return;
        })
        .catch((err) => res.status(400).json(err))
    },
    deleteFriend({ params }, res ) {
        console.log(params)
        User.findOneAndUpdate(
            { _id: params._id },
            { $pull: { friends: params.friendID}},
            { runValidators: true }    
        )
        .then((data) => {
            if(!data) {
                res.status(400).json({ message: "No match found."});
                return;
            }
            res.json(data)
            return;
        })
        .catch((err) => res.status(400).json(err)) 

    },
};


module.exports = uControl;