const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require('../models');

module.exports = {
 
  async getUsers(req, res) {
    try {
      const users = await User.find();
      const userObj = {
        users,
      };
      return res.json(userObj);
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
 
  
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select('-__v')
        .lean();

      if (!user) {
        return res.status(404).json({ message: 'No user with that ID' });
      }

      res.json({
        user,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json(err);
    }
  },
  

  async createUser(req, res) {
    try {
      const user = await User.create(req.body);
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },


  async deleteUser(req, res) {
    try {
      const deletedUser = await User.findOneAndRemove({ _id: req.params.userId });

      if (!deletedUser) {
        return res.status(404).json({ message: 'No such user exists' });
      }

      
      await Thought.deleteMany({ user: req.params.userId });

      res.json({ message: 'User and their thoughts successfully deleted' });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
 

  async addFriend(req, res) {
    try {
      console.log('You are adding a friend');
      console.log(req.body);
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.body.userName } },
        { runValidators: true, new: true }
      );

      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }

      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },


  async removeFriend(req, res) {
    try {
      console.log('You are deleting a friend');
  
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.userName } },
        { runValidators: true, new: true }
      );
  
      if (!user) {
        return res.status(404).json({ message: 'No user found with that ID' });
      }
  
     
      console.log(`Friend removed successfully. User: ${user.userName}, Removed Friend: ${req.params.userName}`);
  
      res.json(user);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  }
  
