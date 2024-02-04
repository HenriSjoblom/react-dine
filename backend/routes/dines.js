const express = require('express');
const {
    createDine, deleteDine, getDines, getDineById, updateDine
  } = require('../controllers/dines');

const router = express.Router();

// Add the routes and the controller function that should handle the request

router.get('/', getDines);
router.get('/:id', getDineById);
router.post('/', createDine);
router.put('/', updateDine);
router.delete('/:id', deleteDine);

module.exports = router;