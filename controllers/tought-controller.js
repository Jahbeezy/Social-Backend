const Thought  = require("../models/Thought");
const User = require("../models/User")

const mindControl = {
    getThought( req, res ) {
        Thought.find()
            .then((data) => res.json(data))
            .catch((err) => {
                console.log(err);
                res.status(400).json(err)
            });

    },
    getThoughtByID({ params }, res) {
        Thought.findOne({  _id: params.thoughtID })
        .then((data) => {
            if(!data) {
                res.status(404).json({ message: "No match found."});
                return;
            }
            res.json(data)
            return;
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        })
    },
    createThought({ params, body }, res ) {
        Thought.create(body)
        .then((data) => {
                console.log(data, params)
                User.findOneAndUpdate(
                    { _id: params.userID },
                    { $push: { thoughts: data._id }},
                    { new: true }
                    )
                    .then((data) => {
                if(!data){
                    res.status(400).json({ message: "No match found."});
                    return;
                }
                res.json(data)
                return;
            })
            .catch((err) => res.status(400).json(err))
            })
            

    },
    updateThought({params, body}, res) {
        console.log(params)
        Thought.findOneAndUpdate({ _id: params.thoughtID }, body, {
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

        })
        .catch((err) => res.status(400).json(err))

    },
    deleteThought(req,res) {
        Thought.findOneAndDelete({ _id: req.params.thoughtID })
        .then((deleteThis) => {
            if(!deleteThis) {
                res.status(400).json({ message: "No thought found."});
                return;
            }
            User.findOneAndUpdate(
                { _id: req.params.userID },
                { $pull: { thoughts: req.params.thoughtID }},
                { new: true }
            )
            .then((data) => {
            if(!data) {
                res.status(400).json({ message: "No match found."});
                return;
            }
            res.json(data)
        })
            .then(() => {
                res.json({ message: "Deletion Complete!"});
                return
            })
            .catch((err) => res.status(400).json(err));
            
        })

        

    },
    addReaction({ params, body }, res ) {
        console.log(params, body)
        Thought.findOneAndUpdate(
            { _id: params.thoughtID },
            { $addToSet: { reactions: body}},
            { runValidators: true, new: true }
        )
        .then((data) => {
            if(!data) {
                res.status(400).json({ message: "No match found."});
                return;
            }
            res.json(data)
        })
        .catch((err) => res.status(400).json(err))
    },
    deleteReaction({params}, res ) {
        console.log(params)
        Thought.findOneAndUpdate(
            { _id: params.thoughtID },
            { $pull: { reactions: params.reactionID}},
            { runValidators: true }    
        )
        .then((data) => {
            console.log(data)
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

module.exports = mindControl;