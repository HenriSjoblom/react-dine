
const { v4 } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
require('dotenv').config();

const users = require('../models/users');

const signUpUser = async (req, res) => {

  console.log('Signup request received:', req.body);

  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    email: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
  });

  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const { name, email, password } = req.body;

  const exist = await users.findByEmail(email);
  if (exist.length > 0) {
    res.status(422).send("Could not create user, user exists");
    return;
  }


  let hashedPassword;
  try {
    // Parameters, the string to hash, salt length to generate or salt to use
    hashedPassword = await bcrypt.hash(password, 12);
  } catch (err) {
    res.status(500).send('Could not create user, try again');
    return;
  }

  const newUser = {
    id: v4(),
    name,
    email,
    password_hash: hashedPassword
  }

  try {

    const result = await users.create(newUser);

    if (!result) {
      console.log('Error creating user', result);
      res.status(500).send('Something went wrong creating the user');
      return ;
    }
    const token = jwt.sign(
      {
        id: newUser.id,
        email: newUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    );

    console.log('User created successfully:', newUser);
    res.status(201).json({
      id: newUser.id,
      email: newUser.email,
      token: token
    })
  } catch (err) {
    console.log("Error creating user", err);
    res.status(500).send('Signup failed, please try again');
    return ;
  }
}


const loginUser = async (req, res) => {

  const schema = Joi.object({
    email: Joi.string().min(1).required(),
    password: Joi.string().min(1).required()
  });

  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const { email, password } = req.body
  let identifiedUser;
  try {
    const result = await users.findByEmail(email);
    if (!result[0]) {
      res.status(401).send('Could not identify user, credentials might be wrong');
      return;
    }

    identifiedUser = result[0];
  } catch (error) {
    console.log(err);
    res.status(500).send('Something went wrong with login in the user');
    return;
  }

  let isValidPassword = false;
  try {
    isValidPassword = await bcrypt.compare(password, identifiedUser.password_hash);
  } catch (error) {
    console.log(err);
    res.status(500).send('Could not log you in , check your credentials');
    return;
  }
  if (!isValidPassword) {
    res.status(401).send('Could not identify user, credentials might be wrong');
    return;
  }

  let token
  try {
    token = jwt.sign(
      {
        id: identifiedUser.id,
        email: identifiedUser.email
      },
      process.env.JWT_KEY,
      { expiresIn: '1h' }
    )
  } catch (error) {
    res.status(500).send('Something went wrong with login in the user');
    return;
  }
  res.status(201).json({
    id: identifiedUser.id,
    email: identifiedUser.email,
    token: token
  })
}

module.exports = {
  signUpUser,
  loginUser
};