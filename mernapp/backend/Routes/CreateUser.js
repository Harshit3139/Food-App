const express = require('express');
const router = express.Router();
const user = require('../models/user');

const {body,validationResult} = require('express-validator');

router.post("/createuser",[
    body('Email').isEmail(),
    body('name').isLength({min:5}),
    body('password',"Incorrect Password").isLength({min:5})]
,async (req,res)=>{

    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        await user.create({
            name:req.body.name,
            password:req.body.password,
            Email: req.body.Email,
            location:req.body.location,
         }).then(res.json({success:true}))
    } catch (error) {
        console.log(error);
        res.json({success:false})
    }

})
module.exports = router;