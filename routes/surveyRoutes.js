const mongoose = require("mongoose");
const requireLogin = require("../requireLogin");
const requireCredits = require("../requireCredits");
const Mailer = require("./../services/Mailer");
const Survey = require("./../models/Survey");
const templete = require("./../services/emailTempletes/surveyTemplete");
module.exports = (app) => {
  app.get("/api/surveys/thanks", (req, res) => {
    res.send("Thank You");
  });
  app.post("/api/surveys", requireLogin, requireCredits, async (req, res) => {
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
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      console.log(user);
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};
