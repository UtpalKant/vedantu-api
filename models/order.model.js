const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const OrderDetails = mongoose.Schema({
    productId:{type: Number},
    userId: {type: String},
    quantity: {type: Number},
    orderStatus: {type: String}
});

OrderDetails.plugin(uniqueValidator);

module.exports = mongoose.model('orderDetails', OrderDetails);