const express = require('express');
const {
    createDine, deleteDine, getDines, getDineById, updateDine
  } = require('../controllers/dines');

const router = express.Router();

const verifyToken = require('../middleware/verifyToken');


router.get('/', getDines);
router.get('/:id', getDineById);

//router.use(verifyToken);

router.post('/', createDine);
router.put('/', updateDine);
router.delete('/:id', deleteDine);

module.exports = router;