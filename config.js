module.exports = {
        development: {
                // local mongoDB
                mongodbUrl: "mongodb://127.0.0.1:27017/",
                // db name
                defaultdb: "shopDB"
        },
        production: {
                //cloud
                mongodbUrl: `mongodb+srv://utest01:P@ssw0rd@cluster0-dgqse.mongodb.net/shopDB?retryWrites=true&w=majority`,
                // db name
                defaultdb: "shopDB",
        }
}