var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// події на календарі кожного користувача
var EventSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        date: { type: Date, required: true, default: Date.now },
        timeStart: { type: String, required: true, trim: true},
        timeEnd: { type: String, required: true, trim: true},
        entity: {type: Number, ref: 'Entity', required: true},
        user: {type: Number, ref: 'User', required: true},
        place: {type: String, trim: true},
        about: {type: String, trim: true},
    }
);

// Віртуальна властивість для URL
EventSchema
    .virtual('url')
    .get(function () {
        return '/event/' + this._id;
    });

EventSchema.plugin(autoIncrement.plugin, { model: 'Event', startAt: 1 });

//Export model
module.exports = mongoose.model('Event', EventSchema);