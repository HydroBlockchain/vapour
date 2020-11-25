const express = require('express')
const UserModel = require('../models/UserModel')
const Utils = require('../services/Utils')
const s3 = require('../services/S3Services');
const router = express.Router();

router.post("/getUserInfo", async (req, res) => {
  try {
    let user = await UserModel.findOne({ walletAddress: req.userData.user.walletAddress });
    if (!user) {
      return res.sendError("userNotExists", "User not Exists.");
    }
    user.password = req.body.password;
    return res.sendSuccess(user, "User Info");
  }
  catch (ex) {
    res.sendError(ex, Utils.parseErrorString(ex));
  }
});


router.post("/savePassword", async (req, res) => {
  try {
    let user = await UserModel.findOne({ walletAddress: req.userData.user.walletAddress });
    if (!user) {
      return res.sendError("userNotExists", "User not Exists.");
    }
    user.password = req.body.password;
    let savedInfo = await user.save()
    return res.sendSuccess(savedInfo, "Password Saved Successfully");
  }
  catch (ex) {
    res.sendError(ex, Utils.parseErrorString(ex));
  }
});
router.post("/saveNameAndImage", async (req, res) => {
  try {
    let user = await UserModel.findOne({ walletAddress: req.userData.user.walletAddress });
    if (!user) {
      return res.sendError("userNotExists", "User not Exists.");
    }
    user.name = req.body.name;
    if (req.body.profileImageBase64) {
      let location = await s3.uploadFile(req.body.profileImageBase64, req.body.fileExtension)
      user.userImage = location;
    }
    let savedInfo = await user.save()
    return res.sendSuccess(savedInfo, "Profile Saved Successfully. ");
  }
  catch (ex) {
    res.sendError(ex, Utils.parseErrorString(ex));
  }
});


module.exports = router;
