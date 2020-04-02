const requireLogin = require("../requireLogin");
const requireCredits = require("../requireCredits");
module.exports = app => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {});
};
