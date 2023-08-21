const express = require('express');
const { createUser, loginUser, myProfile } = require('../controllers/userCtrl');

const router = express.Router();

router.route('/create').post(createUser);
router.route('/login').post(loginUser);
router.route('/me/:id').get(myProfile);

module.exports= router;