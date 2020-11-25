const express = require('express')
const user = require('./user')
const commonMw = require('../middlewares/commonMW')
const jwtService = require('../services/jwtService')
const public = require('./public')

const router = express.Router();

router.use(commonMw);
router.use(jwtService.jwt_MW);

router.get("/",(req,res)=>{
  return res.send("Router is working.");
});


router.use("/user",user);
router.use("/public",public);

module.exports = router;
