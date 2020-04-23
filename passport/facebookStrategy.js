const passport = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const User = require("../models/User");

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APPID,
      clientSecret: process.env.FACEBOOK_APPSECRET,
      callbackURL: "http://www.example.com/auth/facebook/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOrCreate({ facebookId: profile.id }, (err, user) => {
        if (err) {
          return done(err);
        }
        done(null, user);
      });
    }
  )
);
