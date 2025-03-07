const { Thought, User } = require('../models');

const thoughtController = {
    //get all thoughts
    getAllThoughts(req, res){
        Thought.find({})
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({_id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.json({ message: 'No thought with this id' })
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    //add thought to user
    addThought({ params, body }, res){
        Thought.create(body)
            .then( ({_id}) => {
                return User.findOneAndUpdate(
                    { _id: body.userId },
                    { $push: { thoughts: _id }},
                    { new: true}
                );
            })
            .then(dbUserData =>  res.json(dbUserData))
            .catch( err => res.json(err));
    },

    // add reaction to thought
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId },
            { $push: { reactions: body }},
            { new: true }
            )
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No Thought found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch( err => res.json(err));
    },

    //update thought by id
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate({_id: params.id }, body, {new:true})
            .then(dbUserData => {
                if(!dbUserData){
                    res.status(404).json({ message: 'No Thought found with this id'});
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    //remove thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    //remove reaction
    removeReaction({ params }, res ){
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: {reactionsId: params.reactionsId}} },
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    }
};

module.exports = thoughtController;