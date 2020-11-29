var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// сутності користувача
// справи/події, які користувач буде заносити в календар
var EntitySchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        // користувач
        user: {type: Number, ref: 'User', required: true},
        // типи сутностей теж повинні бути цього користувача
        topic: {type: Number, ref: 'Topic'},
        color: {type: Number, ref: 'Color', required: true}
    }
);

// Віртуальна властивість для URL
EntitySchema
    .virtual('url')
    .get(function () {
        return '/entity/' + this._id;
    });

EntitySchema.plugin(autoIncrement.plugin, { model: 'Entity', startAt: 1 });

//Export model
module.exports = mongoose.model('Entity', EntitySchema);