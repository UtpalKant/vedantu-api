const { Validator } = require('node-input-validator');

module.exports = {
    async validateOrder(req, res, next) {
        // configure validation object.
        const v = new Validator(req.body, {
            userId: 'required',
            productId: 'required',
            quantity: 'required'
        });

        // handle validation.
        let valid = false;

        try {
            valid = await v.check();
            req.body.productId = parseInt(req.body.productId);
            req.body.quantity = parseInt(req.body.quantity);
        } catch (ex) {
            // consider bad request.
            res.statusCode = 400;
        } finally {
            // if valid, call next middleware.
            if (valid) {
                next();
            } else {
                res.send(v.errors);
            }
        }
    }
}