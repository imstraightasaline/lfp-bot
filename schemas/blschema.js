const mongoose = require('mongoose');

const lfpBlacklistSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  blacklister: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  reason: {
    type: mongoose.SchemaTypes.String,
    required: false,
  },
});

module.exports = mongoose.model('lfpBls', lfpBlacklistSchema);
