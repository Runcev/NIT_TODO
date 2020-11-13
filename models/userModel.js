var mongoose = require('mongoose');
var autoIncrement = require('mongoose-auto-increment');

var Schema = mongoose.Schema;

var UserSchema = new Schema(
    {
        name: {type: String, required: true},
        email: {type: String, required: true, max: 100},
    }
);

// Віртуальна властивість для URL
UserSchema
    .virtual('url')
    .get(function () {
        return '/user/' + this._id;
    });

UserSchema.plugin(autoIncrement.plugin, { model: 'User', startAt: 1 });

//Export model
module.exports = mongoose.model('User', UserSchema);