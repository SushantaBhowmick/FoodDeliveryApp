const express = require('express');
const { orders, myOrders } = require('../controllers/orderCtrl');

const router = express.Router();

router.route("/orderData").post(orders)
router.route("/myorder").post(myOrders)

module.exports= router;