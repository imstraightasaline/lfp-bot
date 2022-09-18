const mongoose = require('mongoose');

const cooldownSchema = new mongoose.Schema({
  userID: {
    type: mongoose.SchemaTypes.String,
    unique: true,
    required: true,
  },
  timestamp: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  msgID: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  status: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
});

module.exports = mongoose.model('cooldownSchema', cooldownSchema);
