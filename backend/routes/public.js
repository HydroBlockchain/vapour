const express = require('express')
const UserModel = require('../models/UserModel')
const Utils = require('../services/Utils')
const jwtService = require('../services/jwtService')

const Kit = require('@celo/contractkit')
const kit = Kit.newKit('https://alfajores-forno.celo-testnet.org')
const getAccount = require('../services/AccountService').getAccount;
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    let user = new UserModel(req.body);
    let accountDetail = await getAccount();
    user.walletAddress = accountDetail.address;
    user.privateKey = accountDetail.privateKey;
  
    user.username = user.username.toLowerCase();

    await user.save();

    jwtService.authenticate(user)
      .then(token => {
        return res.sendSuccess({ token: token, userData: user }, "User registered Successfully");
      })
      .catch(err => {
        return res.sendError(err, "Problem in decoding token. ");
      });
  }
  catch (ex) {
    console.log(ex);
    res.sendError(ex, "Error occurred while registration. ");
  }
});

router.post('/login', async (req, res) => {
  try {
    let user = await UserModel.findOne({ username: req.body.username.toLowerCase() });
    if (!user) {
      return res.sendError("userNotFound", "User not found");
    }

    if (user.password !== req.body.password) {
      return res.sendError("passwordMismatch", "You entered wrong password. ");
    }

    delete user.password;
    jwtService.authenticate(user)
      .then(token => {
        return res.sendSuccess({ token: token, userData: user });
      })
      .catch(err => {
        return res.sendError(err, "Problem in decoding token. ");
      });
    //return res.sendSuccess(user, "User logged Successfully");
  }
  catch (ex) {
    console.log(ex);
    res.sendError(ex, "Error occurred while login. ");
  }
});

router.post('/isUsernameExist', async (req, res) => {
  try {
    let user = await UserModel.exists({ username: req.body.username.toLowerCase() });
    res.sendSuccess({ isExist: user }, "Username not found.");
  }
  catch (ex) {
    console.log("I am Here")
    res.sendError(ex, "Error occurred while login. ");
  }
});


module.exports = router;
