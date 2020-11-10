const express = require('express')
const { User, validate } = require('../models/user')
const router = express.Router()
const bcrypt = require('bcrypt')
const _  = require('lodash')

router.get('/:id', async(req, res) => {
    const user = await User.findById(req.params.id).select('-password')
    res.send(user)
})
 
router.post('/', async (req, res) => {
    const { error } = validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if(user) return res.status(400).send("This email is already registered.")

    user = new User({
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        profile: {
            profilePic: "",
            dob:"",
            gender:"",
            country:""        
        }   
    })

    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(user.password, salt)
    await user.save()

    const token = user.generateAuthToken()

    res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send(_.pick(user, ["_id", "username", "email"]))
})

router.post('/updateProfile/:id', async (req, res) => {
    await User.updateOne({_id: req.params.id}, {
        $set: {
            profile: {
                profilePic:req.body.profilePic,
                country:req.body.country,
                gender: req.body.gender,
                dob: req.body.dob,
                story: req.body.story
            }
        }
    })
    res.json({
        "status":"success",
        "message":"Successfully updated profile"
    })
})


module.exports = router;