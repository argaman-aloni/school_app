/**
 * Created by argam on 12/12/2016.
 */

"use strict";

var passport = require('passport');
var FacebookStrategy = require('passport-facebook');

const FACEBOOK_APP_ID = '1265588306817308';
const FACEBOOK_APP_SECRET = '27a2c699c9bb60f20792717cf90167e5';

passport.use(new FacebookStrategy({
        clientID: FACEBOOK_APP_ID,
        clientSecret: FACEBOOK_APP_SECRET,
        callbackURL: "http://localhost:3000/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            return cb(err, user);
        });
    }
));