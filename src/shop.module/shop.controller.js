const express = require('express');
const routes = express.Router();
const { createOrder } = require('./shop.service');
// validate  the input provided using this middleware.
const { validateOrder } = require('../../middlewares/validateOrder.middleware')

routes.post('/order', validateOrder, async (req, res) => {
    try {
        const order = await createOrder(req.body, req.query);
        res.statusCode = order.statusCode;
        res.send(order);
    } catch (err) {
        res.statusCode = 500;
        res.send(err);
    }
});

module.exports = routes;