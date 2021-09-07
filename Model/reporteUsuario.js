const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
  usuario:Object(),
});
var User = mongoose.model("User", UserSchema);
module.exports = User;
