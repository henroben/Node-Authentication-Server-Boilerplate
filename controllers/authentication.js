const User = require('../models/user');

exports.signup = function(req, res, next) {

    // get email
    const email = req.body.email;
    const password = req.body.password;

    // Check if user email already exits
    User.findOne({ email: email }, function(err, existingUser) {
        
    });

    // If user does exist, return error

    // If user does not exist, create and save user record

    // Respond to request indicating user created
}