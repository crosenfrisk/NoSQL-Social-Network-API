const { Thought, User } = require('../models');

const thoughtController = {

  // Get ALL thoughts
  getAllThoughts(req, res) {
    Thought.find({})
      .then(dbThoughtData => res.json(dbThoughtData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // Get one thought, by id
  getOneThought({ params }, res) {
    Thought.findOne({ _id: params.thoughtId })
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtData)
      })
      .catch(err => {
        res.status(400).json(err)
      });
  },

  // Create a new thought
  createThought({ body }, res) {
    Thought.create(body)
      .then( ({ _id}) => {
        return User.findOneAndUpdate(
          { _id: body.userId},
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user with this id' })
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        res.json(err);
      })
  },

  // Edit or change existing thought by id
  updateThought({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},
      body,
      { new: true, runValidators: true}
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err))
  },

  // Delete specific thought, by id
  deleteThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId})
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.status(400).json(err));
  },

  // Add reaction to thought
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then(dbThoughtData => {
        if (!dbThoughtData) {
          res.status(404).json({ message: 'No thought with this id' });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch(err => res.json(err));
  },

  // Option to delete user reaction to thought
  deleteReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId},
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
    .then(dbThoughtData => {
      if (!dbThoughtData) {
        res.status(404).json({ message: 'No thought with this id' });
        return;
      }
      res.json(dbThoughtData);
    })
    .catch(err => res.json(err));
  }
}

module.exports = thoughtController;