const express = require("express");
const keys = require("./config/keys");
const app = express();
const cookieSession = require("cookie-session");
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
const passport = require("passport");
const mongoose = require("mongoose");
app.use(passport.initialize());
app.use(passport.session());

require("./models/User");
require("./services/passport");

require("./routes/authRoutes")(app);
mongoose.connect(keys.database, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const PORT = process.env.PORT || 5000;
app.listen(PORT);
