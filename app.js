// library imports.
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

// using mongoose.
const mongoose = require('mongoose');

// using body parser.
app.use(bodyParser.urlencoded({ extended: false }));

// using cookie-parser.
app.use(cookieParser());

// custom imports.
const router = require('./routes/router');
require('dotenv').config();
const {defaultdb, mongodbUrl} = require('./config')[process.env.NODE_ENV];

// setting mongoose orm
mongoose.connect(`${mongodbUrl+defaultdb}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(_=>{
    // calls routes/router middleware.
    app.use(router);  
    // server listening.
    app.listen(process.env.PORT, ()=>{
        console.log(`node started at ${process.env.PORT}`);
    });
})
.catch(err=>{
    console.log('mongodb db not connected', err);
});

process.on('uncaughtException',()=>{
    //handle your uncaught exceptions here.
});
