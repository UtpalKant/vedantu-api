const express = require('express');
const router = express.Router();

// global middleware always  to be called.
const {enableCors} = require('../middlewares/cors.mddleware');
// chain auth middleware to all the routes you require.
const {auth} = require('../middlewares/auth.middleware');

const shopController = require('../src/shop.module/shop.controller');

router.use(enableCors);
router.use('/shop',auth, shopController);

module.exports = router;