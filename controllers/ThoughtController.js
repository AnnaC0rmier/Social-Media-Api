const { ObjectId } = require('mongoose').Types;
const { Reaction, Thought } = require('../models');

module.exports = {

  async getThoughts(req, res) {
    try {
      const thoughts = await Thought.find();
      const thoughtObj = {
        thoughts,
      };
      return res.json(thoughtObj);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },


  async getSingleThought(req, res) {
    try {
      const thought = await Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .lean();

      if (!thought) {
        return res.status(404).json({ message: 'No thought with that ID' });
      }

      res.json({
        thought,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },


  async createThought(req, res) {
    try {
      const thought = await Thought.create(req.body);
      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },


  async addReaction(req, res) {
    try {
      console.log('You are adding a reaction');
      console.log(req.body);
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

 
  async removeReaction(req, res) {
    try {
      const thought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      res.json(thought);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  
  async deleteThought(req, res) {
    try {
      const deletedThought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

      if (!deletedThought) {
        return res.status(404).json({ message: 'No thought found with that ID' });
      }

      
      await Reaction.deleteMany({ _id: { $in: deletedThought.reactions } });

      res.json({ message: 'Thought and its reactions deleted successfully' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
