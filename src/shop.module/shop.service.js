const { createOrder, checkStock } = require('./shop.data');

// business logic layer.
module.exports = {
    async createOrder(body, query) {
        let { userId, productId, quantity } = body;
        // check if stock present
        let inStock = await checkStock(productId, quantity);
        // place order and return order details
        if (inStock) {
            return await createOrder(userId, productId, quantity);
        } else {
            return {
                message: 'product out of stock', statusCode: 200, data: null
            };
        }
    }
}