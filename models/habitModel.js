var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// звички
var HabitSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        user: {type: Schema.ObjectId, ref: 'User', required: true},
        // коли була додана звичка
        dateIn: { type: Date, required: true, default: Date.now},
        // актуальна чи ні
        isActual: {type: Boolean, default: true},
    }
);

// Віртуальна властивість для URL
HabitSchema
    .virtual('url')
    .get(function () {
        return '/habit/' + this._id;
    });

HabitSchema.plugin(autoIncrement.plugin, { model: 'Habit', startAt: 1 });

//Export model
module.exports = mongoose.model('Habit', HabitSchema);