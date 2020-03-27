const passport = require("passport");
const keys = require("../config/keys");
const googleStrategy = require("passport-google-oauth20").Strategy;

passport.use(
  new googleStrategy(
    {
      clientID: keys.googleClientId,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
    }
  )
);
