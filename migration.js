require('dotenv').config();
const {defaultdb, mongodbUrl} = require('./config');
const mongoose = require('mongoose'); 
const Inventory = require('./models/inventory.model');
let inventoryData = [
    { "productId": 101, "stockSize": 99 },
    { "productId": 205, "stockSize": 99 },
    { "productId": 199, "stockSize": 99 },
    { "productId": 237, "stockSize": 99 },
    { "productId": 455, "stockSize": 99 },
    { "productId": 846, "stockSize": 99 },
    { "productId": 188, "stockSize": 99 },
    { "productId": 991, "stockSize": 99 },
    { "productId": 574, "stockSize": 99 },
    { "productId": 289, "stockSize": 99 },
    { "productId": 786, "stockSize": 99 }
];


// setting mongoose orm
mongoose.connect(`${mongodbUrl+defaultdb}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(async _=>{
    console.log('mongoose connected');
    await Inventory.insertMany(inventoryData);
    console.log('Inventory created');
})
.catch(err=>{
    console.log('mongodb db not connected', err);
})
.finally(()=>{
    console.log('mongoose disconnected');
    mongoose.connection.close()
});