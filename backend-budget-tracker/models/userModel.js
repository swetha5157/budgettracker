const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
  },
  password: String,
  lastName: {
    type: String,
    default: 'lastname',
  },
  location: {
    type: String,
    default: 'my home',
  },
  phone: {
    type: String,
    default: '+91 9999966666',
  },
  avatar: String,
  avatarPublicId: String,
});

userSchema.methods.toJSON = function () {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};

module.exports = mongoose.model('User', userSchema);
