var mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

var AccountSchema = new BaseSchema({
	'name' : {
		type: String,
		required:true
	},
	'type': {
		type: String,
		required: true,
		ref:"User"
	},
	'balance' : {
		type: Number,
		default:0
	},
	'username': {
		type: String,
		required: true
	},
	'createdAt' : {
		type: Date,
		default:Date.now
	},
	'id' : Number
});

AccountSchema.plugin(global.AutoIncrement, { inc_field: 'id' });

//console.log(AccountSchema.statics);
module.exports = mongoose.model('Account', AccountSchema);
