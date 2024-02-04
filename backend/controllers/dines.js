const Joi = require('joi');
const dines = require('../models/dines');

const getDines = async (req, res) => {
  const response = await dines.findDines();
  if (response) {
    res.json(response);
  }
};

const getDineById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const response = await dines.findDineById(id);

  try {
    if (response) {
      res.send(response);
    } else {
      res.status(404).send('Not Found');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createDine = async (req, res) => {

  const schema = Joi.object({
    name: Joi.string().min(1).required(),
    price: Joi.number().required(),
    description: Joi.string().min(1).required()
  });

  // Validate the req.body against the schema
  // Validate returns an error object if there are validation errors
  const { error } = schema.validate(req.body);
  if (error) {
    //Sending back the error details
    res.status(400).send(error.details[0].message);
    return;
  }

  const dine = {
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };

  const result = await dines.findByDine(dine);
  if (result.length > 0) {
    res.status(400).send('Dine exist');
    return;
  }

  const response = await dines.createNewDine(dine);
  if (response) {
    dine.id = response.insertId;
    res.send(dine);
  }
};

const updateDine = async (req, res) => {

  const dine = {
    id: req.body.id,
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
  };
  const response = await dines.updateDineById(dine);
  if (response) {
    res.json(dine);
  }
};

const deleteDine = async (req, res) => {

  const id = parseInt(req.params.id, 10);

  try {
    const result = await dines.findDineById(id);
    if ( ! result ) {
      res.status(404).send('Not Found');
      return;
    }
    const response = await dines.deleteDineById(id);
    if(response) {
      res.status(200).send("Dine deleted");
    }

  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

// export named functions
module.exports = {
  createDine,
  deleteDine,
  getDines,
  getDineById,
  updateDine
};