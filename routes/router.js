const express = require('express');
const router = express.Router();

const {enableCors} = require('../middlewares/cors.mddleware');

const shopController = require('../src/shop.module/shop.controller');

router.use(enableCors);
router.use('/shop', shopController);

module.exports = router;