const Joi = require('joi');
const bcrypt = require('bcrypt');
const _ = require('lodash');
const {User} = require('../models/user');
const express = require('express');
const router = express.Router();

// login request
router.post('/', async (req, res) => {
  // check for errors in required length of password
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // check if user is registered or not
  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send('Invalid email or password.');

  // check if user password is valid or not
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send('Invalid email or password.');

  // generate user token
  const token = user.generateAuthToken();
  
  res.send(token);
});

// validation of login requirements
function validate(req) {
  const schema = {
    email: Joi.string().required(),
    password: Joi.string().min(5).max(255).required()
  };

  return Joi.validate(req, schema);
}

module.exports = router; 
