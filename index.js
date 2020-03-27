const express = require("express");
const app = express();
const passport = require("passport");
const keys = require("./config/keys");
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
app.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["email", "profile"]
  })
);
app.get("/auth/google/callback", passport.authenticate("google"));
const PORT = process.env.PORT || 5000;
app.listen(PORT);
