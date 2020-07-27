# Steps to launch the app:

step 1: npm install
step 2: node migration
step 3: npm run start 

1. local database and a sample db name are configured and can be changed from config JS.
2. right now app runs on only one mongoDB connection, no connection pooling is implemented.
3. added a migrate.js file to generate some data in inventory to start with, feel free to modify it.

A hosted version is available at: 
baseURL: https://vedantutest.herokuapp.com/shop/order

# API details.

1. Place Order

URL:
http://localhost:8080/shop/order

type: HTTP POST

parameters: from body, all 3 required.
import below given CURL to your postman

CURL:
curl --location --request POST 'http://localhost:8080/shop/order' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'userId=D149E962-CFC3-11EA-87D0-0242AC130003' \
--data-urlencode 'productId=455' \
--data-urlencode 'quantity=2'

Body-Params, Content-Type: application/x-www-form-urlencoded

# Few npm packages used such as:

framework used:
    - express
middlewares :
    - node-input-validator
    - CORS handling by custom created middleware
db & orm/odm :
    - mongoDB 
    - mongoose, mongoose-models
    - mongoose-unique-validator
locking :
    - async-mutex

and many more things, haven't implemented authentication middleware, but it can be chained in whichever route we require or even globally.

# Implementation to avoid race conditions:

// by business logic i.e work flows.
1. Check for stock availability in inventory at beginning.
2. Then go ahead and push an entry to orders.
3. check stock availability again & update/decrease the count by qty in order.
4. If stock not found delete the entry made and inform customer.

// by using async-mutex
Although I read about async mutex, and implemented it to make each process as mutually exclusive.

Feel free to reach me at +91 6200557251.
Write at rudra.utpal@gmail.com.
