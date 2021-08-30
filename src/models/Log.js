const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const schema = new Schema({
    city: {
      type: String,
      required: false,
      trim: true,
    },
    state: {
      type: String,
      required: false,
      trim: true,
    },
    resultsAdded: {
      type: Number,
      required: false,
      trim: true,
    },
    updatedResults: {
      type: Number,
      required: false,
      trim: true,
    },
    situation: {
      type: String,
      required: false,
      trim: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

schema.plugin(mongoosePaginate);

module.exports = mongoose.model('Log', schema);