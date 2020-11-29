var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// кольори для сутностей та їх типів
var ColorSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
    }
);

ColorSchema.plugin(autoIncrement.plugin, { model: 'Color', startAt: 1 });

module.exports = mongoose.model('Color', ColorSchema);