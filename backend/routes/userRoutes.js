const express = require('express');
const { createUser } = require('../controllers/userCtrl');

const router = express.Router();

router.route('/create').post(createUser);

module.exports= router;