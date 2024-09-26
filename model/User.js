const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,  // duplicate emails will not be entertained 
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);// mongoose.model(collection_name  , schema name)  note : here User collection display as users in mongodb database i.e convert it into lowercase and plural 

module.exports = User;





















// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
// });

// module.exports = mongoose.model('User', userSchema);

