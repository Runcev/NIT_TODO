var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// сутності користувача
// справи/події, які користувач буде заносити в календар
var EntitySchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        // користувач
        user: {type: Schema.ObjectId, ref: 'User', required: true},
        // типи сутностей теж повинні бути цього користувача
        topic: {type: Schema.ObjectId, ref: 'Topic'},
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