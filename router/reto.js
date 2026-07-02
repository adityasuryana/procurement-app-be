const express = require('express');
const { getAllRetos, getRetoById, createReto, updateReto, deleteReto } = require('../controller/reto');

const router = express.Router();

router.get('/', getAllRetos);
router.get('/:id', getRetoById);
router.post('/', createReto);
router.put('/:id', updateReto);
router.delete('/:id', deleteReto);

module.exports = router;
