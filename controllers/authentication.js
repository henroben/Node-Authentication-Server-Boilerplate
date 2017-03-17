const jwt = require('jwt-simple');
const User = require('../models/user');
const config = require('../config');

function tokenForUser(user) {

    const timeStamp = new Date().getTime();

    return jwt.encode({
        sub: user.id,  // subject
        iat: timeStamp // issued at time
    }, config.secret);
};

exports.signup = function(req, res, next) {

    // get email
    const email = req.body.email;
    const password = req.body.password;

    if(!email || !password) {
        // TODO add in email validation
        return res.status(422).send({
            error: 'Please enter an email address and password'
        });
    }

    // Check if user email already exits
    User.findOne({ email: email }, function(err, existingUser) {
        // Check for db connection error etc.
        if(err) {
            return next(err);
        }

        // If user does exist, return error
        if(existingUser) {
            return res.status(422).send({ error: 'Email is already registered'});
        }

        // If user does not exist, create user record
        const user = new User({
            email: email,
            password: password
        });
        // Save user to database
        user.save(function(err) {
            if(err) {
                return next(err);
            }
            // Respond to request indicating user created
            res.json({
                token: tokenForUser(user)
            });
        });

    });



}