const sendgrid = require("sendgrid");
const helper = sendgrid.mail;
const keys = require("./../config/keys");
class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();
    this.from_email = new helper.Email("no-reply@surveyss.com");
    this.subject = subject;
    this.body = new helper("text/html", content);
    this.recipients = this.formatAddresses(recipients);
    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }
  formatAddresses(recipients) {
    return recipients.map(({ email }) => {
      return new helper.Email(email);
    });
  }
  addClickTracking() {
    const trackingSettings = new helper.trackingSettings();
    const clickTracking = new helper.clickTracking(true, true);
    trackingSettings.setClickTracking(clickTracking);
    this.addTrackingSettings(trackingSettings);
  }
}
module.exports = Mailer;
