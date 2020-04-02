const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const recipientSchema = require("./Recipient");
const surveySchema = new Schema({
  title: String,
  subject: String,
  body: String,
  recipients: [recipientSchema],
  yes: { type: Number, default: 0 },
  no: { type: Number, default: 0 }
});
const survey = mongoose.model("surveys", surveySchema);
module.exports = survey;
