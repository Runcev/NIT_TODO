var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// поточні справи на якійсь день
var TodoSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        dateIn: { type: Date, required: true, default: Date.now },
        user: {type: Schema.ObjectId, ref: 'User', required: true},
    }
);

// Віртуальна властивість для URL
TodoSchema
    .virtual('url')
    .get(function () {
        return '/todo/' + this._id;
    });

TodoSchema.plugin(autoIncrement.plugin, { model: 'Todo', startAt: 1 });

//Export model
module.exports = mongoose.model('Todo', TodoSchema);