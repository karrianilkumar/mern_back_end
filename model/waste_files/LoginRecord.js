// models/LoginRecord.js
const mongoose = require('mongoose');

const LoginRecordSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true }
});

const LoginRecord = mongoose.model('users', LoginRecordSchema);

module.exports = LoginRecord;

