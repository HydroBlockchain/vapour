var mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

var UserSchema = new BaseSchema({
	'username': {
		type: String,
	},
	'password': {
		type: String,
	},
	name: String,
	walletAddress: String,
	privateKey: String,
	userImage: String,
});

module.exports = mongoose.model('User', UserSchema);
