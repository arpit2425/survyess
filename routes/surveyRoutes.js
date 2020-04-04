const mongoose = require("mongoose");
const requireLogin = require("../requireLogin");
const requireCredits = require("../requireCredits");
const Mailer = require("./../services/Mailer");
const Survey = require("./../models/Survey");
const templete = require("./../services/emailTempletes/surveyTemplete");
module.exports = (app) => {
  app.post("/api/surveys", requireLogin, requireCredits, (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(",").map((email) => ({
        email,
      })),
      _user: req.user.id,
      dateSend: Date.now(),
    });
    const mailer = new Mailer(survey, templete(survey));
  });
};
