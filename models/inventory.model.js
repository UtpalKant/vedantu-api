const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Inventory = mongoose.Schema({
    productId: {type: Number, unique: true},
    stockSize: {type: Number, min: [0]}
});

Inventory.plugin(uniqueValidator);

const InventoryData = mongoose.model('inventory', Inventory);
module.exports = InventoryData;