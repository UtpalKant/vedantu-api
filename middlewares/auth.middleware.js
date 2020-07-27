// auth middleware, here we can use combo of JWT & Passport.
module.exports = {
    auth(req, res, next){
        //extract jwt token, authenticate & verify.
        //check for roles. throws 401 if it doesn't match
        // if all OK call next middleware.
        console.log('auth middleware called.');
        next();
    }
}