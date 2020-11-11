const express = require('express')
const PostModel = require('../models/PostModel')
const Utils = require('../services/Utils')

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        let posts = await PostModel.list({})
        res.send(posts);
    }
    catch (ex) {
        res.sendError(ex, Utils.parseErrorString(ex));
    }
});


router.post("/", async (req, res) => {
    try {
        let objPost = new PostModel(req.body);
        await objPost.save();
    }
    catch (ex) {
        res.sendError(ex, Utils.parseErrorString(ex));
    }
});


module.exports = router;
