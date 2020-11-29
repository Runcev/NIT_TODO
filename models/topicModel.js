var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

// типи сутності (навчання, спорт, ділові справи і т.д.)
// у кожного користувача свої
var TopicSchema = new Schema(
    {
        name: {type: String, required: true, trim: true},
        user: {type: Number, ref: 'User', required: true},
        color: {type: Number, ref: 'Color', required: true}
    }
);

// Віртуальна властивість для URL
TopicSchema
    .virtual('url')
    .get(function () {
        return '/topic/' + this._id;
    });

TopicSchema.plugin(autoIncrement.plugin, { model: 'Topic', startAt: 1 });

//Export model
module.exports = mongoose.model('Topic', TopicSchema);