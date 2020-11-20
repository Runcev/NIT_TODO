var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// дедлайни до сутностей
var DeadlineSchema = new Schema(
    {
        date: { type: Date, required: true, default: Date.now },
        name: {type: String, required: true, trim: true},
        entity: {type: Number, ref: 'Entity', required: true},
    }
);

// Віртуальна властивість для URL
DeadlineSchema
    .virtual('url')
    .get(function () {
        return '/deadline/' + this._id;
    });

DeadlineSchema.plugin(autoIncrement.plugin, { model: 'Deadline', startAt: 1 });

//Export model
module.exports = mongoose.model('Deadline', DeadlineSchema);