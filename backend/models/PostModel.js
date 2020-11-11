var mongoose = require('mongoose');
const BaseSchema = require('./BaseSchema');

var PostSchema = new BaseSchema({
    'title': {
        type: String,
        required: true,
    },
    'tag': {
        type: String,
    },
    'description': {
        type: String,
        required: true
    },
    'createdAt': {
        default: Date.now
    },
    likeCount: {
        type: String,
    },
    comments: {
        type: Object
    },
    postedUserInfo: {
        type: Object
    },
    images: {
        type: Object
    }
});

module.exports = mongoose.model('Post', PostSchema);
