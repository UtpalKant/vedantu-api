const Inventory = require('../../models/inventory.model');
const OrderDetails = require('../../models/order.model');

const Mutex = require('async-mutex').Mutex;

// business logic layer.
module.exports = {
    // check stock from inventory.
    async checkStock(productId, quantity) {
        let stock = await Inventory.find({ productId, stockSize: { $gte: quantity } });
        return stock.length;
    },

    // create an entry in order table & decrease inventory.
    // this part runs in mutex to avoid race.
    async createOrder(userId, productId, quantity) {
        const mutex = new Mutex();
        // acquire lock on thread
        const release = await mutex.acquire();

        let orderDetails = null;
        try {
            orderDetails = await OrderDetails.insertMany([{ productId, userId, quantity, orderStatus: "Placed" }]);
            let stock = await Inventory.findOneAndUpdate({ productId, stockSize: { $gte: quantity } }, { $inc: { stockSize: -quantity } });
            if (!stock) {
                await OrderDetails.findOneAndDelete(orderDetails);
                orderDetails = null;
                return {
                    message: 'product out of stock', statusCode: 200, data: orderDetails
                };
            }
            return orderDetails;
        } catch (ex) {
            orderDetails = null;
            return {
                message: 'Something went Wrong', statusCode: 500, data: orderDetails
            };
        } finally {
            // release once transaction is over.
            release();
            return {
                message: 'success', statusCode: 200, data: orderDetails
            }
        }
    }
}