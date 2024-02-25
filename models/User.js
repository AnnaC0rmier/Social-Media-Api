const { Schema, model } = require('mongoose');
const thoughtSchema = require('./Thought.js');

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      maxlength: 50,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      maxlength: 50,
      match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Thought',
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('User', userSchema);

module.exports = User;

