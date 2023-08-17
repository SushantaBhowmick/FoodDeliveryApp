const express = require('express');
const { displyData } = require('../controllers/dsipctrl');

const router = express.Router();

router.route('/foods').post(displyData)

module.exports= router;