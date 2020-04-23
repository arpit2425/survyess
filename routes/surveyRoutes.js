const mongoose = require("mongoose");
const _ = require("lodash");
const { Path } = require("path-parser");
const { URL } = require("url");
const requireLogin = require("../requireLogin");
const requireCredits = require("../requireCredits");
const Mailer = require("./../services/Mailer");
const Survey = require("./../models/Survey");
const templete = require("./../services/emailTempletes/surveyTemplete");
module.exports = (app) => {
  app.get("/api/surveys", requireLogin, async (req, res) => {
    const surveys = await Survey.find({ _user: req.user.id }).select({
      recipients: false,
    });
    // console.log(surveys);
    res.send(surveys);
  });
  app.get("/api/surveys/:surveyId/:choice", (req, res) => {
    res.send("Thank You");
  });
  app.post("/api/surveys/webhooks", async (req, res) => {
    const p = new Path("/api/surveys/:surveyId/:choice");
    console.log("hii from webhook");
    const events = _.chain(req.body)
      .map(({ email, url }) => {
        const match = p.test(new URL(url).pathname);
        if (match) {
          return { email, surveyId: match.surveyId, choice: match.choice };
        }
      })
      .compact()
      .uniqBy("email", "surveyId")
      .each(async ({ surveyId, email, choice }) => {
        await Survey.updateOne(
          {
            id: surveyId,
            recipients: {
              $elemMatch: { email, responded: false },
            },
          },
          {
            $inc: { [choice]: 1 },
            $set: { "recipients.$.responded": true },
            lastResponded: new Date(),
          }
        ).exec();
      })
      .value();
    res.send({});
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
