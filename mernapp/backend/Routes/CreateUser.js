const express = require ('express');
const router = express.Router ();
const user = require ('../models/user');

const jwt = require("jsonwebtoken");
const jwtSecret = "Thisismadeforsomepersonaluse$#"  //authentication and authorization

const {body, validationResult} = require ('express-validator');
const bcrypt = require ('bcryptjs'); // hashing 

router.post (
  '/createuser',
  [
    body ('Email').isEmail (),
    body ('name').isLength ({min: 5}),
    body ('password', 'Incorrect Password').isLength ({min: 5}),
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }

    const salt = await bcrypt.genSalt (10);
    let secPassword = await bcrypt.hash (req.body.password, salt);
    try {
      await user
        .create ({
          name: req.body.name,
          password: secPassword,
          Email: req.body.Email,
          location: req.body.location,
        })
        .then (res.json ({success: true}));
    } catch (error) {
      console.log (error);
      res.json ({success: false});
    }
  }
);

router.post (
  '/loginuser',
  [
    body ('Email').isEmail (),
    body ('password', 'Incorrect Password').isLength ({min: 5}),
  ],
  async (req, res) => {
    const errors = validationResult (req);
    if (!errors.isEmpty ()) {
      return res.status (400).json ({errors: errors.array ()});
    }
    let Email = req.body.Email;

    try {
      let userdata = await user.findOne({Email});
      if (!userdata) {
        return res
          .status (400)
          .json ({errors: 'Try  with Correct credentials'});
      }
      const pwdComapre = await bcrypt.compare(req.body.password,userdata.password)
      if (!pwdComapre) {
        return res.status (400).json ({errors: 'Try with Correct credentials'});
      }

      const data = {
        user:{
            id:userdata.id
        }
      }
      const authToken = jwt.sign(data,jwtSecret)
      return res.json ({success: true,authToken:authToken});
    } catch (error) {
      console.log (error);
      res.json ({success: false});
    }
  }
);

module.exports = router;
