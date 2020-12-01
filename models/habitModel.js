var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// звички
var HabitSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        user: {type: Number, ref: 'User', required: true},
        // коли була додана звичка
        dateIn: { type: Date},
        // актуальна чи ні
        isActual: {type: Boolean, default: true},
        thisMonthTargetCount: {type: Number},
        thisMonthCounter: {type: Number},
        counter: {type: Number},
        // виконувалась сьогодні чи ні
        curDate: { type: Date},
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