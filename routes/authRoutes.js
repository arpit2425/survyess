const passport = require("passport");

module.exports = app => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["email", "profile"]
    })
  );
  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/surveys");
    }
  );
  app.get("/api/user", (req, res) => {
    res.send(req.user);
  });
  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
};
